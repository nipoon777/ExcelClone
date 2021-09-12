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




let workSheetDB = [];
function initSheetDB(){
    let sheetDB = [];
    for( let row = 0 ; row < rowSize ; row++){
        let rowArr =[];
        for(let col = 0 ; col < characterSet ; col++){
            let cellObj = {
                bold : false,
                italic : false,
                underline : false,
                fontFamily : "Arial",
                halign : "left",
                fontSize : "16",
                color : "#000000",
                bgColor : "#ffffff",
                value : "",
                children: [],
                formula :""
            }
            rowArr.push(cellObj);
        }
        sheetDB.push(rowArr);
    }
    workSheetDB.push(sheetDB);
}
initSheetDB();
