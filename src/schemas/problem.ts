// ZOD type
import { z } from "zod";

export const questionItemSchema = z.object({
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
    subject: z.string(),
  }),
  problemCount: z.number(),
});

export type QuestionItem = z.infer<typeof questionItemSchema>;

export const promiseResultItemSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export type PromiseResultItem = z.infer<typeof promiseResultItemSchema>;

export type PromiseResultItemArray = z.infer<typeof promiseResultItemSchema>[];
