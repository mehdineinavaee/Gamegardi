import Admin from "../../components/admin/Index.js";
import GamesList from "../../components/admin/GamesList";

const Main = (props) => {
  return (
    <Admin authentication={props.authentication} childrenName="games">
      <GamesList
        isMobile={props.isMobile}
        authentication={props.authentication}
      />
    </Admin>
  );
};
export default Main;
