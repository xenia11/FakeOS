const midScreenApps = [
    { image: "./images/gmail.png", title: "Gmail" },
    { image: "./images/googledrive.png", title: "Drive" },
    { image: "./images/linkedin.png", title: "LinkedIn" },
    { image: "./images/youtube.png", title: "YouTube" },
    { image: "./images/slack.png", title: "Slack" },
];

const lowerScreenApps = [
    { image: "./images/phone.png", title: "Phone" },
    { image: "./images/chrome.png", title: "Chrome" },
    { image: "./images/sms1.png", title: "Sms" },
    { image: "./images/gallery.png", title: "Gallery" },
    { image: "./images/menu.png", title: "Menu" },
];

const midScreen = document.querySelector(".mid-screen");

const iconsElement = midScreenApps.map((icon) => {
    const divElement = document.createElement("div");
    divElement.className = "icon-container";
    divElement.onclick = `createFakeModule()`;
    divElement.setAttribute("data-icon", `${icon.title}`);

    const imageElement = document.createElement("img");
    imageElement.src = `${icon.image}`;
    imageElement.alt = `${icon.title}`;
    imageElement.className = "icon-container icon-container__icon";

    const pElement = document.createElement("p");
    pElement.className = "icon-container icon-container__text";
    pElement.textContent = icon.title;

    divElement.appendChild(imageElement);
    divElement.appendChild(pElement);

    return divElement;
});

midScreen.append(...iconsElement);

const lowerScreen = document.querySelector(".lower-screen");

const mainIcons = lowerScreenApps.map((icon) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("data-icon", `${icon.title}`);
    divElement.className = icon.title === "Menu" ? "menu" : "icon-container";
    divElement.onclick =
        icon.title === "Menu"
            ? "openMenu()"
            : `createFakeModule(${icon.title})`;

    const imageElement = document.createElement("img");
    imageElement.src = `${icon.image}`;
    imageElement.alt = `${icon.title}`;
    imageElement.className =
        icon.title === "Menu"
            ? "menu menu__icon"
            : "icon-container icon-container__icon";

    divElement.appendChild(imageElement);

    return divElement;
});

lowerScreen.append(...mainIcons);

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
};
currentTime();

const homeBtnContainer = document.getElementsByClassName("button-bar")[0];
console.log(homeBtnContainer);
const homeBtn = document.getElementById("homeBtn");
console.log(homeBtn);

function createFakeModule(icon) {
    const moduleContainer = document.createElement("div");
    const moduleHeader = document.createElement("h2");
    const moduleText = document.createElement("p");
    const moduleCloseBtn = document.createElement("button");

    moduleContainer.className = "module-container";
    moduleHeader.textContent = icon;
    moduleText.textContent = `You've just opened ${icon}`;
    moduleCloseBtn.textContent = "Close";
    homeBtnContainer.classList.add("button-bar--wht-background");
    homeBtn.classList.add("home-button--black-border");

    moduleCloseBtn.addEventListener("click", () => {
        moduleContainer.remove();
        homeBtnContainer.classList.remove("button-bar--wht-background");
        homeBtn.classList.remove("home-button--black-border");
    });

    moduleContainer.appendChild(moduleHeader);
    moduleContainer.appendChild(moduleText);
    moduleContainer.appendChild(moduleCloseBtn);

    document.querySelector(".phone-frame").appendChild(moduleContainer);
}

// open app when clicked

const iconContainers = document.querySelectorAll(".icon-container");

iconContainers.forEach((icon) => {
    icon.addEventListener("click", () => {
        const iconData = icon.dataset.icon;
        console.log(iconData);
        createFakeModule(iconData);
    });
});

//opens menu icon with all the apps

const openMenu = () => {
    const menu = document.createElement("div");
    menu.className = "menu-container";
    menu.classList.add("add-blur");
    const menuHeader = document.createElement("h1");
    menuHeader.textContent = "Menu";

    menu.appendChild(menuHeader);
    menu.append(...iconsElement);
    document.querySelector(".phone-frame").appendChild(menu);
    document.querySelector(".upper-screen").style.display = "none";
    document.querySelector(".mid-screen").style.display = "none";
    document.querySelector(".lower-screen").style.display = "none";
    document.getElementById("sc1").classList.add("add-blur"); //TODO onMenu click - unset blur
};

document.querySelector(".menu").addEventListener("click", openMenu);

//menu.append(...mainIcons);

//home button func that closes the opened fake module

const closeAllModules = () => {
    const openModules = document.querySelectorAll(".module-container");
    openModules.forEach((module) => {
        const parent = document.querySelector(".phone-frame");
        parent.removeChild(module);
        homeBtnContainer.classList.remove("button-bar--wht-background");
        homeBtn.classList.remove("home-button--black-border");
    });
};

const closeButton = document.getElementById("homeBtn");
closeButton.addEventListener("click", closeAllModules);
