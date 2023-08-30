import { useState, useEffect } from "react"

import AppLayout from "components/AppLayout"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestsDevits } from "firebase/client"
import Link from "next/dist/client/link"
import Create from "components/Icons/Create"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  const user = useUser()
  useEffect(() => {
    user &&
      fetchLatestsDevits()
        .then(setTimeline)
        .catch((err) => console.log(err))
  }, [user])

  return (
    <>
      <AppLayout>
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
                id={devit.id}
                userId={devit.userId}
                createdAt={devit.createdAt}
              />
            )
          })}
        </section>
        <nav>
          <Link href="/compose/tweet">
            <a>
              <Create stroke="#09f" width={32} height={32} />{" "}
            </a>
          </Link>
        </nav>
      </AppLayout>
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
          bottom: 0;
          background: #fff;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
