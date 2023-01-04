import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Play from "../assets/game.png";
import Win from "../assets/card.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

export default function Swip() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-4"
      >
        <SwiperSlide>
          <Image
            src={Play}
            className="rounded-lg"
            alt="play"
            height={400}
            width={1000}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Win}
            className="rounded-lg"
            alt="win"
            height={400}
            width={1000}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
