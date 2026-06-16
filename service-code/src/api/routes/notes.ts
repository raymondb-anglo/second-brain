import { Router } from 'express';
import { db } from '../../db';
import { notes, noteSchema } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { NoteService } from '../../services/noteService';

const router = Router();
const noteService = new NoteService();

/**
 * GET ALL NOTES
 */
router.get('/', async (req, res) => {
  try {
    const tag = req.query.tag as string | undefined;
    const result = await noteService.listNotes(tag);
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
    const result = await noteService.getNote(id);
    res.json(result);
  } catch (err: any) {
    console.error('GET /notes/:id error:', err);
    res.status(404).json({ error: err.message || 'Failed to fetch note' });
  }
});

/**
 * CREATE NOTE
 */
router.post('/', async (req, res) => {
  try {
    const data = noteSchema.parse(req.body);
    const result = await noteService.createNote(data);
    res.status(201).json(result);
  } catch (error: any) {
    console.error('POST /notes error:', error);
    res.status(400).json({
      error: error.message || 'Invalid request',
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