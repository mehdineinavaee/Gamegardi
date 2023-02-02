export const digitsComma = (num) => {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const locationPrompt = (callback) => {
  if (!navigator.geolocation) {
    alert("مرورگر شما این قابلیت را ندارد");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const searchNearByGames = true;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const res = {
        searchNearByGames,
        lat,
        lng,
      };
      callback(res);
    }
    function error() {
      alert("دسترسی به موقعیت مکانی را در مرورگر فعال کنید");
    }
  }
};
