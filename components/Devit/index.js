import Avatar from "components/Avatar"

import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  message,
  username,
  id,
  img,
  userId,
  createdAt,
}) {
  console.log(img)
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <span> · </span>
          <Link href={`/status/${id}`}>
            <a>
              <time>{timeago}</time>
            </a>
          </Link>
          <p>{message}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
          border-bottom: 2px solid #eaf7ff;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
