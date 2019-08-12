"use strict";


/* this function dynamically creates a table
*
* @param list = this is the list that is passed in, in this case, the list of parks from the json file
* @param tBody = this is the body of the table that the data is passed into
*/
function insertTableData(list, tBody)
{
    let row1 = tBody.insertRow(-1);

    let cell1Name = row1.insertCell(0);
    let cell2Address = row1.insertCell(1);
    let cell3Phone = row1.insertCell(2);
    let cell4Fax = row1.insertCell(3);
    let cell5Visit = row1.insertCell(4);
    let cell6LatLong = row1.insertCell(5);

    cell1Name.innerHTML = list.LocationName;    
    cell2Address.innerHTML = list.City + ", " + list.State;
    if (list.Phone == 0 )
    {
        cell3Phone.innerHTML = "&nbsp;";
    }
    else
    {
        cell3Phone.innerHTML = list.Phone;
    }   
    
    if (list.Fax == 0)
    {
        cell4Fax.innerHTML = "&nbsp;";    
    }
    else
    {
        cell4Fax.innerHTML = list.Fax;
    }   
    
    if (list.Visit != undefined)
    {
        cell5Visit.innerHTML = list.Visit;
    }
    else
    {
        cell5Visit.innerHTML = "&nbsp;";
    }    
    cell6LatLong.innerHTML = "Latitude: " + list.Latitude + "\nLongitude: " + list.Longitude;
}

/* this function creates a table when a user searches by state (includes clearing just the body of the table)
*
* @param list = this is the list that is passed in, in this case, the list of parks from the json file
* @param selection = this is the selection that the user has made from the dropdown, which is dynamically created lower on this page
*/
function createSearchByStateTable(list, selection)
{
    let tBody = document.getElementById("tableBody");

    while (tBody.childNodes.length)
    {
        tBody.removeChild(tBody.childNodes[0]);
    }
    for (let i = 0; i < list.parks.length; i++)
    {
        if (selection == list.parks[i].State)
        {
            insertTableData(list.parks[i], tBody);
        }
    }
}

/* this function creates a table when searching by park type (includes clearing just the body of the table)
*
* @param list = this is the list that is passed in, in this case, the list of parks from the json file
* @param selection = this is the selection that the user has made from the dropdown, which is dynamically created lower on this page
*/
function createSearchByParkTypeTable(list, selection)
{
    let tBody = document.getElementById("tableBody");

    while (tBody.childNodes.length)
    {
        tBody.removeChild(tBody.childNodes[0]);
    }
    for (let i = 0; i < list.parks.length; i++)
    {
        let regExp = new RegExp (selection, 'i');
        if (regExp.exec(list.parks[i].LocationName))
        {
            insertTableData(list.parks[i], tBody);
        }
    }
}

/* this function creates a table when the user clicks a button to show all parks (includes clearing just the body of the table)
*
* @param list = this is the list that is passed in, in this case, the list of parks from the json file
*/
function createShowAllParks(list)
{
    let tBody = document.getElementById("tableBody");

    for (let i = 0; i < list.parks.length; i++)
    {
        insertTableData(list.parks[i], tBody);
    }
}

//window onload
window.onload = function ()
{
    let states = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "DC",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];
    let stateSelectInput = document.querySelector("#stateSelect");

    for (let i = 0; i < states.length; i++)
    {
        let element1 = document.createElement("option");
        element1.text = states[i];
        element1.value = states[i];
        stateSelectInput.appendChild(element1);
    }

    let parkType = [
        "National Park",
        "National Monument",
        "Recreation Area",
        "Scenic Trail",
        "Battlefield",
        "Historic",
        "Memorial",
        "Preserve",
        "Island",
        "River",
        "Seashore",
        "Trail",
        "Parkway"
    ];
    let parkTypeSelectInput = document.querySelector("#parkTypeSelect");

    for (let i = 0; i < parkType.length; i++)
    {
        let element2 = document.createElement("option");
        element2.text = parkType[i];
        element2.value = parkType[i];
        parkTypeSelectInput.appendChild(element2);
    }
    
    //pulling in the JSON object
    let objects;
    $.getJSON("data/nationalparks.json", function (parks)
    {
        objects = parks;
    }); //closing JSON object

    //defining buttons
    let stateGoBtn = document.querySelector("#stateGoBtn");
    let parkTypeGoBtn = document.querySelector("#parkTypeGoBtn");
    let viewAllBtn = document.querySelector("#viewAllBtn");
    let parksReset = document.querySelector("#parksReset");

    let parkAlert = document.querySelector(".parkAlert");
    let stateAlert = document.querySelector(".stateAlert");

    //click events
    stateGoBtn.onclick = function ()
    {
        if (stateSelectInput.value == "choose a state")
        {
            stateAlert.style.display = "block";
        }
        else
        {
            stateAlert.style.display = "none";
            createSearchByStateTable(objects, stateSelectInput.value);
        }
    }

    parkTypeGoBtn.onclick = function()
    {
        if (parkTypeSelectInput.value == "choose")
        {
            parkAlert.style.display = "block";
        }
        else
        {
            parkAlert.style.display = "none";
            createSearchByParkTypeTable(objects, parkTypeSelectInput.value);
        }
        
    }

    viewAllBtn.onclick = function()
    {
        createShowAllParks(objects);
    }

    parksReset.onclick = function()
    {
        nationalParksTable.innerHTML = "";
    }
}