import { useState, useEffect } from "react";

import AppLayout from "components/AppLayout";
import Avatar from "components/Avatar";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((item) => {
            return (
              <div key={item.id}>
                <Avatar src={item.avatar} alt={item.username} />
                <strong>{item.username}</strong>
                <p>{item.message}</p>
              </div>
            );
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          width: 100%;
          height: 49px;
          position: fixed;
          top: 0;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        section {
          padding-top: 100px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </>
  );
}
