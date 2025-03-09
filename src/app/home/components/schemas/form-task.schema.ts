import { z } from "zod";


export const FormSchemaTask = z.object({
    title: z.string().min(5, "El titulo debe tener al menos 5 caracteres"),
    completed: z.boolean(),
})