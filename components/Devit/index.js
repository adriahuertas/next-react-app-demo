import Avatar from "components/Avatar"

import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  message,
  username,
  id,
  userId,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <span> · </span>
          <date>{timeago}</date>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
          border-bottom: 2px solid #eaf7ff;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
