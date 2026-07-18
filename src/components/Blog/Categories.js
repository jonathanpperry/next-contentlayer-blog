import Category from "./Category";
import GithubSlugger from "github-slugger";

const Categories = ({ categories, currentSlug }) => {
  const slugger = new GithubSlugger();

  return (
    <div
      className="px-20 mt-10 border-t-2 text-dark border-b-2 border-solid border-dark
                     py-4 flex items-start flex-=wrap font-medium mx-10"
    >
      {categories.map((cat) => (
        <Category
          key={cat}
          link={`/categories/${cat}`}
          name={cat}
          active={currentSlug === slugger.slug(cat)}
        />
      ))}
    </div>
  );
};

export default Categories;
