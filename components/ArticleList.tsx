import { IArticle } from "../types";
import BlogCard from "./BlogCard";
import BlogCardWithImage from "./BlogCardWithImage";

interface IPropTypes {
  articles: IArticle[];
}

const ArticleList = ({ articles }: IPropTypes) => {
  return (
    <div className="grid lg:grid-cols-2 grid-gap gap-16 mt-16">
      {articles.map((article, indx) =>
        indx === 1 ? (
          <BlogCardWithImage key={article.id} article={article} />
        ) : (
          <BlogCard key={article.id} article={article} />
        )
      )}
    </div>
  );
};

export default ArticleList;
