//
// Core functionality for the todolist
//

function addNewSection() {
    var sectionName = prompt("Please enter the section's name");
    var tempId = Math.floor(Math.random() * 100);
    if (sectionName != null) {
        var d = document.createElement("DIV"); //inflex
        var h = document.createElement("H2"); //name of the section
        var t = document.createTextNode(sectionName);
        var b = document.createElement("BUTTON");
        b.innerHTML = '<div id="z_plus">+</div>'

        h.appendChild(t);
        d.appendChild(h);
        d.appendChild(b);

        b.setAttribute('onclick', "createNew(this.id)");
        b.setAttribute("class", "btn");

        h.setAttribute('id', String(tempId + 'H'));
        b.setAttribute('id', String(tempId + 'B'));
        d.setAttribute('id', String(tempId + 'D'));

        document.getElementById("out").appendChild(d);
    }
}


function createNew(clicked_b) { //adds a new item to the list
    var tempId = Math.floor(Math.random() * 1000);
    var node = document.createElement("LI");
    let div = document.createElement('div');

    div.innerHTML = '<button id="priority_' + tempId + '" ' + 'class="priority" onclick="colorChange(this.id)" style="background-color:rgb(15,157,88)"></button><label class="input-sizer" style="text-decoration:auto"><input id="priority_input_' + tempId + ' type="text" onInput="this.parentNode.dataset.value = this.value" size="40" placeholder="New item..."></label><button id="priority_' + (tempId * 10) + '" ' + 'class="remove" onclick="remove(' + tempId * 50 + ')">X</button> <button id="priority_' + (tempId * 100) + '" ' + 'class="done" onclick="markdone(' + tempId * 50 + ')">&#10004;</button>';

    node.appendChild(div);
    node.setAttribute('id', String(tempId * 50));

    var btnAdd = document.getElementById(clicked_b);
    document.getElementById(clicked_b.slice(0, -1) + 'D').insertBefore(node, btnAdd);


}

function getStyle(el, styleProp) //gets the current background color for the priority so we know which one is next
{
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el, null)[styleProp];
}

function colorChange(clicked_b) { //changes the color for the priorities

    var current = document.getElementById(clicked_b);
    var bgColor = getStyle(current, 'backgroundColor');

    if (bgColor == "rgb(15, 157, 88)") { //green
        document.getElementById(clicked_b).style.backgroundColor = "rgb(244, 160, 0)"; //yellow
    } else if (bgColor == "rgb(244, 160, 0)") { //yellow
        document.getElementById(clicked_b).style.backgroundColor = "rgb(219, 68, 55)"; //red
    } else if (bgColor == "rgb(219, 68, 55)") { //red
        document.getElementById(clicked_b).style.backgroundColor = "rgb(15, 157, 88)"; //green
    }

    //function getStyle(el, styleProp) //gets the current background color for the priority so we know which one is next
    //{
    //  if (el.currentStyle)
    //    return el.currentStyle[styleProp];

    //return document.defaultView.getComputedStyle(el, null)[styleProp];
    //}




}

function remove(clicked_b) {
    var el = document.getElementById(clicked_b);
    el.remove();
}

function markdone(clicked_b) {

    var el = document.getElementById(clicked_b);

    var div_child = el.firstChild;
    var label_child = div_child.getElementsByTagName('label')[0];

    var textDeco = getStyle(label_child, 'textDecoration');

    if (textDeco == "none solid rgb(0, 0, 0)") {
        label_child.style.textDecoration = "line-through";
    } else if (textDeco == "line-through solid rgb(0, 0, 0)") {
        label_child.style.textDecoration = "auto";
    }

}


//Show local time
function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

//
// Add the Date
//

var dateH1 = new Date();
var day = dateH1.getUTCDate();
var month = dateH1.getUTCMonth() + 1;
document.getElementById('titleDate').innerHTML = '<h1>To Do List - ' + month + '/' + day + '</h1>';

// Warning upon reload
window.onbeforeunload = function() {
    return "Reloading this page will empty out all of your entries";
}
