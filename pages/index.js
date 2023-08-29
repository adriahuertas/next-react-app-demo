import { useEffect, useState } from "react";

import Head from "next/head";

import AppLayout from "components/AppLayout";
import Avatar from "components/Avatar";
import Button from "components/Button";
import GitHub from "components/Icons/GitHub";

import { colors } from "styles/theme";

import { loginWithGitHub, onAuthStateChanged } from "firebase/client";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err);
      });
  };

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
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user && (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.username}
                />
              </div>
            )}
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
          margin: 0;
        }
      `}</style>
    </>
  );
}
