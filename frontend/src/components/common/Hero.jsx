import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import SliderOneImg from '../../assets/images/1.png';
import SliderTwoImg from '../../assets/images/2.png';

const Hero = () => {

  const slides = [
    { id: 1, image: SliderOneImg, alt: 'Banner giới thiệu 1' },
    { id: 2, image: SliderTwoImg, alt: 'Banner giới thiệu 2' },
  ];

  return (
    <section className='section-1'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoHeight={true}
      >

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="content"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-label={slide.alt}
            >
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;