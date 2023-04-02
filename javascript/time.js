export const currentTime = () => {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let time = h + ":" + m;
    document.getElementById("time").innerHTML = time;
    setTimeout(currentTime, 100);
    return h;
};

export const dayOrNight = (hours) => {
    const currentHour = currentTime();
    const dayNightImg = document.querySelector(".upper-screen__weather");

    currentHour > 20 && currentHour < 05
        ? (dayNightImg.src = "./images/nighttime.png")
        : (dayNightImg.src = "./images/daytime.png");
};
