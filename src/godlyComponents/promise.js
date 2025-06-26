"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect, useRef } from "react";
import "@/styles/fourstepprocess.css";
import Image from "next/image";

import ticketBg from "@/assets/ticket-bg.webp";

import fam1 from "@/assets/fam-1.webp";
import fam2 from "@/assets/fam-2.webp";
import img1 from "@/assets/rocket.webp";
import img2 from "@/assets/plant.webp";
import img3 from "@/assets/eagle.webp";
import SectionButton from "@/components/sectionButton";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const steps = [
  {
    number: "01",
    icon: img1,
    title: "QUICK ESTIMATES",
    text: "Fast, free quotes — usually within 24 hours",
  },
  {
    number: "02",
    icon: img2,
    title: "FULLY INSURED",
    text: "We’re fully insured with $2M in coverage — including workers’ comp.",
  },
  {
    number: "03",
    icon: img3,
    title: "BUILT ON INTEGRITY",
    text: "If something’s not right, we make it right — no excuses, no runaround.",
  },
];

const Promise = () => {
  // Add state to track active card
  const [activeCard, setActiveCard] = useState(null);

  // Toggle function to handle touch interactions
  const toggleCard = (index) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRestartClick = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Add event listeners for video play/pause events and intersection observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    // Set up intersection observer for autoplay and autopause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(
            "Video intersection:",
            entry.isIntersecting,
            "Video paused:",
            video.paused,
          );
          if (entry.isIntersecting && video.paused) {
            console.log("Attempting to play video");
            video.play().catch(() => {
              // Autoplay failed, which is expected on some browsers
              console.log("Autoplay failed - user interaction required");
            });
          } else if (!entry.isIntersecting && !video.paused) {
            console.log("Pausing video - out of view");
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="promise"
      className="paper-bg-16 flex flex-col items-center justify-items-center gap-10 bg-[#ede0d2] px-[30px] pt-[50px] pb-[100px] md:px-[86px] md:py-[150px]"
    >
      <div className="mb-[150px] flex flex-col items-center gap-[70px]">
        <h4
          className="text-grain trim !bg-[#191717] text-center text-4xl font-normal tracking-wide md:text-[64px]"
          data-text="What It Really Looks Like When We Show Up"
        >
          What It Really Looks <br /> Like When We Show Up
        </h4>
        <div className="paper-bg-8 flex w-full max-w-fit flex-col items-center justify-center gap-2 rounded-[2.395px] border-[1.2px] border-[rgba(106,100,100,0.12)] bg-white p-[7.2px] pb-[14.37px] md:mx-auto">
          <div className="group relative w-full max-w-[400px]">
            <video
              className="aspect-[9/16] h-auto w-full rounded-sm"
              ref={videoRef}
              playsInline
              muted
              preload="metadata"
            >
              <source
                src="https://mnoycwyw8j.ufs.sh/f/XF15f1IJ6EyQmpzspUT8Vkc07QNnH6YvMdU42GhueSgt3xjp"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={handleVideoClick}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className={cn(
                "group absolute inset-0 z-10 flex items-center justify-center transition-all duration-300",
                !isPlaying ? "bg-black/40" : "bg-transparent hover:bg-black/20",
              )}
            >
              <Image
                src="/assets/play-button.png"
                alt=""
                width={64}
                height={64}
                className={cn(
                  "size-16 object-contain transition-all duration-300",
                  isPlaying
                    ? "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-80"
                    : "scale-100 opacity-100 hover:scale-110",
                )}
              />
            </button>
            <button
              onClick={handleRestartClick}
              aria-label="Restart video"
              className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/80"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative flex h-[200px] w-[758px] scale-50 -rotate-2 flex-col items-center justify-center bg-cover bg-center bg-no-repeat md:h-[210px] md:scale-100"
        style={{
          backgroundImage: `url(${ticketBg.src})`,
        }}
      >
        <div className="flex -translate-y-11 flex-col items-center gap-4">
          <h2 className="text-trim -rotate-2 text-[64px] font-normal tracking-[5.76px] text-[#191717]">
            old fashioned Values
          </h2>
          <h4 className="absolute top-3/5 -mt-0 -rotate-2 text-3xl font-normal text-[#191717]">
            <span className="text-[32px] underline">UNRIVALED</span>{" "}
            <span
              className="text-trim quality-text font-['luminaire-script'] text-[80px] text-[#B0906E]"
              data-text="Quality"
            >
              Quality
            </span>
          </h4>
        </div>
      </div>
      <Story />
      <div className="flex flex-col items-center justify-center gap-4 py-10 md:gap-10">
        <h4
          className="text-grain trim !bg-[#191717] text-center text-4xl font-normal tracking-wide md:text-[64px]"
          data-text="Services"
        >
          Services
        </h4>
        <h4 className="trim text-center text-4xl font-normal tracking-wide md:-mt-6 md:text-[64px]">
          <span
            className="md:text-grain trim relative text-[#61503E] underline"
            data-text="The Way"
          >
            The Way
          </span>{" "}
          <span
            className="text-grain trim !bg-[#191717] text-4xl md:text-[64px]"
            data-text="It Should be"
          >
            It Should be
          </span>
        </h4>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-2 sm:px-4 md:gap-8">
        {steps.map((step, index) => {
          const isActive = activeCard === index;
          return (
            <div
              key={index}
              className={
                "paper-bg-8 group relative flex w-full max-w-[350px] rounded-[6px] p-2 " +
                (isActive
                  ? "bg-[#E7E3E0] text-black"
                  : "bg-[#201E1E] text-[#FFFFFF]") +
                " hover:bg-[#E7E3E0] hover:text-black"
              }
              onClick={() => toggleCard(index)}
            >
              <img
                src={step.icon.src}
                alt={step.title}
                className={`absolute top-0 right-0 h-[80%] ${
                  index === 1
                    ? (isActive ? "filter-[invert(0)]" : "filter-[invert(1)]") +
                      " group-hover:filter-[invert(0)]"
                    : (isActive ? "filter-[invert(1)]" : "") +
                      " group-hover:filter-[invert(1)]"
                }`}
              />
              <div className="relative z-10 flex min-h-65 flex-col items-start justify-between gap-15 rounded-md border border-dashed border-[#6A6464] p-4">
                <div className="flex flex-col gap-8">
                  <h5 className="text-base font-normal">
                    <span className="text-base">{step.number}</span>
                  </h5>

                  <div
                    className={`text-grain max-w-[170px] text-left text-4xl ${
                      isActive ? "!bg-[#2D2B2B]" : "!bg-white"
                    } group-hover:bg-[#2D2B2B]!`}
                    data-text={step.title}
                    style={{ marginBottom: "1rem" }}
                  >
                    {step.title}
                  </div>
                </div>

                <p
                  className={`text-grain text-left text-base ${
                    isActive ? "!bg-[#2D2B2B]" : "!bg-white"
                  } group-hover:bg-[#2D2B2B]!`}
                  data-text={step.text}
                  style={{ fontFamily: "Inter" }}
                >
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <SectionButton>Get My Free Quote</SectionButton>
      {/* <EstimateButton /> */}
    </div>
  );
};

export default Promise;

function Story() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Setup event listeners for the carousel
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);
  return (
    <div
      className="flex w-full max-w-[1100px] flex-col gap-[34px] rounded-[12px] bg-[#1F1D1D] p-4 md:mt-12 md:flex-row md:gap-10"
      style={{
        boxShadow:
          "0px 4px 4px 0px rgba(255, 255, 255, 0.30) inset, 0px 3.015px 3.015px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="relative overflow-visible">
        <Carousel
          className="carousel-dots pointer-none: relative w-full overflow-visible"
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <div className="absolute top-2 -left-6 z-50 h-3 w-18 -rotate-45 bg-[#F3CA9ECC]"></div>
          <div className="absolute -right-6 bottom-2 z-50 h-3 w-18 -rotate-45 bg-[#F3CA9ECC]"></div>
          <CarouselContent className="overflow-visible">
            <CarouselItem className="overflow-visible">
              <div className="relative min-h-[200px] overflow-visible rounded-sm bg-[#e7e3df] p-2 text-[#1c1c1c]">
                <Image
                  src={fam1}
                  alt="family"
                  className="h-contain bg-full h-full overflow-clip"
                />
                <p className="text-center font-['luminaire-script'] text-base">
                  Our family business
                </p>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="relative min-h-[200px] rounded-sm bg-[#e7e3df] p-2 text-[#1c1c1c]">
                <Image src={fam2} alt="family" />
                <p className="text-center font-['luminaire-script'] text-base">
                  Quality service
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === current ? "bg-[#F3CA9E]" : "bg-[#F3CA9E]/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start justify-center gap-[34px] p-3 md:gap-[40px]">
        <h4 className="flex items-center gap-4 text-4xl text-white md:text-6xl">
          <span
            className="text-grain !bg-[#F3CA9E] font-['marlton']"
            data-text="LOCAL"
          >
            LOCAL
          </span>
          <span
            className="text-grain !bg-white font-['marlton']"
            data-text="FAMILY"
          >
            {" "}
            FAMILY
          </span>
          <span
            className="text-grain !bg-white font-['marlton']"
            data-text="OWNED"
          >
            {" "}
            OWNED
          </span>
        </h4>
        <p
          className="text-justify text-sm tracking-wide text-[#A4A4A4] md:text-base"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Godly was founded by{" "}
          <span className="bg-[#2D2B2B] px-1 text-[#F3CA9E]">
            Perfectionist
          </span>
          who blend honest blue-collar work with modern craftsmanship — all at
          <span className="bg-[#2D2B2B] px-1 text-[#F3CA9E]">
            a fair price.
          </span>
        </p>
        <p
          className="text-justify text-sm tracking-wide text-[#A4A4A4] md:text-base"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          We’re bringing back a time when a handshake meant something — when
          people did what they said they would, and did it right the first time.
        </p>
      </div>
    </div>
  );
}
