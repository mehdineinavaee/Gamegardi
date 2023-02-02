import { useRouter } from "next/router";
import useSWR from "swr";
import api from "../../api.js";
import UserProfile from "../../components/UserProfile";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Main = (props) => {
  const router = useRouter();
  // const { id, qrcode } = router.query;
  const { id } = router.query;

  const { data, error } = useSWR(
    // () => id && `/api/parks/${id}`,
    id && `${api.getUserProfileInfo}?userId=${id[0]}`,
    // id && `${api.getUserProfileInfo}`,
    fetcher
  );
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // if (isMobile) return <GameMobile data={data.result} isMobile={props.isMobile} />;
  // else return <GameDesktop data={data.result} isMobile={props.isMobile} />;
  return (
    <UserProfile
      data={{ ...data.user, userId: id[0] }}
      /* setLoginFormOpenState={(state) => {
        props.setLoginFormOpenState(state);
      }} */
      authentication={props.authentication}
      isMobile={props.isMobile}
      // qrCode={qrcode}
    />
  );
};
export default Main;
