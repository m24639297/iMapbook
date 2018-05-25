const app = require("express")()
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const port = 3141;

function err_handle(err) {
    write_log(err.stack);
}

function write_req(req, code) {
    write_log(`${req.ip} ${req.method} ${req.url} ${req.method} ${code}`);
}

function write_log(str){
    str = "[" + new Date() + "] " + str; 
    console.log(str);
    fs.appendFileSync('./log', str + '\n');
}

//====================express====================

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
	write_req(req, 200);
});

app.get('/story_list.json', function(req, res) {
    res.send(JSON.stringify(story_list));
    write_log(req.ip + " GET " +req.url + " " + req.protocol + " 200");
});

app.post('/write', function(req, res) {
    let index = story_list.findIndex(x => x.no == req.body.no);
    if (index === -1)
        story_list.push(req.body);
    else 
        story_list[index] = req.body;
    fs.writeFileSync("./story_list.json", JSON.stringify(story_list));
	write_req(req, 200);
	res.sendStatus(200);
});

// Intialization
app.listen(port, function() {
    write_log("Listening on " + port); 
});
