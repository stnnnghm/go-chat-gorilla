let conn;
let log = document.getElementById("log");

const params = window.location.href.split("/");
const roomId = params[params.length - 1];

conn = new WebSocket("ws://" + document.location.host + "/ws/" + roomId);

conn.onmessage = function (event) {
    let messages = event.data.split('\n');
    for (let i = 0; i < messages.length; i++) {
        let item = document.createElement("div");
        item.innerText = messages[i];
        appendLog(item);
    }
};

let msg = document.getElementById("msg");

document.getElementById("form").onsubmit = function () {
    if (!conn) {
        return false;
    }

    if (!msg.value) {
        return false;
    }

    conn.send(msg.value);
    msg.value = "";
    return false;
}

