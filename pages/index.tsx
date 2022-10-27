import { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Tabs from "../components/Tabs";
import { fetchCategories } from "../http";
import { ICategory, ICollectionResponse } from "../types";

interface IPropTypes {
  categories: {
    items: ICategory[];
  };
}

const Home: NextPage<IPropTypes> = ({ categories }) => {
  return (
    <div>
      <Head>
        <title>Coder&apos;s Blog Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs categories={categories.items} />
      <main>
        <h1 className="text-5xl text-primary">Welcome to Coders Blog!</h1>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
      },
    },
  };
};

export default Home;
