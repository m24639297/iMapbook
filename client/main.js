var current_location = [25.020418, 121.537630]
var lat = current_location[0];
var lng = current_location[1];
var map = L.map('mapid').setView(current_location, 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,minZoom: 8,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery c <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);
map.setView(current_location,16)

board_list = ["board1", "board2", "board3"]
current_board = ""
type_list = ["type1", "type2", "type3","type4"]
check_list = []
start_time = new Date()
lngE = map.getBounds().getEast();
lngW = map.getBounds().getWest();
latN = map.getBounds().getNorth();
latS = map.getBounds().getSouth();
show_all = true

//get board list and show on website
//board_list = ...??
for (var i = 0; i < board_list.length; i++) {
    document.getElementById("board-select").innerHTML += `<option> ${board_list[i]} </option>`
}

//get type_list of this board
function update_type() {
    document.getElementById("type-content").innerHTML = ""
    check_list = []
    // get list from `/$('#board-select :selected').text();/data`
    for (var i = 0; i < type_list.length; i++) {
        check_list.push(false)
        document.getElementById("type-content").innerHTML 
        += `<input type="checkbox" name="${type_list[i]}" value="${i}" onClick="type_change(${i})"> ${type_list[i]} <br>`;
    }
    current_board = document.getElementById('board-select').value
}

// change check_list (T <-> F)
function type_change(i){
    check_list[i] = !check_list[i]
    console.log(check_list)
}

// change start_time
function set_time(){
    var now = new Date()
    var s = now.getTime()
    var t = document.getElementById("time-selector").value
    console.log(t)
    switch(t){
        case '1 hr':
            time_interval = 1;
            break;
        case '3 hrs':
            time_interval = 3;
            break;
        case '6 hrs':
            time_interval = 6;
            break;
        case '12 hrs':
            time_interval = 12;
            break;
        case '1 day':
            time_interval = 24;
            break;
        case '2 days':
            time_interval = 48;
            break;
        case '3 days':
            time_interval = 72;
            break;
        case '7 days':
            time_interval = 168;
            break;
    }
    s -= time_interval*3600000
    start_time = new Date(s)
    console.log(start_time)
}

// show all data or only existing data
function set_show_all(){
    showall = document.getElementById('show-finished-data').checked
}

//get evnets to show -> put marker -> set popup
function show_icon(){
    for (var i = 0; i < type_list.length; i++) if(check_list[i]==true){{
        // create requestURL: board=current_board; type=type_list[i]; all_data: show_all; range:(lngW,lngE)x(latS,latN); time_since:start_time
        requestURL = ""
        _show_icon(i,requestURL)
    }}
}

function _show_icon(i,requestURL){
    var request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var data_list = request.response
        for (var j = 0; j < data_list.length; j++) {
            tmp_mark = L.marker([data_list[j]["lat"],data_list[j]["lng"]])
            tmp_mark.addTo(map)
            tmp_mark.bindPopup(pop_content(
                data_list[j]["event_id"],
                data_list[j]["event_name"],
                data_list[j]["event_type"],
                data_list[j]["location"],
                data_list[j]["existing"],
                data_list[j]["info_list"]),{maxHeight: 300})
            tmp_mark.on('click', function onClick_marker(e){
                tmp_mark.openPopup(e.latlng())
            })
        }
    }
}

function pop_content(event_id,event_name,event_type,location,existing,info_list){

}

// Ask current location and put current position marker

marker = L.marker(current_location)
marker.addTo(map)
marker.bindPopup(
    `<div style="height: 50px ">
    <div style="float: left;">
        {event_name} <br>
        {location}
    </div>
    <div style="float: right;">
        <input type="button" id="edit-button" value="Add">
        <input type="button" id="report-problem-button" value="Report"> 
    </div>
</div>
<div>
    <div style="float: left; width: 50%; height:50px; border: solid;">
        {description}
    </div>
    <div style="float: right; width: 30%;height:50px; border: solid;">
        Photos here
    </div>
</div><br><br>
<div>
    <div style="height: 20px;">
        <div style="float: right;"><input type="button" id="show-all-button" value="Show all data"></div>
    </div>
</div>`, {minWidth:270, maxWidth: 1000, maxHeight:170})
marker.openPopup(current_location)
