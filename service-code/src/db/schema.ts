import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { z } from 'zod';

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),

  title: varchar('title', { length: 255 }).notNull(),

  content: text('content').notNull(),

  tags: text('tags').array().notNull(),

  path: varchar('path', { length: 512 }).notNull(),

  source: varchar('source', { length: 255 }),

  embedding: text('embedding'),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const noteSchema = z.object({
  title: z.string().max(255),

  content: z.string(),

  tags: z.array(z.string()),

  path: z.string().optional(),

  source: z.string().optional(),
});