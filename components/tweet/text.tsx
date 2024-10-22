const Text = ({ text, searchTerm }: { text: string; searchTerm?: string }) => {
  const formatTweet = (text: string) => {
    // Split the text into lines
    return text.split("\n").map((line, index) => {
      // Replace URLs with clickable links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let withLinks = line.replace(
        urlRegex,
        (url) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`
      );

      // Highlight mentions and hashtags
      const mentionRegex = /@(\w+)/g;
      const hashtagRegex = /#([^\s]+)/g;
      withLinks = withLinks
        .replace(
          mentionRegex,
          `<a href="https://x.com/$1" class="text-blue-500">@$1</a>`
        )
        .replace(hashtagRegex, '<span class="text-blue-500">#$1</span>');

      if (searchTerm) {
        const searchRegex = new RegExp(`(${searchTerm})`, "gi");
        withLinks = withLinks.replace(
          searchRegex,
          '<mark class="bg-yellow-200">$1</mark>'
        );
      }

      return (
        <p
          key={index}
          className={`mb-2`}
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white overflow-hidden md:max-w-3xl">
      {formatTweet(text)}
    </div>
  );
};

export default Text;
