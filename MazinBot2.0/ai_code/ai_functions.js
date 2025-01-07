"use strict";
function day(dateString){
    dateString = dateString.toString();
    switch (dateString.slice(0,3)){
        //break is not given in each block since return keyword is used
        case "Sun":
            return "Sunday";
        case "Mon":
            return "Monday";
        case "Tue":
            return "Tuesday";
        case "Wed":
            return "Wednesday";
        case "Thu":
            return "Thurseday";
        case "Fri":
            return "Friday";
        case "Sat":
            return "Saturday";
        default:
            console.log("ERROR");
    }
}
function month(date){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()];
}
function searchAnswer(txt){
    //the following while loops are there because /?/g and /./g in .replace() lead to errors
    while(txt.includes("?")){
        txt = txt.replace("?", "");
    }
    while(txt.includes(".")){
        txt = txt.replace(".", "");
    }
    let timeWords = ["time", "clock", "moment"];
    let arr = txt.split(" ");
    if(!arr){
        arr = [txt, ""];
    }
    let d = new Date();
    let x = (d.getHours >= 12) ? "PM":"AM";
    let hrs = d.getHours();
    if(x === "PM"){
        hrs -= 12;
    }else if(hrs === 0){
        hrs += 12;
    }
    if(hrs <10){
        hrs = "0" + hrs.toString();
    }
    let mins = d.getMinutes();
    if(mins<10){
        mins = "0" + mins.toString();
    }
    let syntax = "th";
    switch (d.getDate()){
        case 1:
            syntax = "st";
            break;
        case 2:
            syntax = "nd";
            break;
        case 3:
            syntax = "rd";
            break;
        default:
            syntax = "th";
    }
    var greeting;
    if(d.getHours() < 12){
        greeting = "Good morning";
    }else if(d.getHours() < 17){
        greeting = "Good afternoon";
    }else{
        greeting = "Good evening";
    }
    if(arr.length < 10 && ((arr.map((x)=> timeWords.includes(x)).some((a) => a)) && (arr.includes("date"))) || arr.includes("datetime") || arr.includes("date-time") || arr.includes("date_time")){
        return `It is ${hrs}:${mins} ${x} of ${day(d.toDateString())}, ${d.toDateString().slice(4)}`;
    }else if((arr.length < 10) && (arr.map((x)=> timeWords.includes(x)).some((a) => a))){
        return `It is ${hrs}:${mins} ${x}`;
    }else if(arr.length < 10 && arr.includes("date")){
        return `It is ${day(d)}, the ${d.getDate() + syntax} of ${month(d)}, ${d.getFullYear()}.`;
    }else if(txt.includes("what day is it") && arr.length < 10){
        return "It is " + day(d) + " today.";
    }else if(arr.includes("year") && arr.length < 7){
        return "It is " + d.getFullYear();
    }else if(arr.includes("month") && arr.length < 7){
        return "It is " + month(d);
    }else if(txt.includes("who are you")){
        return "I am MazinBot";
    }else{
        return advanced(txt);
    }
}
function timeGreet(userGreet){
    let hrs = new Date().getHours();
    let time_of_day = "";
    if(hrs > 19){
        time_of_day = "nighttime";
    }else if(hrs > 17){
        time_of_day = "evening";
    }else if(hrs > 12){
        time_of_day = "afternoon";
    }else{
        time_of_day = "morning";
    }
    let answer = "good " + time_of_day;
    //say good evening instead of good nighttime
    answer = answer.replace("nighttime", "evening");
    if(answer.includes(userGreet.replace(/ /g, ""))){
        return answer[0].toUpperCase() + answer.slice(1);
    }else{
        return `It is ${time_of_day} now, ${answer}. `;
    }
}
function executeAI(input){
    input = input.toLowerCase();
    //console.log(input);
    let greetings = ["hi", "goodmorning", "goodafternoon", "hello", "goodevening", "good morning", "good afternoon", "good evening", "slamalikum", "assalamu alaikum", "assalamualaikum", "salam", "hello", "ola", "hey", "whatup", "yo ", "morning", "afternoon", "evening", "wassup", "whatsup"];
    if(greetings.includes(input)){
        let timeBasedGreetings = ["goodmorning", "morning", "goodafternoon", "afternoon", "good evening", "evening"];
        if(matcher(timeBasedGreetings, input.split(" "))){
            var greet = timeGreet(input);
        }else{
            var greet = input;
        }

        if(greet.includes(".")){
            var answer = greet + " How may I help you?";
        }else{
            var answer = greet + ", how may I help you?";
        }
        var AlreadyGreeted = true;
    }else{
        var answer = searchAnswer(input);
    }
    if(!AlreadyGreeted && answer && greetings.map((greet) => input.includes(greet)).some((x) => x)){
        let g = "";
        greetings.forEach((G) => {
            if(input.includes(G)){
                g = G;
            }
        })
        if(g.includes("morning")||g.includes("evening") || g.includes("night") || g.includes("afternoon")){
            if(new Date().getHours() < 12){
                g = "Good morning";
            }else if (new Date().getHours() < 17){
                g = "Good afternoon";
            }else{
                g = "Good evening";
            }
        }
        answer = g[0].toUpperCase() + g.slice(1) + ", " + answer[0].toLowerCase() + answer.slice(1);
    }
    if(answer !== false){
        answer = answer[0].toUpperCase() + answer.slice(1);
        answer = answer.replace("0-", ""); //to fix an unknown error
        let htmlCode = `<div class="aimessage">
                        <span class="message">${answer}</span>
                    </div>`;
        document.getElementById("chat_screen").innerHTML += htmlCode;
    }else{
        let htmlCode = `<div class="aimessage">
                            <span style="display:block;" class="message">
                                <span>Sorry, I do not know what this means. <!-- Please <a href="train.html">Train me to make me better!</a></span>
                                <!--<section>
                                    <a href="" class="btn">Yes</a>
                                </section>-->
                            </span>
                        </div>`;
        document.getElementById('chat_screen').innerHTML += htmlCode;
    }
}