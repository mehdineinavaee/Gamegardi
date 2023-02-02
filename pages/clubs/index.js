import api from "../../api.js";
import useSWR from "swr";
import ClubsList from "../../components/ClubsListA1";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Main = (props) => {
  const { data, error } = useSWR(api.getAllClubs, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  const handleNextClick = (e) => {
    alert();
  };

  return <ClubsList data={data.result} cols={3} isMobile={props.isMobile} />;
};

export default Main;
