"use client";

import ButtonAccount from "@/components/ButtonAccount";
import { useAuth } from "@/hooks/use-auth";
import apiClient from "@/libs/api";
import { ChevronDownIcon, Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { createClient } from "@/libs/supabase/client";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import TweetCard from "@/components/tweet/TweetCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import config from "@/config";
import Image from "next/image";
import logo from "@/app/icon.png";

// export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
type SearchParamsType = {
  userId: string;
  page?: number;
  searchTerm?: string;
  screenName?: string;
  interactionType?: string;
};

export default function Dashboard() {
  const [tweets, setTweets] = useState([]);
  const [appendLoading, setAppendLoading] = useState(false);
  const [topLoading, setTopLoading] = useState(false);
  const { user, setUser } = useAuth();
  const supabase = createClient();
  const deletingIdRef = useRef<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightSearchTerm, setHighlightSearchTerm] = useState("");
  const searchParamsRef = useRef<SearchParamsType>({
    userId: "",
    page: 1,
    searchTerm: "",
    screenName: "",
    interactionType: "all",
  });
  const hasMore = useRef(true);
  const authors = useRef([]);
  const [inputValue, setInputValue] = useState("");
  const filteredAuthors = useMemo(
    () =>
      inputValue
        ? authors.current.filter(
            (author) =>
              author.username
                .toLowerCase()
                .includes(inputValue.toLowerCase()) ||
              author.screen_name
                .toLowerCase()
                .includes(inputValue.toLowerCase())
          )
        : authors.current,
    [inputValue, authors.current]
  );
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const initFetch = async () => {
    await fetchUser();
    fetchData(false);
    fetchAuthors();
  };

  const fetchAuthors = () => {
    apiClient
      .get("/tweet/authors", {
        params: {
          userId: searchParamsRef.current.userId,
        },
      })
      .then((res) => {
        authors.current = res.data;
      });
  };

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
    searchParamsRef.current.userId = user?.id || "";
  };

  const fetchData = useCallback(
    (isAppend: boolean = false) => {
      if (appendLoading || topLoading) {
        return;
      }
      if (isAppend) {
        setAppendLoading(true);
      } else {
        searchParamsRef.current.page = 1;
        setTopLoading(true);
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      apiClient
        .get("/tweet/list", {
          params: {
            ...searchParamsRef.current,
          },
        })
        .then((res: any) => {
          const updatedData: any[] = res.data.map((item: any) => {
            return { ...item, deleteLoading: false };
          });
          setTweets((prev) => {
            return isAppend ? [...prev, ...updatedData] : updatedData;
          });
          setHighlightSearchTerm(searchParamsRef.current.searchTerm);
          searchParamsRef.current.page = searchParamsRef.current.page + 1;
          hasMore.current = res.hasMore;
          setAppendLoading(false);
          setTopLoading(false);
        })
        .catch(() => {
          setAppendLoading(false);
          setTopLoading(false);
        });
    },
    [appendLoading, topLoading]
  );

  const handleScroll = useCallback(
    useDebouncedCallback(() => {
      if (appendLoading || topLoading) {
        return;
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1000 && hasMore.current) {
        fetchData(true);
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
    setDeleteModalOpen(false);
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
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    deletingIdRef.current = null;
    setDeleteModalOpen(false);
  };

  const search = () => {
    fetchData(false);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchParamsRef.current.searchTerm = e.target.value;
  };

  const handleSelectInteractionType = (value: string) => {
    searchParamsRef.current.interactionType = value;
    fetchData(false);
  };

  const handleSelectAuthor = (author: any) => {
    searchParamsRef.current.screenName = author.screen_name;
    setSelectedAuthor(author);
    setIsOpen(false);
    setInputValue("");
    fetchData(false);
  };

  const clearAuthor = () => {
    setSelectedAuthor(null);
    searchParamsRef.current.screenName = "";
    fetchData(false);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
    searchParamsRef.current.searchTerm = "";
    fetchData(false);
  };

  return (
    <div className="pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 p-4 flex items-center justify-between shadow-md">
        <div className="flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 ml-4"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
        </div>
        <div className="flex-1 flex w-full items-center">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search tweets..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
            />
            {searchTerm && (
              <button
                onClick={clearSearchTerm}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={search}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* 选择互动类型 */}
          <div className="flex w-48 ml-2">
            <Select
              defaultValue="all"
              onValueChange={handleSelectInteractionType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="like">Like</SelectItem>
                <SelectItem value="bookmark">Bookmark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 选择作者 */}
          <div className="flex w-48">
            {selectedAuthor ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 border border-gray-300 rounded-full px-2 py-1">
                  {selectedAuthor.screen_name}
                </span>
                <X
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={clearAuthor}
                />
              </div>
            ) : (
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    Select author
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Select author"
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>Select author</CommandEmpty>
                      <CommandGroup>
                        {filteredAuthors.map((author) => (
                          <CommandItem
                            key={author.screen_name}
                            value={author.username}
                            onSelect={() => handleSelectAuthor(author)}
                          >
                            <div className="flex items-center">
                              <img
                                src={author.avatar_url}
                                alt={author.username}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <div className="flex flex-col">
                                <span>{author.username}</span>
                                <span className="text-sm text-gray-500">
                                  @{author.screen_name}
                                </span>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <ButtonAccount />
        </div>
      </header>

      <main className="p-8 bg-blue-200 min-h-screen">
        <section className="max-w-2xl mx-auto">
          {topLoading && (
            <div className="flex justify-center items-center mb-2">
              <Loader2 className="animate-spin text-blue-500 h-12 w-12" />
            </div>
          )}
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              searchTerm={highlightSearchTerm}
              openModal={openModal}
            />
          ))}
          {appendLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-500 h-12 w-12" />
            </div>
          )}
          {/* 删除确认弹窗 */}
          {deleteModalOpen && (
            <div className="z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">
                  Confirm to delete this tweet?
                </h3>

                <div className="flex justify-end gap-4">
                  <button className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => deleteTweet(deletingIdRef.current)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <ScrollToTop />
    </div>
  );
}
