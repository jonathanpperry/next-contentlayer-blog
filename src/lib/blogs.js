import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

function getTableOfContents(content) {
  const regularExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const slugger = new GithubSlugger();

  return Array.from(content.matchAll(regularExp)).map(({ groups }) => {
    const flag = groups?.flag;
    const text = groups?.content;

    return {
      level: flag?.length === 1 ? "one" : flag?.length === 2 ? "two" : "three",
      text,
      slug: text ? slugger.slug(text) : undefined,
    };
  });
}

export function getAllBlogs() {
  const folders = fs.readdirSync(contentDirectory);

  return folders.map((slug) => {
    const filePath = path.join(contentDirectory, slug, "index.mdx");

    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      ...data,
      slug,
      url: `/blogs/${slug}`,
      body: content,
      toc: getTableOfContents(content),
      readingTime: readingTime(content),
    };
  });
}
