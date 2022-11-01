import { GetServerSideProps, NextPage } from "next";
import { AxiosResponse } from "axios";
import Head from "next/head";
import qs from "qs";

import { fetchArticles, fetchCategories } from "../../http";
import {
  ICollectionResponse,
  ICategory,
  IPagination,
  IArticle,
} from "../../types";
import Tabs from "../../components/Tabs";
import ArticleList from "../../components/ArticleList";

interface IPropTypes {
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
}

const Category: NextPage<IPropTypes> = ({ categories, articles }) => {
  return (
    <>
      <Head>
        <title>Coder&apos;s Blog Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs categories={categories.items} />
      <ArticleList articles={articles.items} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const options = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    filters: {
      category: {
        slug: query.category,
      },
    },
  };

  const queryString = qs.stringify(options);

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
        pagination: categories.meta.pagination,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
    },
  };
};

export default Category;
