const startbtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchicon = document.querySelector("#searchicon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityname = document.querySelector("#city");
const wind = document.querySelector("#windspeed");
const humidity = document.querySelector("#humidityper");
const gohome = document.querySelector(".homebtn");
const icon = document.querySelector("#icon");
const mainbox1 = document.querySelector(".mainbox1");
const mainbox2 = document.querySelector(".mainbox2");
const mainbox3 = document.querySelector(".mainbox3");

startbtn.addEventListener("click", () => {
  mainbox1.classList.add("inactive");
  mainbox2.classList.remove("inactive");
  mainbox3.classList.add("inactive");
});

function changeicon(weatherMain) {
  const weatherIcons = {
    Clouds: "/images/clouds.png",
    Rain: "/images/rain.png",
    Mist: "/images/mist.png",
    Haze: "/images/haze.png",
    Snow: "/images/snow.png",
    Clear: "/images/clear.png"
  };

  icon.src = weatherIcons[weatherMain] || "/images/clear.png";
}


const url="https://api.openweathermap.org/data/2.5/weather?";
const apikey="41847ea85df2e3be8daee23caadb551b";
async function getweatherdata(city) {
    let finalurl=`${url}q=${city}&appid=${apikey}`;
    let weatherdata= await fetch(finalurl).then(res=>res.json());
    console.log(weatherdata);

if (weatherdata.cod == 404) {
  mainbox2.classList.add("inactive");
  mainbox3.classList.remove("inactive");
  desc.innerHTML = "description";
  temp.innerHTML = "0°c";
  cityname.innerHTML = "new york";
  wind.innerHTML = "0km/h";
  humidity.innerHTML = "0%";
  search.value = "";
  icon.src = "/images/clear.png";
  return;
}
    desc.innerHTML=weatherdata.weather[0].description;
    temp.innerHTML=Math.round(weatherdata.main.temp-273.15)+"°c";
    cityname.innerHTML=weatherdata.name;
    wind.innerHTML=weatherdata.wind.speed+"km/h";
    humidity.innerHTML=weatherdata.main.humidity+"%";

    changeicon(weatherdata.weather[0].main);
}
searchicon.addEventListener("click", () => {
  getweatherdata(search.value);
});

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getweatherdata(search.value);
  }
});

gohome.addEventListener("click", () => {
  mainbox3.classList.add("inactive");
  mainbox2.classList.add("inactive");
  mainbox1.classList.remove("inactive");
});