import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <div className="my-20 px-5 text-center">
      <Head>
        <title>Not Found | Discord Toolbox</title>
      </Head>
      <div className="mb-5 text-4xl font-bold">404 - Page Not Found</div>
      <div className="mb-10 text-xl text-gray-300">
        Seems like you got lost, click below to get back home.
      </div>
      <Link
        href="/"
        className="rounded-md bg-blue-500 px-5 py-2 text-xl hover:bg-blue-600"
      >
        Go Back
      </Link>
    </div>
  );
}
