// import { currentTime, dayOrNight } from "./javascript/time";

// currentTime();
// dayOrNight();

const midScreenApps = [
    {
        image: "./images/gmail.png",
        title: "Gmail",
        background: "./images/gmail-background.jpg",
    },
    {
        image: "./images/googledrive.png",
        title: "Drive",
        background: "./images/drive-background.jpg",
    },
    {
        image: "./images/linkedin.png",
        title: "LinkedIn",
        background: "./images/linedin-background.jpg",
    },
    {
        image: "./images/youtube.png",
        title: "YouTube",
        background: "./images/youtube-background.jpg",
    },
    {
        image: "./images/slack.png",
        title: "Slack",
        background: "./images/slack-background.jpg",
    },
];

const lowerScreenApps = [
    {
        image: "./images/phone.png",
        title: "Phone",
        background: "./images/phone-background.jpg",
    },
    {
        image: "./images/chrome.png",
        title: "Chrome",
        background: "./images/chrome-background.jpg",
    },
    {
        image: "./images/sms1.png",
        title: "Sms",
        background: "./images/sms-background.jpg",
    },
    {
        image: "./images/gallery.png",
        title: "Gallery",
        background: "./images/gallery-background.jpg",
    },
    { image: "./images/menu.png", title: "Menu" },
];

//create apps on middle screen

const midScreen = document.querySelector(".mid-screen");

const iconsElement = midScreenApps.map((icon) => {
    const divElement = document.createElement("div");
    divElement.className = "icon-container";
    divElement.setAttribute("data-icon", `${icon.background}`);

    const imageElement = document.createElement("img");
    imageElement.src = `${icon.image}`;
    imageElement.alt = `${icon.title}`;
    imageElement.className = "icon-container icon-container__icon";

    const altName = imageElement.alt;

    if (altName === "Gmail" || altName === "YouTube" || altName === "Slack") {
        imageElement.classList.add("icon-container__icon--white-background");
    }

    const pElement = document.createElement("p");
    pElement.className = "icon-container icon-container__text";
    pElement.textContent = icon.title;

    divElement.appendChild(imageElement);
    divElement.appendChild(pElement);

    return divElement;
});

midScreen.append(...iconsElement);

//create main apps on lower screen

const lowerScreen = document.querySelector(".lower-screen");

const mainIcons = lowerScreenApps.map((icon) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("data-icon", `${icon.background}`);
    divElement.className =
        icon.title === "Menu" ? "menu skip" : "icon-container";

    const imageElement = document.createElement("img");
    imageElement.src = `${icon.image}`;
    imageElement.alt = `${icon.title}`;
    imageElement.className =
        icon.title === "Menu"
            ? "menu menu__icon skip"
            : "icon-container icon-container__icon";

    if (imageElement.alt === "Chrome")
        imageElement.classList.add("icon-container__icon--white-background");

    divElement.appendChild(imageElement);

    return divElement;
});

lowerScreen.append(...mainIcons);

//func that adds pulse animation to the button when clicked

const homeBtnContainer = document.getElementsByClassName("button-bar")[0];

const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", () => {
    homeBtn.style.animation = "pulse 1s ease-in-out";
    setTimeout(() => (homeBtn.style.animation = "none"), 1000);
});

//create fake module when the app is clicked

function createFakeModule(icon) {
    const phoneBackground = document.querySelector(".phone-frame");
    const moduleContainer = document.createElement("div");
    const childOne = document.createElement("div");
    const childTwo = document.createElement("div");
    const childOneImg = document.createElement("img");
    const childTwoImg = document.createElement("img");

    childOne.className = "module-container__divOne";
    childOneImg.className = "module-container__divOne--img";
    childOneImg.src = "./images/close.png";

    childTwo.className = "module-container__divTwo";
    childTwoImg.className = "module-container__divTwo--img";
    childTwoImg.src = icon;

    moduleContainer.className = "module-container";

    homeBtn.classList.add("home-button--black-border");
    phoneBackground.classList.add("phone-frame--white-background");

    childOne.addEventListener("click", () => {
        moduleContainer.remove();

        homeBtn.classList.remove("home-button--black-border");
        phoneBackground.classList.remove("phone-frame--white-background");
    });

    childOne.appendChild(childOneImg);
    childTwo.appendChild(childTwoImg);

    moduleContainer.appendChild(childOne);
    moduleContainer.appendChild(childTwo);

    document.querySelector(".phone-frame").appendChild(moduleContainer);
}

// func that opens fake app when clicked

const iconContainers = document.querySelectorAll("[data-icon]:not(.skip)");

for (let i = 0; i < iconContainers.length; i++) {
    iconContainers[i].addEventListener("click", () => {
        createFakeModule(iconContainers[i].dataset.icon);
    });
}

//opens menu icon with all the apps

const openMenu = () => {
    const parent = document.querySelector(".phone-frame");
    parent.style.backgroundImage = "url(./images/background-photo-blurred.jpg)";

    const menu = document.createElement("div");
    menu.className = "menu-container";
    menu.id = "menu-container";

    menu.append(...iconsElement);

    parent.appendChild(menu);
    document.querySelector(".upper-screen").style.display = "none";
    document.querySelector(".mid-screen").style.display = "none";
    document.querySelector(".lower-screen").style.display = "none";
};

document.querySelector(".menu").addEventListener("click", () => {
    openMenu();
});

//close Menu app

const closeMenu = () => {
    const parent = document.querySelector(".phone-frame");
    const menu = document.querySelector("#menu-container");
    parent.removeChild(menu);
    midScreen.append(...iconsElement);
    document.querySelector(".mid-screen").style.display = "grid";
    document.querySelector(".upper-screen").style.display = "flex";
    document.querySelector(".lower-screen").style.display = "grid";
    console.log(parent.classList);
    parent.style.backgroundImage = "url(./images/background-photo.jpg)";
};

//home button func that closes the opened fake module

const closeAllModules = () => {
    const parent = document.querySelector(".phone-frame");
    const menu = document.querySelector("#menu-container");
    const topbar = document.querySelector(".top-bar");
    parent.classList.remove("phone-frame--white-background");

    topbar.style.backgroundColor = "transparent";

    if (menu) {
        closeMenu();
    }

    const openModules = document.querySelectorAll(".module-container");
    openModules.forEach((module) => {
        parent.removeChild(module);
        homeBtnContainer.classList.remove("button-bar--wht-background");
        homeBtn.classList.remove("home-button--black-border");
    });
};

const closeButton = document.getElementById("homeBtn");
closeButton.addEventListener("click", closeAllModules);

//func that gets the current time

const currentTime = () => {
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

currentTime();

//func that checks is it a day or night and change the icon accordingly

const dayOrNight = (hours) => {
    const currentHour = currentTime();
    const dayNightImg = document.querySelector(".upper-screen__weather");

    currentHour >= 20 || currentHour < 05
        ? (dayNightImg.src = "./images/nighttime.png")
        : (dayNightImg.src = "./images/daytime.png");
};

dayOrNight();
