import { sortBlogs } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";
import GithubSlugger from "github-slugger";

const HomeCoverSection = ({ blogs }) => {
  const slugger = new GithubSlugger();

  const sortedBlogs = sortBlogs(blogs);
  const blog = sortedBlogs[0];

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-10 relative h-[85vh] overflow-hidden rounded-3xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover z-0"
        />

        <div
          className="absolute inset-0
          bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-10"
        />

        <div className="w-3/4 p-16 flex flex-col items-start justify-center relative z-20 text-light">
          <Tag
            link={`/categories/${slugger.slug(blog.tags[0])}`}
            name={blog.tags[0]}
          />

          <Link href={blog.url} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
              >
                {blog.title}
              </span>
            </h1>
          </Link>

          <p className="inline-block mt-4 text-xl font-in">
            {blog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
