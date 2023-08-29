import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter.png" alt="logo" />
          <h1>Devter</h1>
          <h2>Talk about coding! 👩‍💻👩‍💻</h2>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
          border-radius: 10% 90% 10% 90%;
        }

        section {
          display: grid;
          place-content: center;
          place-items: center;
          height: 100%;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0
        }
        `}</style>
    </>
  );
}
