import { useRouter } from "next/router";

// components
import Games from "../../components/search/Games";
const component = (componentName, requestUrl, props) => {
  switch (componentName) {
    case "games":
      return <Games requestUrl={requestUrl} isMobile={props.isMobile} />;
      break;
    default:
      return "loading...";
  }
};


const Main = (props) => {
  console.log("render - pages/search");
  const router = useRouter();
  const componentName = router.query.component;
  const requestUrl = decodeURI(router.asPath.split("?")[1]);

  return component(componentName, requestUrl, props);
};
export default Main;
