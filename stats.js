const storage = window.localStorage

$(document).ready(function() {
    if (storage.getItem("type-time") === null) {
        storage.setItem("type-time", 0)
    }
    if (storage.getItem("other-time") === null) {
        storage.setItem("other-time", 0)
    }
    if (storage.getItem("wpm-stats") === null) {
        storage.setItem("wpm-stats", JSON.stringify({}))
    }
    console.log(storage.getItem("other-time"))
    console.log(storage.getItem("type-time"))
    setTimeout(loadTimer, 1000)
})

function loadTimer() {
    if (parseInt(timer) < 1 || isNaN(parseInt(timer))) {
        storage.setItem("other-time", parseInt(storage.getItem("other-time"))+1)
    } else {
        storage.setItem("type-time", parseInt(storage.getItem("type-time"))+1)
    }
    
    setTimeout(loadTimer, 1000);
}