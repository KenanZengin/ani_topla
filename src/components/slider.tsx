"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../public/wedding.png";
import Image from "next/image";

const WeddingSlider: React.FC = () => {
  return (
    <section className="wedding-slider ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true}
        pagination={{ clickable: true }}
        loop={true}
        className="wedding-slider__container"
      >
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={img1}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={img1}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={img1}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={img1}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default WeddingSlider;
