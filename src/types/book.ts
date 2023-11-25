import { z } from 'zod';
import { BOOKTYPE } from '../utils/enums';

export const addBookSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    fileUploadUrl: z.string(),
    genre: z.string().array(),
    type: z.nativeEnum(BOOKTYPE),
  })
  .strict();
  
export type addBookType = z.infer<typeof addBookSchema>;