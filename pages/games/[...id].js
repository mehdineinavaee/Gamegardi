import { useRouter } from "next/router";
import useSWR from "swr";
import api from "../../api.js";
import GameMobile from "../../components/GameMobile";
// import GameDesktop from "../../components/GameDesktop";

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
  const { id, qrcode } = router.query;

  const { data, error } = useSWR(
    // () => id && `/api/parks/${id}`,
    id && `${api.getGame}?gameId=${id[0]}`,
    fetcher
  );
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // if (isMobile) return <GameMobile data={data.result} isMobile={props.isMobile} />;
  // else return <GameDesktop data={data.result} isMobile={props.isMobile} />;
  return (
    <GameMobile
      setLoginFormOpenState={(state) => {
        props.setLoginFormOpenState(state);
      }}
      authentication={props.authentication}
      data={data.result}
      isMobile={props.isMobile}
      qrCode={qrcode}
    />
  );
};
export default Main;
