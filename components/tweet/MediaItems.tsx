import Cover, { MediaItem } from "./cover";

const MediaItems = ({ media_items }: { media_items: MediaItem[] }) => {
  return (
    <>
      {media_items?.map((item) => (
        <Cover key={item.media_url_https} media_item={item} />
      ))}
    </>
  );
};

export default MediaItems;
