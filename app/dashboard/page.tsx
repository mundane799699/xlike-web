"use client";

import ButtonAccount from "@/components/ButtonAccount";
import apiClient from "@/libs/api";
import { useCallback, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Dashboard() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) {
        return;
      }
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    setIsLoading((prevIsLoading) => {
      if (prevIsLoading) {
        return prevIsLoading;
      }
      apiClient
        .get("/tweet", { params: { page } })
        .then((res) => {
          setTweets((prev) => [...prev, ...res.data]);
          setPage((prev) => prev + 1);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
      return true;
    });
  }, [page]);

  return (
    <div className="h-screen pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 p-4 flex justify-end shadow-md">
        <ButtonAccount />
      </header>
      <main className="p-8 bg-blue-200 min-h-full">
        <section className="max-w-2xl mx-auto">
          {tweets.map((tweet) => (
            <div
              key={tweet.tweet_id}
              className="relative block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="absolute top-2 right-2">
                <a
                  href={`https://x.com/${tweet.screen_name}/status/${tweet.tweet_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on X"
                  className="text-[#1DA1F2] hover:text-[#0c85d0] cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img
                  src={tweet.avatar_url}
                  alt={tweet.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-bold">{tweet.username}</h3>
                  <p className="text-sm text-gray-500">@{tweet.screen_name}</p>
                </div>
              </div>
              <p className="mb-2">{tweet.full_text}</p>
              {tweet.media_items && tweet.media_items.length > 0 && (
                <div className="relative w-full flex justify-center">
                  <img
                    src={tweet.media_items[0].media_url_https}
                    alt="Tweet image"
                    className="max-h-[520px]"
                  />
                  {tweet.media_items[0].type !== "photo" && (
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full">
                      <svg viewBox="0 0 60 61" aria-hidden="true">
                        <g>
                          <circle
                            cx="30"
                            cy="30.4219"
                            fill="#333333"
                            opacity="0.6"
                            r="30"
                          ></circle>
                          <path
                            d="M22.2275 17.1971V43.6465L43.0304 30.4218L22.2275 17.1971Z"
                            fill="white"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
