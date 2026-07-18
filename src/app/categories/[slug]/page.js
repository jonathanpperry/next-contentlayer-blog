import { getAllBlogs } from "@/lib/blogs";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import Categories from "@/components/Blog/Categories";
import GithubSlugger from "github-slugger";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];
  const slugger = new GithubSlugger();

  const allBlogs = getAllBlogs();

  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      (blog.tags ?? []).forEach((tag) => {
        const slugified = slugger.slug(tag);

        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      slug === "all" ? "web development" : slug
    } through our collection of expert blogs and tutorials`,
  };
}

async function CategoryPage({ params }) {
  const allBlogs = getAllBlogs();
  const { slug } = await params;

  const allCategories = ["all"];
  const slugger = new GithubSlugger();

  const blogs = allBlogs.filter((blog) => {
    return (blog.tags ?? []).some((tag) => {
      const slugified = slugger.slug(tag);

      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }

      if (slug === "all") {
        return true;
      }

      return slugified === slug;
    });
  });

  if (!blogs.length && slug !== "all") {
    notFound();
  }

  return (
    <article className="mt-12 flex flex-col text-dark">
      <div className="px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-5xl">#{slug}</h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>

      <Categories categories={allCategories} currentSlug={slug} />

      <div className="grid grid-cols-3 grid-rows-2 gap-16 mt-24 px-32">
        {blogs.map((blog) => (
          <article key={blog.slug} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
}

export default CategoryPage;
