// Code for the grid structure

let topRow = document.querySelector(".top_row");
let leftCol = document.querySelector(".left_col");
let grid = document.querySelector(".grid");
const characterSet = 26;
const rowSize = 100;
let str = "";
for (let index = 0; index < characterSet; index++) {
    str += `<div class = 'top_col'> ${String.fromCharCode(65 + index)} </div>`;
}

topRow.innerHTML = str;

str = "";
for (let index = 0; index < rowSize; index++) {
    str += `<div class = "left_col_box" > ${ index + 1}</div>`;    
}
leftCol.innerHTML = str;

/* 
    Make the 2D grid
*/

str = "";
for (let row = 0; row < rowSize; row++) {
    str += `<div class = "row">`;
    for (let column = 0; column < characterSet; column++) {
        str += `<div class = 'col' rid = ${row} cid = ${column} contenteditable = "true"></div>`;
    }
    str += "</div>";
}
grid.innerHTML = str;



/* 
    Sheet Functionality Implemented here
    First get the Button add listener to listen to click events
*/

let addBtn = document.querySelector(".plus_container");
let sheetList = document.querySelector(".sheets");
let firstSheet = document.querySelector(".sheet");

addBtn.addEventListener("click", handleAddSheet);
firstSheet.addEventListener("click", handleActiveSheet);


function handleAddSheet(){
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheet = sheetArr[sheetArr.length - 1];

    let idx = lastSheet.getAttribute("sheet_idx");

    idx = Number(idx);

    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheet_idx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 1}`;

    sheetList.appendChild(newSheet);
    newSheet.addEventListener("click", handleActiveSheet);
}

function handleActiveSheet(e){
    let mySheet = e.currentTarget;

    let sheetArr = document.querySelectorAll(".sheet");

    sheetArr.forEach( sheet => {
        sheet.classList.remove("active_sheet");
    });

    if( !mySheet.classList[1]){
        mySheet.classList.add("active_sheet");
    }

    
}


/* 
    AddressBox Functionality
*/

let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box")


allCells.forEach( (cell) => {
    cell.addEventListener("click", function handleCell(){
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
    })
});
allCells[0].click();


/*  Handle alignment and fonts */

let alignmentContainer = document.querySelector(".alignment_container");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let center = document.querySelector(".center");

alignmentContainer.addEventListener("click", handleAlignment);

function handleAlignment(e){
    let target = e.path[0].classList[0];
    let address = addressBar.value;
    let {cid, rid} = getRowIdAndColId(address);

    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`)
    if( target == "left"){
        cell.style.textAlign = "left";
    }else if(target == "center"){
        cell.style.textAlign = "center";
    }else{
        cell.style.textAlign = "right";
    }
}


function getRowIdAndColId(address){
    let cellColAdr = address.charCodeAt(0);
    let cid = cellColAdr - 65;
    let rid = Number(address.slice(1)) - 1;
    return {cid, rid};
}

/* 
    Handle font style, size and color
*/



