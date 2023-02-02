import Admin from "../../components/admin/Index.js";
import UploadSliderImage from "../../components/admin/UploadSliderImage";
import { useState, useEffect } from "react";
import api from "../../api.js";
import { Height } from "@material-ui/icons";

const Main = (props) => {

    const fetchSliderList = async (url) => {
        let result;
        let response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            // body: JSON.stringify(body),
        });
        if (response.ok) {
            result = await response.json();
            setBannersListData(result.result);
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    };

    const [bannersListData, setBannersListData] = useState([]);
    useEffect(async () => {
        fetchSliderList(api.getSlider);
    }, []);

    return (
        <Admin authentication={props.authentication} childrenName="slider">
            {props.authentication.cookies.id == 1 && bannersListData &&
                bannersListData.map((slider) =>
                    <>
                        <UploadSliderImage
                            sliderId={slider.id}
                            contentFilePath={slider.contentFilePath}
                            isEnabled={slider.isEnabled}
                            title={slider.title}
                            link={slider.link}
                        /> <hr style={{ marginBottom: 50 }} /> </>)}

            {props.authentication.cookies.id == 1 && <div> <b> اسلایدر جدید</b>
                <UploadSliderImage isEnabled={true}
                    sliderId={0}
                /></div>}
        </Admin>
    );
};
export default Main;
