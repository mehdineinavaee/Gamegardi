import Admin from "../../components/admin/Index.js";
import UsersList from "../../components/admin/UsersList";

const Main = (props) => {
  return (
    <Admin authentication={props.authentication} childrenName="users">
      <UsersList
        isMobile={props.isMobile}
        authentication={props.authentication}
      />      
    </Admin>
  );
};
export default Main;
