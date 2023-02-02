import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM3N2M0YjNlMzVkZTMyZWJhNTJiZmYzMjE3NzM5NDQxZGNlNjc3YTU3NTVkZWVhZmQ5ZDI4YzJkNjRmZDJlMzQyYzNlZTJmMzEzZDgxYWJlIn0.eyJhdWQiOiIxNTUxNiIsImp0aSI6ImM3N2M0YjNlMzVkZTMyZWJhNTJiZmYzMjE3NzM5NDQxZGNlNjc3YTU3NTVkZWVhZmQ5ZDI4YzJkNjRmZDJlMzQyYzNlZTJmMzEzZDgxYWJlIiwiaWF0IjoxNjMxOTU4ODU0LCJuYmYiOjE2MzE5NTg4NTQsImV4cCI6MTYzNDY0MDg1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.M3Z8gRhk0ETprnyzOp7iPs6puNpjQwhtSVfBigTUx7SRunQhTClW5biZY1-ADP9dtDWGWkaR4ZqGwnWI6Zpg_NIfne4OPXQ1m3CcDsFt1l7f-eSXXZkTDlT4-xKNGUEcE-CPlhCSWMniMWlR1bIDnCeyL2bvpjRqLCLhsQHbzvYVvNFnqOnCxBNJYDwwUUXWzDp6rIAaa5dNJjxt7E4tRoKmB53VF5vC-jjeqOqKxtq6UXQkMA_fPF1W5u4XwSjxBnmjy4DOjM8TrhpaqYE-aAZdeK-cYDsdUeCMMXdoF8wkVaL59YH07uWaSF7PWGWaZtdT7b73T0Ol1ZEpGnz9mw", //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

const Main = (props) => {
  return (
    <Mapir
      Map={Map}
      center={[props.lng, props.lat]}
      // style={{width:'100px', height: '100px'}}
      width="100%"
      height="150px"
      Map={Map}
    >
      <Mapir.Marker coordinates={[props.lng, props.lat]} anchor="bottom" />
    </Mapir>
  );
};

export default Main;
