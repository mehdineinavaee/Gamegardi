import style from "../../styles/admin/GamesList.module.css";
import GamesListItem from "./GamesListItem_BACKUP1";

// theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    type: "dark",
  },
  typography: {
    "fontFamily": `"escapeRoom", "shabnam", "Tahoma",`
  },
});

const Main = ({ data: mainData }) => {  
  console.log("Render - Admin Games List");

  return (
    <ThemeProvider theme={theme}>
      <div className={style.main}>
        {mainData.map((game) => (          
          <GamesListItem key={game.id} data={game} />
        ))}
      </div>
    </ThemeProvider>
  );
};
export default Main;
