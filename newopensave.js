let save = document.querySelector(".save");
let open = document.querySelector(".open");
let deleteDB = document.querySelector(".delete");


//Functionality is to download the excel representation of data

save.addEventListener("click", handleSave);

function handleSave(){
    //2D array of Saved file
    console.log("Save was clicked");
    const data = JSON.stringify(workSheetDB);
    //Convert this into a BLOB

    const blob = new Blob([data], {type :'application/json'});

    //Convert it to any type file into url

    const url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    //content of the file

    a.href = url;

    a.download = "file.json";

    a.click();
}

open.addEventListener("change", handleOpen);

function handleOpen(e){
    console.log("Open was clicked");
    let fileArr = e.target.files;
    let fileObj = fileArr[0];
    console.log(fileObj);

    let fr = new FileReader();

    fr.readAsText(fileObj);

    fr.addEventListener("load", function () {
        let stringData = fr.result;
        workSheetDB = JSON.parse(stringData);
        sheetDB = workSheetDB[0];
        setUI(sheetDB);
    })
}

deleteDB.addEventListener("click", handleDelete);

function handleDelete(){
    console.log("Delete was clicked");
    initSheetDB();
    initUI();
    setUIDefault(sheetDB);
}

