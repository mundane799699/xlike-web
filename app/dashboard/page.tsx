"use client";

import ButtonAccount from "@/components/ButtonAccount";
import { useAuth } from "@/hooks/use-auth";
import apiClient from "@/libs/api";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { createClient } from "@/libs/supabase/client";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Dashboard() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const supabase = createClient();
  const modalRef = useRef<HTMLDialogElement>(null);
  const deletingIdRef = useRef<string | null>(null);

  const initFetch = async () => {
    const userId = await fetchUser();
    fetchData(userId);
  };

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
    return user?.id;
  };

  const fetchData = useCallback(
    (userId?: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      apiClient
        .get("/tweet/list", { params: { page, userId: userId || user?.id } })
        .then((res) => {
          const updatedData: any[] = res.data.map((item: any) => {
            return { ...item, deleteLoading: false };
          });
          setTweets((prev) => [...prev, ...updatedData]);
          setPage((prev) => prev + 1);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    [isLoading, page]
  );

  const handleScroll = useCallback(
    useDebouncedCallback(() => {
      if (isLoading) {
        return;
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        fetchData();
      }
    }, 300),
    [fetchData]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    initFetch();
  }, []);

  const deleteTweet = async (id: string) => {
    modalRef.current?.close();
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === id ? { ...tweet, deleteLoading: true } : tweet
      )
    );
    apiClient
      .post("/tweet/delete", {
        userId: user?.id,
        id,
      })
      .then((res: any) => {
        if (res.code === 200) {
          setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
        }
      })
      .finally(() => {
        setTweets((prev) =>
          prev.map((tweet) =>
            tweet.id === id ? { ...tweet, deleteLoading: false } : tweet
          )
        );
      });
  };

  const openModal = (id: string) => {
    deletingIdRef.current = id;
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    deletingIdRef.current = null;
    modalRef.current?.close();
  };

  return (
    <div className="h-screen pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 p-4 flex justify-end shadow-md">
        <ButtonAccount />
      </header>
      <main className="p-8 bg-blue-200 min-h-full">
        <section className="max-w-2xl mx-auto">
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="relative block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-2">
                <img
                  src={tweet.avatar_url}
                  alt={tweet.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-bold">
                    <a
                      href={`https://x.com/${tweet.screen_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tweet.username}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">
                    <a
                      href={`https://x.com/${tweet.screen_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{tweet.screen_name}
                    </a>
                  </p>
                </div>
              </div>
              <p className="mb-2">{tweet.full_text}</p>
              {tweet.media_items && tweet.media_items.length > 0 && (
                <div className="relative w-full flex justify-center min-h-14">
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
              {/* 引用的推文 */}
              {tweet.quoted_tweet && (
                <div className="mt-3 border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <img
                      src={tweet.quoted_tweet.avatar_url}
                      alt={tweet.quoted_tweet.username}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">
                        <a
                          href={`https://x.com/${tweet.quoted_tweet.screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tweet.quoted_tweet.username}
                        </a>
                      </h4>
                      <p className="text-xs text-gray-500">
                        <a
                          href={`https://x.com/${tweet.quoted_tweet.screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @{tweet.quoted_tweet.screen_name}
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{tweet.quoted_tweet.full_text}</p>
                  {tweet.quoted_tweet.media_items &&
                    tweet.quoted_tweet.media_items.length > 0 && (
                      <div className="relative w-full flex justify-center">
                        <img
                          src={
                            tweet.quoted_tweet.media_items[0].media_url_https
                          }
                          alt="Quoted tweet image"
                          className="rounded-lg max-h-[520px]"
                        />
                        {tweet.quoted_tweet.media_items[0].type !== "photo" && (
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50">
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
              )}
              {/* 底部布局，放删除按钮 */}
              <div className="flex justify-between items-center mt-2 py-2">
                <div className="text-sm text-gray-500">
                  {new Date(tweet.created_at * 1000).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={`https://x.com/${tweet.screen_name}/status/${tweet.tweet_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:cursor-pointer"
                  >
                    <ExternalLink className="h-6 w-6 text-gray-400 hover:text-blue-500" />
                  </a>
                  <div>
                    {tweet.deleteLoading ? (
                      <Loader2 className="animate-spin text-blue-500" />
                    ) : (
                      <Trash2
                        className="hover:cursor-pointer h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => openModal(tweet.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-500" />
            </div>
          )}
          {/* 删除确认弹窗 */}
          <dialog ref={modalRef} id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Confirm to delete this tweet?
              </h3>

              <div className="flex justify-end gap-4">
                <button className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteTweet(deletingIdRef.current)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </dialog>
        </section>
      </main>
    </div>
  );
}
