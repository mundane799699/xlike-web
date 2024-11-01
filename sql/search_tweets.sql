CREATE OR REPLACE FUNCTION search_tweets(
  p_user_id UUID,
  p_search_term TEXT,
  p_screen_name TEXT,
  p_interaction_type TEXT,
  p_offset INTEGER,
  p_limit INTEGER,
  p_sort_column TEXT,
  p_sort_order TEXT
) RETURNS TABLE (
  id TEXT,
  user_id UUID,
  owner_id TEXT,
  tweet_id TEXT,
  bookmarked BOOLEAN,
  favorited BOOLEAN,
  retweeted BOOLEAN,
  interaction_type VARCHAR,
  sort_index TEXT,
  username TEXT,
  screen_name TEXT,
  avatar_url TEXT,
  full_text TEXT,
  lang TEXT,
  created_at BIGINT,
  possibly_sensitive BOOLEAN,
  media_items JSON,
  views_count bigint,
  bookmark_count bigint,
  favorite_count bigint,
  quote_count bigint,
  reply_count bigint,
  retweet_count bigint,
  reply_tweet_url text,
  is_reply boolean,
  is_quote_status boolean,
  has_image boolean,
  has_video boolean,
  has_gif boolean,
  has_link boolean,
  has_quote boolean,
  is_long_text boolean,
  is_thread boolean,
  quoted_tweet json,
  conversations json,
  tweet_user_id text
) AS $$
DECLARE
  query TEXT;
BEGIN
  query := 'SELECT 
    ti.id, 
    ti.user_id, 
    ti.owner_id, 
    ti.tweet_id, 
    ti.bookmarked, 
    ti.favorited, 
    ti.retweeted, 
    ti.interaction_type, 
    ti.sort_index,
    t.username, 
    t.screen_name, 
    t.avatar_url, 
    t.full_text, 
    t.lang,
    t.created_at,
    t.possibly_sensitive,
    t.media_items,
    t.views_count,
    t.bookmark_count,
    t.favorite_count,
    t.quote_count,
    t.reply_count,
    t.retweet_count,
    t.reply_tweet_url,
    t.is_reply,
    t.is_quote_status,
    t.has_image,
    t.has_video,
    t.has_gif,
    t.has_link,
    t.has_quote,
    t.is_long_text,
    t.is_thread,
    t.quoted_tweet,
    t.conversations,
    t.tweet_user_id
  FROM tweet_interactions ti
  LEFT JOIN tweets t ON ti.tweet_id = t.tweet_id
  WHERE ti.user_id = $1
    AND ($2 = '''' OR t.full_text &@~ $2)
	AND ($3 = '''' OR t.screen_name = $3)
    AND ($4 = ''all'' OR ti.interaction_type = $4)
  ORDER BY ' || 
  CASE 
    WHEN p_sort_column = '' THEN 'ti.sort_index'
    ELSE quote_ident(p_sort_column)
  END || ' ' ||
  CASE 
    WHEN upper(p_sort_order) = 'ASC' THEN 'ASC'
    ELSE 'DESC'
  END || 
  ' OFFSET $5 LIMIT $6';
  RETURN QUERY EXECUTE query
  USING p_user_id, p_search_term, p_screen_name, p_interaction_type, p_offset, p_limit;
END;
$$ LANGUAGE plpgsql;