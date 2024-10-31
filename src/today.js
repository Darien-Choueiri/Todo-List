import { displayInbox } from "./inbox.js"

function todayPage() {
    const title = document.querySelector(".main-title");
    title.textContent = "Today";
};

//just import displayInbox func and add a filter;
function displayToday() {

}

export { todayPage, displayToday };