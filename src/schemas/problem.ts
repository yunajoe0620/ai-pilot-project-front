// ZOD type
import { z } from "zod";

export const ItemSchema = z.object({
  language: z.string(),
  target: z.string(),
  subject: z.string(),
  theme: z.string(),
  level: z.object({
    easy: z.string(),
    medium: z.string(),
    difficult: z.string(),
  }),
  problemType: z.object({
    multipleChoice: z.string(),
    shortAnswer: z.string(),
  }),
  problemCount: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export const QuestionItemSchema = ItemSchema.extend({
  model: z.string(),
});

export type QuestionItem = z.infer<typeof QuestionItemSchema>;

export const promiseResultItemSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export type PromiseResultItem = z.infer<typeof promiseResultItemSchema>;

export type PromiseResultItemArray = z.infer<typeof promiseResultItemSchema>[];
