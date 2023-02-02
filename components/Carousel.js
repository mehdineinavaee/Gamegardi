// import Image from "next/image";
// Import Swiper React components
import useSWR from "swr";
import api from "../api.js";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import style from "../styles/Carousel.module.css";

// Import Swiper styles
// import 'swiper/swiper.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

SwiperCore.use([Autoplay, EffectFade]);

const main = ({ isMobile }) => {
  const { data, error } = useSWR(api.getBanners, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={`${style.carousel} ${isMobile ? style.mobile : ""}`}>
      <Swiper
        // style={{ height: "100%" }}
        // autoplay
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        autoHeight={true}
        // centeredSlides={true}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.result.map((banner) => {
          return (
            <SwiperSlide>
              <a href={banner.link} target="_blank">
                <div
                  className="ar-img"
                  style={{ backgroundImage: `url(${banner.contentFilePath})`, cursor: 'pointer' }}
                >
                  <img className="ar" src="/images/ar_10_x_4.png" />
                </div>
              </a>
              {/* <img
                src={banner.contentFilePath}
                style={{ display: "block", width: "100%" }}
              /> */}
              {/* <Image src="/images/01.jpg" /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default main;
