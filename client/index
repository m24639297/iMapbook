var current_location = [25.020418, 121.537630]
var lat = current_location[0];
var lng = current_location[1];
var map = L.map('mapid',{doubleClickZoom : false}).setView(current_location, 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,minZoom: 8,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery c <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);
map.setView(current_location,15)


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
alldata = [{"event_id":"001","event_name":"Fist event", "event_type":"type1","location":"NTU", "existing":"true", "info_list":[{"report_time":"2017/01/03", "user_id":"user000", "report_id":"0001", "description":"there's a hole!!!"},{"report_time":"2017/01/04", "user_id":"HELLO", "report_id":"0002", "description":" HOLEEEEEEE hole!!!"}]}]

console.log(alldata[0]["info_list"])

//get board list and show on website
//board_list = ...??
for (var i = 0; i < board_list.length; i++) {
    document.getElementById("board-select").innerHTML += `<option> ${board_list[i]} </option>`
}

function board_refresh(){
    current_board = document.getElementById('board-select').value
    console.log(`current board is ${current_board}`)
    update_type()
    show_icon()

}

//get type_list of this board
function update_type() {
    document.getElementById("type-content").innerHTML = ""
    check_list = []
    // get list (type_list) from current board (current_board)
    for (var i = 0; i < type_list.length; i++) {
        check_list.push(false)
        document.getElementById("type-content").innerHTML 
        += `<input type="checkbox" name="${type_list[i]}" value="${i}" onClick="type_change(${i})"> ${type_list[i]} <br>`;
    }
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
    console.log(`t is ${t}`)
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
    console.log(`data start from ${start_time}`)
    show_icon()
}

// show all data or only existing data
function set_show_all(){
    show_all = document.getElementById('show-finished-data').checked
    if(show_all) console.log("show all events")
    else console.log("show only ongoing events")
    show_icon()
}

//get evnets to show -> put marker -> set popup
function show_icon(){
    for (var i = 0; i < type_list.length; i++) if(check_list[i]==true){{
        // create requestURL: board=current_board; type=type_list[i]; existing: show_all; range:(lngW,lngE)x(latS,latN); time_since:start_time
        requestURL = ""
        _show_icon(i,requestURL)
    }}
}

function _show_icon(i,requestURL){
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var data_list = request.response
        for (var j = 0; j < data_list.length; j++) {
            if(data_list[j]["existing"] == false && show_all == false){continue;}
            tmp_mark = L.marker([data_list[j]["lat"],data_list[j]["lng"]])
            tmp_mark.addTo(map)
            tmp_mark.bindPopup(popup_content(data_list[j]),{maxHeight: 300})
            // tmp_mark.on('click', function onClick_marker(e){
            //     tmp_mark.openPopup(e.latlng())
            // })
        }
    }
}
//popup_content = ""//`<div style="height: 80px "><div style="float: left;">${event_name} <br>${location}</div><div style="float: right;"><input type="button" id="edit-button" value="Edit"><input type="button" id="report-problem-button" value="Report"> </div></div><div><div style="float: left; width: 67%; min-height: 200px; border: solid;">${description}</div><div style="float: right; width: 32%; min-height: 200px; border: solid;">Hey dick</div></div><br><br><div><div style="height: 20px;"><div style="float: right;"><input type="button" id="show-all-button" value="Show all data"></div></div></div>`

function popup_content(_data){
    s0 = ""
    console.log(_data["existing"])
    if(_data["existing"]=="true") {s0='<div style="height:280px">'}
    else {console.log("allo");s0 =  '<div style="height:280px">'}
    s0 +=
    `<div style="height: 50px ">
        <div style="float: left;">
            ${_data["event_name"]} <br>
            @${_data["location"]}
        </div>
        <div style="float: right;">
            <input type="button" id="edit-button" value="Edit">
            <input type="button" id="report-problem-button" value="Report"> 
        </div>
    </div>`
    s0 += `<div><div style="float: left; width: 62%; min-height: 200px; max-height: 200px; border: solid;overflow:scroll">`
    for (var i = 0; i < _data["info_list"].length; i++) {
        s0 += `<div style="border: solid;">
                ${_data["info_list"][i]["user_id"]}  ${_data["info_list"][i]["report_time"]} 
                <div style="border: dashed; padding:2px;">
                    ${_data["info_list"][i]["description"]}
                </div></div><br>`
    }
    s0 += `</div>
            <div style="float: right; width: 30%; min-height: 200px;max-height: 200px; border: solid;">
                Photo?
            </div>
        </div><br><br></div>`
    return s0;
}

// Ask current location and put current position marker

function update_all_data(){
    for (var i = 0; i < alldata.length; i++) {
        document.getElementById("event-list-content").innerHTML += all_data_html(alldata[i])

    }
}

function all_data_html(data){

}

mm=  L.marker(current_location)
mm.addTo(map)
mm.bindPopup(popup_content(alldata[0]),{maxHeight:300, minWidth:300})



