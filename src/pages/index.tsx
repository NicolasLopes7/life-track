import { type NextPage } from "next";
import Head from "next/head";
import { EntryTable } from "~/components/EntryTable";
import { Header } from "~/components/header";
import { Kind } from "~/utils/types";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Life Track</title>
        <meta name="description" content="Tracking life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8">
        <Header />
        <EntryTable kind={Kind.Food} />
        <EntryTable kind={Kind.Mobility} />
        <EntryTable kind={Kind.Sleep} />
        <EntryTable kind={Kind.Work} />
        <EntryTable kind={Kind.Workout} />
      </main>
    </>
  );
};

export default Home;
