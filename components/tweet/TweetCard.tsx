import { Bookmark, ExternalLink, Heart, Loader2, Trash2 } from "lucide-react";
import Text from "@/components/tweet/text";
import Cover from "@/components/tweet/cover";

interface TweetCardProps {
  tweet: any;
  searchTerm: string;
  openModal: (id: string) => void;
}

const TweetCard = ({ tweet, searchTerm, openModal }: TweetCardProps) => {
  return (
    <div
      key={tweet.id}
      className="relative block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="absolute top-2 right-2">
        {tweet.interaction_type === "bookmark" && (
          <Bookmark className="h-5 w-5 text-gray-400" />
        )}
        {tweet.interaction_type === "like" && (
          <Heart className="h-5 w-5 text-gray-400" />
        )}
      </div>
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
      <Text text={tweet.full_text} searchTerm={searchTerm} />
      {tweet.media_items && tweet.media_items.length > 0 && (
        <Cover media_item={tweet.media_items[0]} />
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
              <Cover media_item={tweet.quoted_tweet.media_items[0]} />
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
            second: "2-digit",
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
  );
};

export default TweetCard;
