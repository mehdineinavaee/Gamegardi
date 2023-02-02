import { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";
import TextField from "@material-ui/core/TextField";

import style from "../../styles/admin/GameForm.module.css";

const fetchUploadImage = async (url, data, key, link) => {
    let result;

    let formData = new FormData();
    formData.append("link", link);
    formData.append(key, data);
    let response = await fetch(url, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json;charset=utf-8",
        // },
        // body: JSON.stringify(formData),
        body: formData,
    });
    if (response.ok) {
        result = await response.json();
    } else alert("HTTP-Error: " + response.status);
    return result;
};

let link;
let title;
const Main = (props) => {
    console.log("render - bannerImageForm");

    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------
    // Banner image state
    const [bannerImageFile, setBannerImageFile] = useState("");
    const handleBannerImageInputChange = (e) => {
        setBannerImageFile(e.target.files[0]);
    };

    const handleFormSubmit = async () => {
        let res = await fetchUploadImage(
            api.setBanner + '?bannerId=' + props.bannerId + '&title=' + title,
            bannerImageFile,
            "banner",
            link
        );
        if(res.status) alert('با موفقیت آپدیت شد.');
    };
    // handle input change ............................ //
    const handleInputChange = (e, key) => {
        switch (key) {
            case "link":
                link = e.target.value;
                break;
            case "title":
                title = e.target.value;
                break;
            default:
                break;
        }
    }
    ///////////////////////////////////////////////////////////////////

    return (
        <div >
            <input onChange={handleBannerImageInputChange} type="file" />
            <TextField
                onChange={(e) => {
                    handleInputChange(e, "link");
                }}
                className={style.input}
                label="link"
                variant="outlined"
                size="small"
                fullWidth
                style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
            />
            <TextField
                onChange={(e) => {
                    handleInputChange(e, "title");
                }}
                className={style.input}
                label="title"
                variant="outlined"
                size="small"
                fullWidth
                style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
            />
            <Button onClick={handleFormSubmit} variant="contained" color="primary">
                ذخیره
            </Button>
        </div>
    );
};
export default Main;
