let allMaterials = [];
let currentType = "all";

const addDataToTable = (favorite, discard, all = false) => {
    // console.log(favorite, discard);
    let tableBody = document.getElementById("tableBody");
    tableBody.innerText = "";

    allMaterials.forEach((element, i) => {
        if (all || ((favorite == element.favorite) || (discard == element.discard))) {
            console.log(element, i, "Added")

            let tr = document.createElement("tr");

            let mattd = document.createElement("td");
            mattd.innerText = element.material;
            tr.appendChild(mattd);

            let wsptd = document.createElement("td");
            wsptd.innerText = element.wholesalePrice;
            tr.appendChild(wsptd);

            let sptd = document.createElement("td");
            sptd.innerText = element.sellingPrice;
            tr.appendChild(sptd);

            let actiontd = document.createElement("td");
            let afavbtn = document.createElement("button");
            afavbtn.setAttribute("onClick", "favbtn(" + i + ")");
            afavbtn.innerText = "Favorite";
            actiontd.appendChild(afavbtn);

            let adiscardbtn = document.createElement("button");
            adiscardbtn.setAttribute("onClick", "discardbtn(" + i + ")")
            adiscardbtn.innerText = "Discard";
            actiontd.appendChild(adiscardbtn);


            tr.appendChild(actiontd);

            tableBody.appendChild(tr);

        } else {
            // console.log("String not added", element)
        }
    });
}
const getLocalData = () => {
    let materials = localStorage.getItem("saveMaterials");
    if (materials) {
        materials = JSON.parse(materials);
    } else {
        materials = [];
    }
    allMaterials = materials;
}

const init = () => {
    console.log("Init called");

    getLocalData();
    addDataToTable(true, true, true)
}
init();


const favbtn = (index) => {
    // console.log('favbtn called')
    // console.log(index)

    let material = allMaterials[index];
    let newMaterial = {
        ...material,
        ...wholesalePrice,
        ...sellingPrice,
        favorite: "yes",
        discard: "no"
    }

    allMaterials[index] = newMaterial;

    saveToLocalStorage();
}

const discardbtn = (index) => {

    let material = allMaterials[index];
    let newMaterial = {
        ...material,
        ...wholesalePrice,
        ...sellingPrice,
        favorite: "no",
        discard: "yes"
    }

    allMaterials[index] = newMaterial;

    saveToLocalStorage();
}

const filter = (type) => {
    currentType = type;

    if (type == "all") {
        addDataToTable(true, true, true)
    }
    if (type == "favorite") {
        addDataToTable("yes", "no")
    }
    if (type == "discard") {
        addDataToTable("no", "yes")
    }
    if (type == "nfnd") { //not favorite not discard
        addDataToTable("", "")
    }
}

const add = () => {
    console.log("add function called")
    let addedMaterial = document.getElementById("material").value;
    let addedWholesalePrice = document.getElementById("wholesalePrice").value;
    let addedSellingPrice = document.getElementById("sellingPrice").value;
    let newMaterial = {
        material: addedMaterial,
        wholesalePrice: addedWholesalePrice,
        sellingPrice: addedSellingPrice,
        favorite: "",
        discard: ""
    }

    allMaterials.push(newMaterial);

    saveToLocalStorage();

    document.getElementById("material").value = "";
    document.getElementById("wholesalePrice").value = "";
    document.getElementById("sellingPrice").value = "";
}

const saveToLocalStorage = () => {
    localStorage.setItem("saveMaterials", JSON.stringify(allMaterials));
    filter(currentType);
}