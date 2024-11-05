type MediaItem = {
  media_url_https: string;
  video_info?: {
    variants: { url: string }[];
  };
  type: string;
};

const Cover = ({ media_item }: { media_item: MediaItem }) => {
  const url = media_item.video_info
    ? media_item.video_info.variants[media_item.video_info.variants.length - 1]
        .url
    : media_item.media_url_https.split("?")[0] + "?format=jpg&name=large";

  const src = media_item.media_url_https;
  return (
    <div className="relative w-full flex justify-center min-h-14 mb-2">
      <a href={url || src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt="Tweet image" className="max-h-[520px]" />
      </a>
      {media_item.type !== "photo" && (
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
  );
};

export default Cover;
export type { MediaItem };
