import { useState, useEffect } from "react"

import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { listenLatestDevits } from "firebase/client"
import Link from "next/dist/client/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map((devit) => {
          return (
            <Devit
              key={devit.id}
              avatar={devit.avatar}
              username={devit.username}
              message={devit.message}
              img={devit.img}
              id={devit.id}
              userId={devit.userId}
              createdAt={devit.createdAt}
            />
          )
        })}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#09f" width={32} height={32} />{" "}
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search stroke="#09f" width={32} height={32} />{" "}
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create stroke="#09f" width={32} height={32} />{" "}
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          border-bottom: 1px solid #eee;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          width: 100%;
          height: 49px;
          position: sticky;
          top: 0;
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
