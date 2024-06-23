import { z } from 'zod';
import { BOOKTYPE } from '../utils/enums';

export const addBookSchema = z
  .object({
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    fileUploadUrl: z.string(),
    genre: z.string().array(),
    type: z.nativeEnum(BOOKTYPE),
  })
  .strict();

export type addBookType = z.infer<typeof addBookSchema>;

export const getBooksSchema = z.array(
  z
    .object({
      userId: z.string(),
      title: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      fileUploadUrl: z.string(),
      genre: z.string().array(),
      type: z.nativeEnum(BOOKTYPE),
    })
    .strict()
);
export type getBooksType = z.infer<typeof getBooksSchema>;

export const getBookInputSchema = z.object({
  id: z.string(),
});

export type getBookInputType = z.infer<typeof getBookInputSchema>;

export const updateBookSchema = z
  .object({
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    fileUploadUrl: z.string(),
    genre: z.string().array(),
    type: z.nativeEnum(BOOKTYPE),
  })
  .strict();

export type updateBookType = z.infer<typeof updateBookSchema>;
