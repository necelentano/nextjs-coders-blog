import Image from "next/image";
import Link from "next/link";
import { IArticle } from "../types";
import { formatDate } from "../utils";

interface IPropTypes {
  article: IArticle;
}

const BlogCard = ({ article }: IPropTypes) => {
  return (
    <div>
      <Link href="#">
        <h2 className="text-xl text-gray-600 font-bold hover:decoration-2 hover:underline hover:cursor-pointer hover:decoration-primary">
          {article.attributes.Title}
        </h2>
      </Link>
      <div className="flex items-center my-4">
        <div className="flex items-center justify-center rounded-lg overflow-hidden mr-2">
          <Image
            src={`http://localhost:1337${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
            width={40}
            height={40}
            alt="Author Photo"
          />
        </div>
        <span className="text-sm font-bold text-gray-600">
          {article.attributes.author.data.attributes.firstname}{" "}
          {article.attributes.author.data.attributes.lastname} on &nbsp;
          <span className="text-gray-400">
            {formatDate(article.attributes.createdAt)}
          </span>
        </span>
        <span></span>
      </div>
      <div className="text-gray-500">
        {article.attributes.shortDescription.slice(0, 250)}{" "}
        {article.attributes.shortDescription.length > 250 ? "..." : ""}
      </div>
    </div>
  );
};

export default BlogCard;
