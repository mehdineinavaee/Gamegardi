import Admin from "../../components/admin/Index.js";
import UploadBannerImage from "../../components/admin/UploadBannerImage";

const Main = (props) => {

    const elementCount = [1, 2, 3, 4, 5];
    return (
        <Admin authentication={props.authentication} childrenName="banner">
            {props.authentication.cookies.id == 1 && elementCount.map((id) => <div> بنر {id} <UploadBannerImage bannerId={id} /> </div>)}
        </Admin>
    );
};
export default Main;
