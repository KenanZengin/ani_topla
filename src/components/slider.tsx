"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";



import swiperImg from "../../public/2.png";
import swiperImg2 from "../../public/3.png";
import swiperImg3 from "../../public/10.png";
import swiperImg4 from "../../public/5.png";
import swiperImg5 from "../../public/6.png";
import swiperImg6 from "../../public/7.png";
import swiperImg7 from "../../public/8.png";
import swiperImg8 from "../../public/9.png";


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
              src={swiperImg5}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg2}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg3}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg6}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg4}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg7}
              alt="Düğün Resim 1"
              className="wedding-slider__image"
              fill
            />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-img">
            <Image
              src={swiperImg8}
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
