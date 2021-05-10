let addBtn = document.querySelector(".plus_container");
let sheetList = document.querySelector(".sheets");
let firstSheet = document.querySelector(".sheet");
let alignmentContainer = document.querySelector(".alignment_container");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");
let fontContainer = document.querySelector(".font_container");
let fontFamBtn = document.querySelector(".font_family");
let boldBtn = document.querySelector(".bold");
let unBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let fontSizeBtn = document.querySelector(".font_size");
let colorBtn = document.querySelector(".color");
let bgColorBtn = document.querySelector(".bg_color");
let alignment = document.querySelectorAll(".alignment_container>*");
let sheetDB = workSheetDB[0];

/* 
    Sheet Functionality Implemented here
    First get the Button add listener to listen to click events
*/



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
    sheetArr.forEach((sheet)=>{
        sheet.classList.remove("active_sheet");
    });
    sheetArr = document.querySelectorAll(".sheet");
    sheetArr[sheetArr.length - 1].classList.add("active_sheet");
    //Initialise New Sheet
    initSheetDB();

    sheetDB = workSheetDB[idx];
    initUI();
    newSheet.addEventListener("click", handleActiveSheet);
}

function initUI(){
    for(let i = 0 ; i < allCells.length ; i++ ){
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = ""; 
    }
    allCells[0].click();
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

    let sheetIdx = mySheet.getAttribute("sheet_idx");
    sheetDB = workSheetDB[sheetIdx - 1];

    setUI(sheetDB);
}

function setUI(sheetDB){
    for( let i = 0 ; i < sheetDB.length ; i++ ){
        for( let j = 0 ; j < sheetDB[i].length ; j++){
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, 
                italic, 
                underline,
                halign, 
                fontFamily,
                fontSize,
                color,
                bgColor,
                value 
            } = sheetDB[i][j];
            cell.style.fontWeight = bold ? "bold" : "normal";
            cell.style.fontStyle = italic ? "italic" :"normal";
            cell.style.halign = halign;
            cell.style.textDecoration = underline ? "underline" : "none";
            cell.style.fontFamily = fontFamily;
            cell.style.color = color;
            cell.style.fontSize = fontSize;
            cell.style.backgroundColor = bgColor;
            cell.innerText = value;
        }

    
    }

}

for( let i = 0 ;i < allCells.length ; i++){
    allCells[i].addEventListener("blur", handleCellData);
}

function handleCellData(){
    let address = addressBar.value;
    let { rid, cid } = getRowIdAndColId(address);
    let cellObj = sheetDB[rid][cid];
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cellObj.value = cell.innerText;
}


/* 
    AddressBox Functionality
*/



allCells.forEach( (cell) => {
    cell.addEventListener("click", function handleCell(){
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];

        if(cellObj.bold){
            boldBtn.classList.add("active_btn");
        }else{
            boldBtn.classList.remove("active_btn");
        }

        if(cellObj.italic){
            italicBtn.classList.add("active_btn");
        }else{
            italicBtn.classList.remove("active_btn");
        }

        if(cellObj.underline){
            unBtn.classList.add("active_btn");
        }else{
            unBtn.classList.remove("active_btn");
        }

        colorBtn.value = cellObj.color;
        bgColorBtn.value =cellObj.bgColor;
        fontSizeBtn.value = cellObj.fontSize;
        fontFamBtn.value = cellObj.fontFamily;

        alignment.forEach( (element) => {
            element.classList.remove("active_btn");
       });

       if( cellObj.halign == "left"){
           leftBtn.classList.add("active_btn");
       }else if( cellObj.halign == "center"){
           centerBtn.classList.add("active_btn");
       }else if( cellObj.halign == "right"){
           rightBtn.classList.add("active_btn");
       }

    })
});
allCells[0].click();


/*  Handle alignment and fonts */



alignmentContainer.addEventListener("click", handleAlignment);

function handleAlignment(e){
    let target = e.path[0].classList[0];
    let address = addressBar.value;
    let {cid, rid} = getRowIdAndColId(address);

    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    alignment.forEach((element) => {
        element.classList.remove("active_btn");
    });
    if( target == "left"){
        leftBtn.classList.add("active_btn");
        cell.style.textAlign = "left";
        cellObj.halign = "left";
    }else if(target == "center"){
        centerBtn.classList.add("active_btn");
        cell.style.textAlign = "center";
        cellObj.halign = "center";
    }else{
        rightBtn.classList.add("active_btn");
        cell.style.textAlign = "right";
        cellObj.halign = "right";
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

fontContainer.addEventListener("click", handleFontContainerClick);

function handleFontContainerClick(e){
    let target = e.path[0].classList[0];
    console.log(target);
    let address = addressBar.value;
    let {rid, cid} = getRowIdAndColId(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    if( target == "bold" ){
        let isActive = boldBtn.classList.contains("active_btn");
        if( isActive ){
            boldBtn.classList.remove("active_btn");
            cell.style.fontWeight = "normal";
            cellObj.bold = false;
        }else{  
            boldBtn.classList.add("active_btn");
            cell.style.fontWeight = "bold";
            cellObj.bold = true;
        }
    }else if( target == "italic" ){
        let isActive = italicBtn.classList.contains("active_btn");
        if( isActive ){
            italicBtn.classList.remove("active_btn");
            cell.style.fontStyle = "normal";
            cellObj.italic = false;
        }else{  
            italicBtn.classList.add("active_btn");
            cell.style.fontStyle = "italic";
            cellObj.italic = true;
        }
    }else if( target == "underline" ){
        let isActive = unBtn.classList.contains("active_btn");
        if( isActive ){
            unBtn.classList.remove("active_btn");
            cell.style.textDecoration = "none";
            cellObj.underline = false;
        }else{  
            unBtn.classList.add("active_btn");
            cell.style.textDecoration = "underline";
            cellObj.underline = true;
        }
    }
}
fontContainer.addEventListener("change", handleFontContainerChange);

function handleFontContainerChange(e){
    let target = e.path[0].classList[0];
    let address = addressBar.value;
    let {rid, cid} = getRowIdAndColId(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    if( target == "font_family"){
        let fontFamily = fontFamBtn.value;
        cell.style.fontFamily = fontFamily;
        cellObj.fontFamily = fontFamily;
    }else if( target == "font_size"){
        let fontSize = fontSizeBtn.value;
        cell.style.fontSize = fontSize + "px";
        cellObj.fontSize = fontSize + "px";
    }else if( target == "color"){
        let color = colorBtn.value;
        cell.style.color = color;
        cellObj.color = color;
    }else if( target == "bg_color"){
        let bgColor = bgColorBtn.value;
        cell.style.backgroundColor = bgColor;
        cellObj.bgColor = bgColor;
    }
}



