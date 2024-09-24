import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Sync and Search your Twitter Likes
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          xlike is a chrome extension that allows you to sync and search your
          twitter(x) likes.
        </p>
        <button className="btn btn-primary btn-wide">
          Get {config.appName}
        </button>

        <TestimonialsAvatars priority={true} />
      </div>
    </section>
  );
};

export default Hero;
