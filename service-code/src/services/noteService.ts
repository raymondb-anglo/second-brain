import fs from 'node:fs/promises';
import path from 'node:path';
import { db } from '../db';
import { notes, noteSchema } from '../db/schema';
import { z } from 'zod';
import { OpenRouterClient } from './openRouter';

const vaultPath = process.env.VAULT_PATH!;

export class NoteService {
  private openRouter = new OpenRouterClient();

  /** Create a new note */
  async createNote(input: z.infer<typeof noteSchema>) {
    const { title, tags, content } = input;

    // 1️⃣ Generate enriched content via OpenRouter
    const enriched = await this.openRouter.enrich(content);

    // 2️⃣ Write Markdown file
    const fileName = `${title.replace(/\s+/g, '-').toLowerCase()}.md`;
    const filePath = path.join(vaultPath, fileName);
    const frontmatter = `---\ntitle: ${title}\ntags: ${JSON.stringify(tags)}\n---\n\n`;
    await fs.writeFile(filePath, frontmatter + enriched, 'utf8');

    // 3️⃣ Persist metadata
    const [row] = await db
      .insert(notes)
      .values({
        title,
        tags,
        path: fileName,
      })
      .returning();

    return row;
  }

  /** Retrieve a note by ID */
  async getNote(id: number) {
    const note = await db.select().from(notes).where(notes.id.eq(id)).limit(1);
    if (!note[0]) throw new Error('Note not found');

    const filePath = path.join(vaultPath, note[0].path);
    const content = await fs.readFile(filePath, 'utf8');
    return { ...note[0], content };
  }

  /** List notes with optional tag filter */
  async listNotes(tag?: string) {
    const query = db.select().from(notes);
    if (tag) query.where(notes.tags.contains([tag]));
    return query.execute();
  }
}