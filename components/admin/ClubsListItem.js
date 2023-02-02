import { useState, useEffect } from "react";
import style from "../../styles/admin/ClubsListItem.module.css";
import api from "../../api";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FaceIcon from "@material-ui/icons/Face";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AdminForm from "./AddAdminForm";

/* const fetchGames = (url) => fetch(url).then((res) => res.json());
const { data: fetchData, error } = useSWR(api.getAdminGames, fetchGames);
let render
if (error) render = "Error";
if (!data) render = "بارگیری بازی‌ها...";
if (data) {
  setData(fetchData.games);
  render = data.map((game) => <GamesListItem key={game.id} data={game} />);
}
return render; */

const fetchGamesList = async (url, setState) => {
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
  } else {
    console.log("HTTP-Error: " + response.status);
  }
  setState(result.clubs);
};
const fetchDeleteClub = async (url, body) => {
  let result;
  let response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    result = await response.json();
  } else {
    console.log("HTTP-Error: " + response.status);
  }
  return result;
};

const Main = (props) => {
  console.log("render - Admin ClubsListItem");

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // delete club
  const handleDeleteClub = async (body) => {
    const del = await fetchDeleteClub(
      api.deleteClub, body
    );

  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const handleDialogClose = () => {
    setDialogOpenState(false);
  };
  const handleDialogOpen = () => {
    setDialogOpenState(true);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // admin form
  const [admins, setAdmins] = useState(props.data.admins);
  const [adminFormDialogOpenState, setAdminFormDialogOpenState] =
    useState(false);
  const handleAdminFormDialogClose = () => {
    setAdminFormDialogOpenState(false);
  };
  const [adminFormInitData, setAdminFormInitData] = useState({});
  const [adminFormMode, setAdminFormMode] = useState("add");
  const handleAddAdminClick = () => {
    const initData = {
      clubId: props.data.id,
      firstName: "",
      lastName: "",
      phoneNum: "09123169658",
    };
    setAdminFormMode("add");
    setAdminFormInitData(initData);
    setAdminFormDialogOpenState(true);
  };
  const handleAdminFormSubmit = (admin) => {
    if (adminFormMode == "add") {
      setAdmins([admin, ...admins]);
    } else {
    }
    setAdminFormDialogOpenState(false);
  };

  return (
    <>
      <div className={style.main} >
        <div className={style.col1}>
          <div className={style.name} onClick={handleDialogOpen}>{props.data.name}</div>
          <div className={style.phone}>{props.data.city.name}</div>
        </div>
        <EditIcon
          className={style.editIcon}
          onClick={props.onEditButtonClick}
        />
        <DeleteForever
          onClick={() => {
            if (confirm("آیا از پاک کردن مجموعه مطمئن هستید؟")) {
              handleDeleteClub({ clubId: props.data.id });
              location.reload();
            }
          }}
        />
      </div>
      <Dialog
        open={dialogOpenState}
        onClose={handleDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <div className={style.info}>
            <div className={style.admins}>
              <div className={style.headerA1}>
                {/* <div className={style.title}>لیست ادمین‌ها</div> */}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddAdminClick}
                >
                  افزودن ادمین
                </Button>
              </div>
              <div className={style.list}>
                {/* {props.data.admins.map((admin) => ( */}
                {admins.map((admin, i) => {
                  return (
                    <div key={i} className={style.item}>
                      <div className={style.sec}>
                        <FaceIcon />
                        <div className={style.name}>{admin.fullName}</div>
                      </div>
                      <div className={style.phone}>{admin.phoneNum}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={adminFormDialogOpenState}
        // onClose={handleAdminFormDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <AdminForm
            initData={adminFormInitData}
            submit={(admin) => {
              handleAdminFormSubmit(admin);
            }}
            close={handleAdminFormDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Main;
