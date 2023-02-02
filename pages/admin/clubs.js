import Admin from "../../components/admin/Index.js";
import ClubsList from "../../components/admin/ClubsList";
const Main = (props) => {
  return (
    <Admin authentication={props.authentication} childrenName="clubs">
      <ClubsList />
    </Admin>
  );
};
export default Main;
