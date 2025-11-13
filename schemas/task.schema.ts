import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, {}),
  details: z.string().min(5, {}),
  author: z.string().min(5, {}),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]),
});

export type taskFormData = z.infer<typeof taskSchema>;
