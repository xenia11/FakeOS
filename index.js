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
    divElement.className = "icon-container";
    divElement.onclick = `createFakeModule(${icon.title})`;
    divElement.setAttribute("data-icon", `${icon.title}`);

    const imageElement = document.createElement("img");
    imageElement.src = `${icon.image}`;
    imageElement.alt = `${icon.title}`;
    imageElement.className = "icon-container icon-container__icon";

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
};
currentTime();

// open app when clicked
const iconContainers = document.querySelectorAll(".icon-container");

iconContainers.forEach((icon) => {
    icon.addEventListener("click", () => {
        const iconData = icon.dataset.icon;
        console.log(iconData);
        createFakeModule(iconData);
    });
});

function createFakeModule(icon) {
    if (icon == "Menu") return openMenu();
    const moduleContainer = document.createElement("div");
    const moduleHeader = document.createElement("h2");
    const moduleText = document.createElement("p");
    const moduleCloseBtn = document.createElement("button");

    moduleContainer.className = "module-container";
    moduleHeader.textContent = icon.title;
    moduleText.textContent = `You've just opened ${icon}`;
    moduleCloseBtn.textContent = "Close";

    moduleCloseBtn.addEventListener("click", () => {
        moduleContainer.remove();
    });

    moduleContainer.appendChild(moduleHeader);
    moduleContainer.appendChild(moduleText);
    moduleContainer.appendChild(moduleCloseBtn);

    document.querySelector(".screen").appendChild(moduleContainer);
}

const openMenu = () => {
    const menu = document.createElement("div");
    menu.className = "menu-container";
    document.getElementById("time").appendChild(menu);
};
