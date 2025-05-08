import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export type PostType = {
  id: string;
  title: string;
  body: string;
};

export const fetchPost = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data: postId }) => {
    console.info(`Fetching post with id ${postId}...`);
    const post = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    )
      .then((r) => r.json())
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });

    return post;
  });

export const fetchPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching posts...");
    await new Promise((r) => setTimeout(r, 1000));
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then((r) => r.json())
      .then((r) => r.slice(0, 10));
  }
);
