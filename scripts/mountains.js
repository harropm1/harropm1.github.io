"use strict";


/* this function dynamically creates a table with two columns
*
* @param list = this is the list that is passed in, in this case, the list of mountains from the json file
* @param tBody = this is the body of the table that the data is passed into
*/
function insertTableData(list, tBody)
{
    let row1 = tBody.insertRow(0);
    let cell1Name = row1.insertCell(0);
    let cell2Name = row1.insertCell(1);
    cell1Name.innerHTML = "Name";
    cell2Name.innerHTML = list.name;

    let row2 = tBody.insertRow(1)
    let cell3Elevation = row2.insertCell(0);
    let cell4Elevation = row2.insertCell(1);
    cell3Elevation.innerHTML = "Elevation";
    cell4Elevation.innerHTML = list.elevation;

    let row3 = tBody.insertRow(2)
    let cell5Effort = row3.insertCell(0);
    let cell6Effort = row3.insertCell(1);
    cell5Effort.innerHTML = "Effort";
    cell6Effort.innerHTML = list.effort;

    //inserting image into file
    let mtnImage = document.createElement("img");
    mtnImage.src = "images/" + list.img;
    mtnImage.alt = list.name;
    
    let row4 = tBody.insertRow(3)
    let cell7Image = row4.insertCell(0);
    let cell8Image = row4.insertCell(1);
    cell7Image.innerHTML = "Picture";
    cell8Image.appendChild(mtnImage);

    let row5 = tBody.insertRow(4)
    let cell9Desc = row5.insertCell(0);
    let cell10Desc = row5.insertCell(1);
    cell9Desc.innerHTML = "Description";
    cell10Desc.innerHTML = list.desc;

    let row6 = tBody.insertRow(5)
    let cell11LatLong = row6.insertCell(0);
    let cell12LatLong = row6.insertCell(1);
    cell11LatLong.innerHTML = "Latitude and Longitude";
    cell12LatLong.innerHTML = "Latitude: " + list.coords.lat + ", Longitude: " + list.coords.lng;
}

/* this function creates a table when a user searches for a mountain (includes clearing just the body of the table)
*
* @param list = this is the list that is passed in, in this case, the list of mountains from the json file
* @param selection = this is the selection that the user has made from the dropdown, which is dynamically created lower on this page
*/
function createMountainTable(list, selection)
{
    let tBody = document.getElementById("tableBody");

    while (tBody.childNodes.length)
    {
        tBody.removeChild(tBody.childNodes[0]);
    }
    for (let i = 0; i < list.length; i++)
    {
        if (selection.value == list[i].name)
        {
            insertTableData(list[i], tBody);
        }
    }
}

//window onload
window.onload = function ()
{
    let objects;

    let mountainSelectInput = document.querySelector("#mountainSelect");

    //getting JSON object and creating list of mountain names dynamically
    $.getJSON("data/mountains.json", function (data)
    {
        objects = data.mountains;
        for (let i = 0; i < objects.length; i++)
        {
            let mountainName = objects[i].name;
            let element = document.createElement("option");
            element.text = mountainName;
            element.value = mountainName;
            mountainSelectInput.appendChild(element);
        }
    }); //closing JSON object

    //defining variables
    let mountainBtn = document.querySelector("#mountainBtn")

    mountainBtn.onclick = function ()
    {
        createMountainTable(objects, mountainSelectInput);
    }
}