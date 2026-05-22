"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = exports.notes = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var zod_1 = require("zod");
exports.notes = (0, pg_core_1.pgTable)('notes', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    tags: (0, pg_core_1.text)('tags').array().notNull(), // e.g., ['project', 'idea']
    path: (0, pg_core_1.varchar)('path', { length: 512 }).notNull(), // relative to vault
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.noteSchema = zod_1.z.object({
    title: zod_1.z.string().max(255),
    tags: zod_1.z.array(zod_1.z.string()),
    content: zod_1.z.string(),
});
