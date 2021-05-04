// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

function getAndPrint(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        console.log(xhr.response);
    }
    xhr.send();
}

function putAndPrint(url, data) {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        console.log(xhr.response);
    }
    xhr.send(data);
}

// https://www.w3schools.com/jsref/met_document_getelementbyid.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
function appendToParagraph(id, content) {
    var p = document.getElementById(id)
    p.append(JSON.stringify(content))
}

// try 
// console.table
// JSON.parse