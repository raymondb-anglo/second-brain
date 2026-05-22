import { Router } from 'express';
import { db } from '../../db';
import { notes, noteSchema } from '../../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();


// GET ALL NOTES
router.get('/', async (_, res) => {
  const result = await db.select().from(notes);

  res.json(result);
});


// GET NOTE BY ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const result = await db
    .select()
    .from(notes)
    .where(eq(notes.id, id));

  if (result.length === 0) {
    return res.status(404).json({
      error: 'Note not found',
    });
  }

  res.json(result[0]);
});


// CREATE NOTE
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
    res.status(400).json({
      error: 'Invalid request',
      details: error,
    });
  }
});


// DELETE NOTE
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  await db
    .delete(notes)
    .where(eq(notes.id, id));

  res.json({
    success: true,
  });
});

export default router;