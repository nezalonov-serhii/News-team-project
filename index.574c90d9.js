(async function(e){return(await fetch(`https://api.openweathermap.org/data/2.5/weather??units=metric&q=${e}&appid=adbfcea561ee5005b6167772340c12ff`)).json()})("London").then((e=>console.log(e)));document.querySelector("body");
//# sourceMappingURL=index.574c90d9.js.map
