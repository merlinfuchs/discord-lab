import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/NavBar";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("bg-dark-2");
  });

  return (
    <>
      <Head>
        <title>Discord Lab</title>
        <meta
          name="description"
          content="Tools for all the fellow Discord power users and nerds out there"
          key="description"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="theme-color" content="#2f3136" key="color" />
      </Head>

      <SessionProvider session={session}>
        <div className="flex min-h-screen flex-col">
          <div className="flex-initial">
            <NavBar />
          </div>
          <div className="flex-auto bg-dark-2 text-gray-100">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
