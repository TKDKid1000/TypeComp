//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
//
var wordindex = 0;
var timer = "Ready?";
var currentTime = timer;
var initialTime = 30;
var mistakes = 0;
$(document).ready(function() {
    $("#text-input").on("input", function () {
        if ($("#timer").text().localeCompare("Ready?") === 0) {
            timer = initialTime;
            $("#timer").text(timer+"")
            for (var x=timer; x>-1; x--) {
                const time = x;
                setTimeout(function() {
                    currentTime = timer-time;
                    $("#timer").text(currentTime+"")
                    $("#live-wpm").text(Math.round(wordindex/((initialTime-currentTime)/60)) + " wpm")
                    if (currentTime == 0) {
                        end();
                    }
                }, time*1000)
            }
        }
        const text = $(this).val()
        $("#text-input").removeClass()
        // $("#text-input").addClass("form-control border border-primary");
        if ($("#text-input").val()) {
            if (words[wordindex].startsWith(text.trim())) {
                $("#text-input").addClass("text-success")
            } else {
                $("#text-input").addClass("text-danger")
                mistakes++;
            }
        }
        if (text.endsWith(" ")) {
            if (words[wordindex].localeCompare(text.trim()) === 0) {
                $(this).val("")
                $(this).trigger("input")
                wordindex++;
                $("#type-text").empty(); 
                $(this).attr("placeholder", words[wordindex])
                $.each(words, function (index, word) {
                    if (wordindex > index) {
                        $("#type-text").append(`<span class="text-success">${word}</span> `)
                    }
                });
                $("#text-input").width(words[wordindex].length*(parseInt($("#text-input").css("font-size"))/2+1))
                $("#text-input").focus();
            } else {
                mistakes++;
            }
        }
    })
})
function end() {
    $("#timer").text("Time's Up!")
    $("#text-input").hide()
    $("#placeholder-text").hide()
    timer = -1
    $("#type-text").text(wordindex/(initialTime/60) + " wpm, and with " + mistakes + " mistakes")
    var stats = JSON.parse(window.localStorage.getItem("wpm-stats"))
    
    if (stats[wordindex/(initialTime/60)] !== undefined) {
        stats[wordindex/(initialTime/60)]["mistakes"] = stats[wordindex/(initialTime/60)]["mistakes"]+mistakes
        stats[wordindex/(initialTime/60)]["count"] = stats[wordindex/(initialTime/60)]+1
    } else {
        stats[wordindex/(initialTime/60)] = {"mistakes": Object(mistakes), "count": Object(1)}
    }
    console.log(JSON.stringify(stats))
    window.localStorage.setItem("wpm-stats", JSON.stringify(stats))
}