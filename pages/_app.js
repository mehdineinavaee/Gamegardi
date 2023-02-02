import Head from "next/head";
import { useTheme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import "../styles/Global.css";
import "swiper/swiper-bundle.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Top from "../components/Top";
import Bottom from "../components/Bottom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// RTL
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  /* palette: {
    type: "dark",
  }, */
  typography: {
    fontFamily: `"escapeRoom", "shabnam", "Tahoma",`,
  },
});

function MyApp({ Component, pageProps }) {
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // login form open state
  const [loginFormOpenState, setLoginFormOpenState] = useState(false);
  const handleSetLoginFormOpenState = (state) => {
    setLoginFormOpenState(state);
  };

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // authentication
  const cookies = parseCookies();
  const initAuthentiation = {
    state: cookies.isLogin,
    username: cookies.firstName,
    cookies, // khkhkh!
  };
  const [authentication, setAuthentication] = useState(initAuthentiation);
  const handleSetAuthentication = () => {
    const cookies = parseCookies();
    setAuthentication({
      state: cookies.isLogin,
      username: cookies.firstName,
      cookies, // khkhkh!
    });
  };

  const themeHook = useTheme();
  const isMobile = useMediaQuery(themeHook.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>گیم‌ گردی سایت معرفی اتاق فرار و تفریح</title>
      </Head>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid
            container
            justify="center"
            className={`main-grid ${isMobile ? "mobile" : ""}`}
          >
            <Grid item lg={8} md={10} xs={12}>
              <Top
                loginFormOpenState={loginFormOpenState}
                setLoginFormOpenState={(state) => {
                  handleSetLoginFormOpenState(state);
                }}
                isMobile={isMobile}
                authentication={authentication}
                setAuthentication={handleSetAuthentication}
              />
              <Component
                {...pageProps}
                setLoginFormOpenState={(state) => {
                  handleSetLoginFormOpenState(state);
                }}
                isMobile={isMobile}
                authentication={authentication}
              />
            </Grid>
            <Bottom isMobile={isMobile} />
          </Grid>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}
{
  /* <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="center">
        <Grid item lg={8} md={10} xs={12}>
          <Top isMobile={isMobile} />
          <Component {...pageProps} />
        </Grid>
        <Bottom isMobile={isMobile} />
      </Grid>
    </ThemeProvider> */
}

export default MyApp;
