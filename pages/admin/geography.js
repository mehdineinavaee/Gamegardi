import style from "../../styles/search/SearchFilters.module.css";
import { useState, useEffect } from "react";
import api from "../../api";
import { useRouter } from "next/router";
import { locationPrompt } from "../../assets/tools";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Admin from "../../components/admin/Index.js";
import GamesList from "../../components/admin/GamesList";
import { Grid } from "@material-ui/core";

const fetcher = async (url, resultKey) => {
    let result;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        // body: JSON.stringify(body),
    });
    if (response.ok) {
        result = await response.json();
    } else console.log("HTTP-Error: " + response.status);

    let finalResult;
    switch (resultKey) {
        case "clubs":
            finalResult = result.clubs;
            break;
        default:
            finalResult = result.result;
    }
    return finalResult;
};
const fetcherPost = async (url, body) => {
    let result;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
    });
    if (response.ok) {
        result = await response.json();
    } else console.log("HTTP-Error: " + response.status);
    return result;
};
let districtName;
let cityId;
let genreName;
let cityName;
let cityNameEn;
const Main = (props) => {

    const [cities, setCities] = useState([]);

    useEffect(async () => {
        const cts = await fetcher(api.getAllCities);
        setCities(cts);
    }, []);


    const [city, setCity] = useState('');


    const handleChangeCitySelect = (event) => {
        setCity(event.target.value);
        cityId = event.target.value;
    };

    const handleInputChange = (e, key) => {
        switch (key) {
            case "districtName":
                districtName = e.target.value;
                break;
            case "genreName":
                genreName = e.target.value;
                break;
            case "cityName":
                cityName = e.target.value;
                break;
            case "cityNameEn":
                cityNameEn = e.target.value;
                break;
            default:
                break;
        }
    }


    const handleDistrictSubmit = async () => {
        if (typeof cityId == 'undefined' || typeof districtName == 'undefined' || cityId == '' || districtName == '') alert("اطلاعات را درست وارد کنید.")
        else {
            let res = await fetcherPost(api.addDistricts,
                {
                    "dists": [
                        { "name": districtName, "city_id": cityId }
                    ]
                })
            if (res.status)
                alert('با موفقیت ثبت شد.')
            else
                alert('500');
        }
    }
    const handleGenreSubmit = async () => {
        if (typeof genreName == 'undefined' || genreName == '') alert("اطلاعات را درست وارد کنید.")
        else {
            let res = await fetcherPost(api.addGenre,
                { name: genreName }
            )

            if (res.status)
                alert('با موفقیت ثبت شد.')
            else
                alert('500');
        }
    }

    const handleCityNameSubmit = async () => {
        if (typeof cityName == 'undefined' || typeof cityNameEn == 'undefined' || cityName == '' || cityNameEn == '') alert("اطلاعات را درست وارد کنید.")
        else {
            let res = await fetcherPost(api.addCity,
                {
                    name: cityName,
                    nameEn: cityNameEn
                }
            )

            if (res.status)
                alert('با موفقیت ثبت شد.')
            else
                alert('500');
        }
    }

    return (
        <Admin authentication={props.authentication} childrenName="games">
            {props.authentication.cookies.id == 1 &&
                <>
                    <Grid lg={6} md={6} xs={12}
                        style={{ margin: "1% 0px" }}
                    >
                        <TextField
                            onChange={(e) => {
                                handleInputChange(e, "cityName");
                            }}
                            className={style.input}
                            label="شهر"
                            variant="outlined"
                            fullWidth
                            style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
                        />
                        <TextField
                            onChange={(e) => {
                                handleInputChange(e, "cityNameEn");
                            }}
                            className={style.input}
                            label="city"
                            variant="outlined"
                            fullWidth
                            style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
                        />
                        <Button

                            style={{ width: "20%", height: "auto", "vertical-align": "bottom", float: "left" }}
                            fullWidth
                            onClick={handleCityNameSubmit}
                            variant="contained"
                            color="primary"
                        >
                            افزودن
                        </Button>
                    </Grid>

                    <Grid lg={6} md={6} xs={12}
                        style={{ margin: "1% 0px" }}
                    >
                        <TextField
                            onChange={(e) => {
                                handleInputChange(e, "genreName");
                            }}
                            className={style.input}
                            label="ژانر"
                            variant="outlined"
                            fullWidth
                            style={{ background: "white", width: "66%", padding: "0 0 0 10px" }}
                        />
                        <Button

                            style={{ width: "20%", height: "auto", "vertical-align": "bottom", float: "left" }}
                            fullWidth
                            onClick={handleGenreSubmit}
                            variant="contained"
                            color="primary"
                        >
                            افزودن
                        </Button>
                    </Grid>

                    <Grid lg={6} md={6} xs={12}>
                        <FormControl
                            fullWidth
                            style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
                            className={style.input}
                            variant="outlined"
                        >
                            <InputLabel id="demo-simple-select-label">شهر</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="شهر"
                                onChange={handleChangeCitySelect}
                            >
                                {cities &&
                                    cities.map((city) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <TextField
                            onChange={(e) => {
                                handleInputChange(e, "districtName");
                            }}
                            className={style.input}
                            label="منطقه"
                            variant="outlined"
                            fullWidth
                            style={{ background: "white", width: "33%", padding: "0 0 0 10px" }}
                        />
                        <Button

                            style={{ width: "20%", height: "auto", "vertical-align": "bottom", float: "left" }}
                            fullWidth
                            onClick={handleDistrictSubmit}
                            variant="contained"
                            color="primary"
                        >
                            افزودن
                        </Button>
                    </Grid>
                </>
            }
        </Admin>
    );
};
export default Main;
