function getReqResByInput() {
    let counter1 = document.getElementById('counter1');
    callAndPrint(parseInt(counter1.value));
}

function getReqResByQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    callAndPrint(id);
}

function callAndPrint(id){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reqres.in/api/products/" + id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response);
        }
    }
    xhr.send();
}