import { useState } from "react";
import Button from "@material-ui/core/Button";
import api from "../../api";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";

import style from "../../styles/admin/GameForm.module.css";

const fetchUploadImage = async (url, data, key) => {
    let result;

    const formData = new FormData();
    formData.append(key, data);

    let response = await fetch(url, {
        method: "POST",
        credentials: "include",
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
    // Checkbox state
    const [checked, setChecked] = useState(props.isEnabled);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

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
            api.setSlider + '?link=' + link + '&sliderId=' + props.sliderId + '&title=' + title + '&isEnabled=' + checked,
            bannerImageFile,
            "contentFile"
        );
        if (res.status) { alert('با موفقیت آپدیت شد.'); location.reload(); }
    };

    const handleDeleteSubmit = async () => {
        if (confirm("از حذف کردن اسلایدر اطمینان دارید ؟"));
        {
            let result;
            let response = await fetch(api.deleteSlider, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ sliderId: props.sliderId }),

            });
            if (response.ok) {
                result = await response.json();
                alert("با موفقیت حذف شد.");
                location.reload();
            } else alert("HTTP-Error: " + response.status);
        }
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
    //handle dialog
    const [open, setOpen] = useState(false);

    const handleOpenDialog = async () => {
        setOpen(true);
    }
    const handleCloseDialog = async () => {
        setOpen(false);
    }
    //////////////////////////////////////////////////////////////////

    return (
        <div >
            <input onChange={handleBannerImageInputChange} type="file" />
            <TextField
                onChange={(e) => {
                    handleInputChange(e, "link");
                }}
                className={style.input}
                placeholder={props.link}
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
                placeholder={props.title}
                label="title"
                variant="outlined"
                size="small"
                fullWidth
                style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
            />
            <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={handleFormSubmit} variant="contained" color="primary" style={{ marginBottom: 30 }}>
                ذخیره
            </Button>
            <Button onClick={handleDeleteSubmit} variant="contained" color="primary" style={{ right: 5, marginBottom: 30 }}>
                حذف
            </Button>
            {/* <a href={props.contentFilePath} target="_blank"> */}
            {props.contentFilePath &&
                <>
                    <img onClick={handleOpenDialog} src={props.contentFilePath} style={{ width: "55px", height: "55px", marginRight: 200, alignContent: "center", cursor: 'pointer' }} />
                    <Dialog
                        open={open}
                        onClose={handleCloseDialog}
                    >
                        <img src={props.contentFilePath} />
                    </Dialog>
                </>
            }
            {/* </a> */}
        </div>
    );
};
export default Main;
