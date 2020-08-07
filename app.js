const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

// get items from local storage, if not found, make it an empty array
let items = JSON.parse(localStorage.getItem("items")) || [];



function addItem(e) {
    e.preventDefault();
    // text will be the submitted text
    let text = (this.querySelector("[name=item]")).value

    let item = {
        text: text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList)
    // store the object in local storage as JSON data
    localStorage.setItem("items", JSON.stringify(items));
    // empty the input of the form everytime something is added
    this.reset();
}

function populateList(plates = [], platesList) {
    //add the items on the list
    platesList.innerHTML = plates.map((plate, i) => {
        // check whether "done" property is true, give every checkbox an index
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""}/>
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join("");
}

function toggleDone(e) {
    if (!e.target.matches("input")) {
        return;
    }
    const index = e.target.dataset.index;
    // flip the done property, if it is clicked
    items[index].done = !items[index].done
    // store the items in JSON format
    localStorage.setItem("items", JSON.stringify(items));
    // after refreshing the page will stay the same
    populateList(items, itemsList)
}

// check all button

const checkAllBtn = document.querySelector(".checkAll")

function checkAll() {
    items.forEach(item => {
        item.done = true;
    });
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList)
}

checkAllBtn.addEventListener("click", checkAll)


//uncheck all button

const uncheckAllBtn = document.querySelector(".uncheckAll")

function uncheckAll() {
    items.forEach(item => {
        item.done = false;
    });
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList)
}

uncheckAllBtn.addEventListener("click", uncheckAll)

//clear all button

const clearAllBtn = document.querySelector(".clearAll")

function clearAll() {
    localStorage.clear();
    items = [];
    populateList(items, itemsList);
}

clearAllBtn.addEventListener("click", clearAll)

// event listeners

addItems.addEventListener("submit", addItem);

itemsList.addEventListener("click", toggleDone)

populateList(items, itemsList)