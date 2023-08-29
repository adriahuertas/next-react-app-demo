import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";
import Button from '../components/Button';
import GitHub from '../components/Icons/GitHub';
import { loginWithGitHub } from '../firebase/client';


export default function Home() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const {username, avatarUrl, name} = await loginWithGitHub();
      console.log(username, avatarUrl, name);
    } catch (error) {
      console.log(error);
    }
  }

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
          <div>
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
          border-radius: 10% 90% 10% 90%;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          place-content: center;
          place-items: center;
          height: 100%;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0
        }
        `}</style>
    </>
  );
}
