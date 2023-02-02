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
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import { Grid } from "@material-ui/core";

const districtsField = (allDistricts, cityIds) => {
  let districts = [];
  cityIds.forEach((cityId) => {
    districts = [
      ...districts,
      ...allDistricts.filter((district) => district.city.id == cityId),
    ];
  });
  return districts;
};
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
// const fetchDependencies = async (setState) => {
const fetchDependencies = async (setFields) => {
  const cities = await fetcher(api.getAllCities);
  const districts = await fetcher(api.getAllDistricts);
  const types = await fetcher(api.getAllGameTypes);
  const genres = await fetcher(api.getAllGenres);
  const clubs = await fetcher(api.adminGetClubsList, "clubs");
  const gameStates = [{ id: 1, name: 'در حال اجرا' }, { id: 2, name: 'به‌زودی' }, { id: 3, name: 'متوقف شده' }, { id: 4, name: 'توقف موقت' }];

  const dependencies = {
    cities,
    districts,
    types,
    genres,
    clubs,
    gameStates,
  };
  setFields({
    ...dependencies,
    allDistricts: dependencies.districts,
    districts: districtsField(dependencies.districts, [
      dependencies.cities[0].id,
    ]),
  });
};



const Main = (props) => {
  console.log("render - SearchFilters");

  const router = useRouter();
  // const [dependencies, setDependencies] = useState({});

  // fields (data by which the form fields such as <option>s are rendered)
  const [fields, setFields] = useState({});

  const initFormData = {
    offset: Number,
    limit: Number,
    genres: Array,
    cities: Array,
    districts: Array,
    searchTerm: String,
    types: Array,
    gameStates: Array,
  };
  const [formData, setFormData] = useState(props.data);
  useEffect(async () => {
    setFormData(props.data);
  }, [props.data]);

  useEffect(async () => {
    fetchDependencies(setFields);
  }, []);

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // input change

  const handleInputChange = (e, key) => {
    const data = {};
    data[key] = e.target.value;
    setFormData({ ...formData, ...data });
  };

  const handleCheckboxChange = (e, key) => {
    const data = {};
    data[key] = e.target.checked;
    setFormData({ ...formData, ...data });
  };

  const handleNearbyClick = (e) => {
    // const checkboxValue = e.target.checked;
    if (!formData.searchNearByGames)
      locationPrompt((res) => {
        setFormData({ ...formData, ...res });
      });
    else {
      let updatedFormData = {};
      // remove 'lat' & 'lng':
      for (const prop in formData) {
        if (/* prop != "searchNearByGames" && */ prop != "lat" && prop != "lng")
          updatedFormData[prop] = formData[prop];
      }
      updatedFormData.searchNearByGames = false;
      setFormData(updatedFormData);
    }
  };
  // city change
  const handleCityChange = (e, key) => {
    const cityIds = e.target.value;


    // set districts field:
    const districts = districtsField(fields.allDistricts, cityIds);
    setFields({
      ...fields,
      districts,
    });

    // set formData
    const data = {};
    data.cities = cityIds;

    setFormData({ ...formData, ...data });
  };
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // submit
  const handleSearchSubmit = () => {
    // create quer string
    let queryString = "";
    for (const prop in formData) {
      switch (prop) {
        case "types":
        case "gameStates":
        case "genres":
        case "cities":
        case "districts":
          queryString += formData[prop]
            .map((item) => prop + "=" + item + "&")
            .join("");
          // .slice(0, -1);
          break;
        case "searchTerm":
        case "searchNearByGames":
        case "lat":
        case "lng":
          queryString += prop + "=" + formData[prop] + "&";
          break;
      }
    }
    router.push("/search/games?" + queryString);
  };

  return (
    <div className={`${style.main} ${!props.isMobile && style.desktop}`}>
      <div className={style.sec}>
        <TextField
          value={formData.searchTerm}
          onChange={(e) => {
            handleInputChange(e, "searchTerm");
          }}
          className={style.input}
          label="عبارت جستجو"
          variant="outlined"
          fullWidth
          style={{ background: "white" }}
        />
      </div>
      <div className={style.sec}>
        <FormControl
          fullWidth
          style={{ background: "white" }}
          className={style.input}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">شهر</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formData.cities}
            onChange={(e) => {
              handleCityChange(e, "cityId");
            }}
            label="شهر"
          >
            {fields.cities &&
              fields.cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.sec}>
        {" "}
        <FormControl
          fullWidth
          style={{ background: "white" }}
          className={style.input}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">محدوده</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formData.districts}
            onChange={(e) => {
              handleInputChange(e, "districts");
            }}
            label="محدوده"
          >
            {fields.districts &&
              fields.districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.sec}>
        <FormControl
          fullWidth
          style={{ background: "white" }}
          className={style.input}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">ژانر</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formData.genres}
            onChange={(e) => {
              handleInputChange(e, "genres");
            }}
            label="ژانر"
          >
            {fields.genres &&
              fields.genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className={style.sec}>
        <FormControl
          fullWidth
          style={{ background: "white" }}
          className={style.input}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">نوع بازی</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formData.types}
            onChange={(e) => {
              handleInputChange(e, "types");
            }}
            label="نوع بازی"
          >
            {fields.types &&
              fields.types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>


      <div className={style.sec}>
        <FormControl
          fullWidth
          style={{ background: "white" }}
          className={style.input}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-outlined-label">وضعیت بازی</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formData.gameStates}
            onChange={(e) => {
              handleInputChange(e, "gameStates");
            }}
            label="نوع بازی"
          >
            {fields.gameStates &&
              fields.gameStates.map((gameState) => (
                <MenuItem key={gameState.id} value={gameState.id}>
                  {gameState.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className={style.sec}>


        <div className={style.checkboxWrap}>
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.searchNearByGames}
                  /* onChange={(e) => {
                    handleNearbyChange(e, "nearby");
                  }} */
                  onClick={(e) => {
                    handleNearbyClick(e);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="اطراف من"
            />
            <Button href="/search/games" color="secondary" size="large" variant="text" ><DeleteTwoTone>
            </DeleteTwoTone></Button>
          </Grid>
        </div>

      </div>
      <div className={style.sec}>
        <Button
          fullWidth
          onClick={handleSearchSubmit}
          variant="contained"
          color="primary"
        >
          جستجو
        </Button>



      </div>
    </div>
  );
};
export default Main;
