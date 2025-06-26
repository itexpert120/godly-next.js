"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    image: "/assets/team.png",
    text: "Unbelievable dedication and absolute pride for all that they do.",
    name: "VIRGINIA C",
    location: "Weston, Fl",
  },
  {
    image: "/assets/review-2.png",
    text: "They are the best company I've used for window washing. Believe me, I've tried three others before them.",
    name: "Connor K",
    location: "Ft. Laud",
  },
  {
    image: "/assets/daniela.png",
    text: "Can't say enough great things about Godly windows. 4th time using them, and they always do a wonderful job.",
    name: "Daniela D",
    location: "Boca Raton",
  },
  {
    image: "/assets/david.png",
    text: "Moses and his team were great! Made the windows look like new again.",
    name: "David Seltzer",
    location: "Esq Ft. Lauderdale",
  },
];

/* eslint-disable @next/next/no-img-element */
const SingleReview = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="paper-bg-16 relative flex min-h-[400px] w-full flex-col justify-center gap-5 bg-[#252424] px-[16px] py-[50px] text-white md:px-[54px]">
      <img
        src={"/assets/fourstep_bg.webp"}
        alt="Background"
        className="absolute top-48 right-4 h-[calc(100%-156px)] w-auto transform-[scaleX(-1)] md:right-16"
      />
      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <img
            src={
              index === current - 1
                ? "/assets/filled-circle.png"
                : "/assets/empty-circle.png"
            }
            alt="Circle"
            className="size-2.5"
            key={index}
            onClick={() => {
              if (api) {
                api.scrollTo(index);
              }
            }}
          />
        ))}
      </div>
      <Carousel
        className="flex w-full flex-col gap-[80px]"
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {reviews.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative flex flex-col gap-0">
                <p className="trim absolute -top-[30px] -left-[40px] text-9xl">
                  &quot;
                </p>
                <div className="relative flex flex-col gap-[40px]">
                  <h3
                    className="text-grain trim !bg-white text-[40px] tracking-[2px] md:text-[72px]"
                    data-text="The Best Windows Cleaning Company in Florida!"
                  >
                    &quot;{item.text}&quot;
                  </h3>
                  <div className="absolute left-0 z-10 flex items-center justify-center rounded-full">
                    <Icons.quote />
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="size-12" />
                    <p className="trim font-sans text-[18px] text-white">
                      {item.name}, <br />
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div>
          <CarouselPrevious className="top-auto -bottom-22 left-0 size-[60px] text-black" />
          <CarouselNext className="top-auto -bottom-22 left-24 size-[60px] text-black" />
        </div>
      </Carousel>
    </div>
  );
};

export default SingleReview;

const Icons = {
  quote: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="126"
      height="95"
      viewBox="0 0 126 95"
      fill="none"
    >
      <path
        d="M8.25656 83.5981C2.75219 75.7347 0 66.2986 0 54.8967C0 38.3836 4.71804 25.0158 14.5473 15.5797C24.3765 6.14366 38.1375 1.42561 55.4369 0.639282V19.1183C43.6418 19.5114 35.3853 22.6568 30.2741 28.9475C24.7697 35.2382 22.4107 42.7084 22.4107 50.5718C22.4107 52.9308 22.4107 54.8967 22.8038 55.683C25.9492 52.5377 30.2741 50.965 36.1716 50.965C42.4623 50.965 47.1804 52.9308 51.1121 56.4694C55.0437 60.4011 57.0096 65.5123 57.0096 72.1961C57.0096 78.88 54.6506 84.3844 49.9325 88.7093C45.2145 93.0341 38.9238 95 31.0604 95C21.6243 95 13.7609 91.4615 8.25656 83.5981ZM76.2749 83.5981C70.7705 75.7347 68.0183 66.2986 68.0183 54.8967C68.0183 38.3836 72.7364 25.0158 82.5656 15.5797C92.3949 6.14366 106.156 1.42561 123.455 0.639282V19.1183C111.66 19.5114 103.404 22.6568 98.2924 28.9475C92.788 35.2382 90.429 42.7084 90.429 50.5718C90.429 52.9308 90.429 54.8967 90.8222 55.683C93.9675 52.5377 98.2924 50.965 104.19 50.965C110.481 50.965 115.199 52.9308 119.13 56.4694C123.062 60.4011 125.028 65.5123 125.028 72.1961C125.028 78.88 122.669 84.3844 117.951 88.7093C113.233 93.0341 106.942 95 99.0787 95C89.6427 95 81.7793 91.4615 76.2749 83.5981Z"
        fill="white"
        fillOpacity="0.05"
      />
    </svg>
  ),
};
