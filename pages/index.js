import { useEffect } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"

import { colors } from "styles/theme"

import { loginWithGitHub } from "firebase/client"
import Logo from "components/Icons/Logo"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()

  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Logo fill="#fff" width={200} height={200} />
        <h2>Talk about coding! 👩‍💻👩‍💻</h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
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
  )
}
