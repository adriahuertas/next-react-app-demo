import { useEffect, useState } from "react"

import { useRouter } from "next/router"
import Head from "next/head"

import Button from "components/Button"

import useUser from "hooks/useUser"

import { addDevit, uploadImage } from "firebase/client"
import { getDownloadURL } from "firebase/storage"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  console.log(user)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      task.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(task.snapshot.ref).then(setImgUrl)
        }
      )
    }
  }, [task])

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
      img: imgUrl,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (event) => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    event.dataTransfer.setData("text/plain", null)
    console.log("drag start")
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    console.log(event.dataTransfer.files[0])
    const file = event.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Publicar un tweet</title>
      </Head>
      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar alt={user.name} src={user.avatar} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
          ></textarea>{" "}
          {imgUrl && (
            <section className="remove-img">
              <button onClick={() => setImgUrl(null)}>x</button>
              <img src={imgUrl} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Publicar</Button>
          </div>
        </form>
      </section>

      <style jsx>{`
        div {
          padding: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 15px;
          right: 15px;
          border: 0;
          color: white;
          border-radius: 999px;
          width: 32px;
          height: 32px;
          font-size: 24px;
          cursor: pointer;
        }

        form {
          padding: 10px;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
        }

        .remove-img {
          position: relative;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }

        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
