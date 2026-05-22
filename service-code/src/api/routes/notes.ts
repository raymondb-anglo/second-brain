import { Router } from 'express';
import { db } from '../../db';
import { notes, noteSchema } from '../../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

/**
 * GET ALL NOTES
 */
router.get('/', async (_, res) => {
  try {
    const result = await db.select().from(notes);
    res.json(result);
  } catch (err) {
    console.error('GET /notes error:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

/**
 * GET NOTE BY ID
 */
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await db
      .select()
      .from(notes)
      .where(eq(notes.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error('GET /notes/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

/**
 * CREATE NOTE
 */
router.post('/', async (req, res) => {
  try {
    const data = noteSchema.parse(req.body);

    const result = await db
      .insert(notes)
      .values({
        ...data,
        source: req.body.source ?? 'manual',
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('POST /notes error:', error);

    res.status(400).json({
      error: 'Invalid request',
    });
  }
});

/**
 * DELETE NOTE
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await db.delete(notes).where(eq(notes.id, id));

    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /notes error:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;