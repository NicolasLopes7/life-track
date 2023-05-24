import { z } from "zod";

export enum Quality {
  Bad = "bad",
  Ok = "ok",
  Good = "good",
}

export enum Kind {
  Food = "food",
  Workout = "workout",
  Work = "work",
  Mobility = "mobility",
  Sleep = "sleep",
}

export const InsertEntrySchema = z.object({
  name: z.string(),
  duration: z.string().optional().nullable(),
  quality: z.nativeEnum(Quality),
  kind: z.nativeEnum(Kind),
});
export type InsertEntryType = z.infer<typeof InsertEntrySchema>;

export const GetEntriesSchema = z.object({
  Kind: z.nativeEnum(Kind).optional(),
  dateRange: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
});
export type GetEntriesType = z.infer<typeof GetEntriesSchema>;
