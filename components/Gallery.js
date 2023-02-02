// import Image from "next/image";
// Import Swiper React components
import { useEffect, useState } from "react";
import useSWR from "swr";
import api from "../api.js";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import style from "../styles/Gallery.module.css";
import Image from "next/image";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

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

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Import Swiper styles
// import 'swiper/swiper.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

SwiperCore.use([Autoplay, EffectFade]);

const main = (props) => {
  console.log("render - Gallery");

  const classes = useStyle();

  /* const { data, error } = useSWR(api.getBanners, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>; */

  /* const [images, setImages] = useState(null);
  useEffect(async () => {
    const images = await fetcher(api.getBanners);
    setImages(images.result);
  }, []); */

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // open image
  const [popupGallery, setPopupGallery] = useState({
    openState: false,
    initialSlide: 0,
  });
  const handleThumbnailClick = (e) => {
    const index = e.currentTarget.dataset.index;
    setPopupGallery({
      openState: true,
      initialSlide: index,
    });
  };
  const handlePopupGalleryClose = () => {
    setPopupGallery({
      ...popupGallery,
      openState: false,
    });
  };

  return (
    <div className={`${style.carousel} ${props.isMobile ? style.mobile : ""}`}>
      <Swiper spaceBetween={20} slidesPerView={5}>
        {props.data &&
          props.data
            .filter((file) => !file.fileLink)
            .map((file, i) => {
              // if (!file.fileLink) {
              return (
                <SwiperSlide key={i}>
                  {
                    <div
                      className={`ar-img ${style.thumbnail}`}
                      style={{ backgroundImage: `url(${file.filePath})` }}
                      data-index={i}
                      onClick={handleThumbnailClick}
                    >
                      <img className="ar" src="/images/ar_10_x_10.png" />
                    </div>
                  }
                </SwiperSlide>
              );
              // }
            })}
      </Swiper>
      <ThemeProvider theme={theme}>
        <Dialog
          open={popupGallery.openState}
          onClose={handlePopupGalleryClose}
          fullWidth={true}
          classes={props.isMobile && { paper: classes.dialogPaper }}
        >
          <DialogContent
            classes={props.isMobile && { root: classes.dialogContentRoot }}
          >
            {
              <Swiper
                initialSlide={popupGallery.initialSlide}
                spaceBetween={20}
                slidesPerView={1}
                autoHeight={false}
              >
                {props.data &&
                  props.data
                    .filter((file) => !file.fileLink)
                    .map((file, i) => {
                      // if (!file.fileLink) {
                      return (
                        <SwiperSlide key={i}>
                          {
                            <div className={style.bigSlideWrap}>
                              <div className={style.bigSlide}>
                                <img
                                  className={style.bigImage}
                                  src={file.filePath}
                                  alt={props.gameName}
                                />
                              </div>
                              {/* <DragIndicatorIcon className={style.slideHandle} /> */}
                            </div>
                          }
                        </SwiperSlide>
                      );
                      // }
                    })}
              </Swiper>
            }
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default main;
