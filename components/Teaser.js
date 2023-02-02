import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
SwiperCore.use([Navigation]);
import style from "../styles/Teaser.module.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0,0,0,0.9)",
      },
    },
  },
});

// responsive
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  dialogPaper: {
    width: "100%",
    maxWidth: "100%",
    margin: "10px",
    borderRadius: "0",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  dialogContentRoot: {
    padding: "0px !important",
  },
  [theme.breakpoints.up("sm")]: {
    dialogContentRoot: {},
  },
}));

// Import Swiper styles
// import 'swiper/swiper.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

SwiperCore.use([Autoplay, EffectFade]);

const main = (props) => {
  console.log("render - Gallery");

  return (
    <div className={`${style.carousel} ${props.isMobile ? style.mobile : ""}`}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
      >
        {props.data &&
          props.data.map((file, i) => {
            return (
              <SwiperSlide key={i}>
                {
                  <div className={style.bigSlide}>
                    <span
                      style={{ display: "block", paddingTop: "57%" }}
                    ></span>
                    <iframe
                      // src="https://www.aparat.com/video/video/embed/videohash/u4YnC/vt/frame"
                      src={
                        "https://www.aparat.com/video/video/embed/videohash/" +
                        (file && (file.split("/")[file.split("/").length - 1])) +
                        "/vt/frame"
                      }
                      allowfullscreen="true"
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                    ></iframe>
                  </div>
                }
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default main;

/*
<style>
    .h_iframe-aparat_embed_frame {
        position: relative;
    }

    .h_iframe-aparat_embed_frame .ratio {
        display: block;
        width: 100%;
        height: auto;
    }

    .h_iframe-aparat_embed_frame iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
<div class="h_iframe-aparat_embed_frame">
    <span style="display: block;padding-top: 57%"></span>
    <iframe src="https://www.aparat.com/video/video/embed/videohash/7vNSZ/vt/frame" allowFullScreen="true"
        webkitallowfullscreen="true" mozallowfullscreen="true">
    </iframe>
</div>
*/
