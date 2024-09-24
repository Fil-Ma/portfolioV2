import { defineCollection } from "astro:content";
import blogSchema from "src/schemas/blogSchema";
import tutorialsSchema from "src/schemas/tutorialsSchema";

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

const tutorials = defineCollection({
  type: "content",
  schema: tutorialsSchema,
});

export const collections = {
  blog,
  tutorials,
};
