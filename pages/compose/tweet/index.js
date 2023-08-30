import { useState } from "react"

import { useRouter } from "next/router"

import AppLayout from "components/AppLayout"
import Button from "components/Button"

import useUser from "hooks/useUser"

import { addDevit } from "firebase/client"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const router = useRouter()

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      message,
      userId: user.uid,
      username: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="¿Qué está pasando?"
          ></textarea>{" "}
          <div>
            <Button disabled={isButtonDisabled}>Publicar</Button>
          </div>
        </form>
      </AppLayout>

      <style jsx>{`
        textarea {
          border: 0;
          padding: 15px;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          width: 100%;
          resize: none;
        }

        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
