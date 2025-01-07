"use strict";
function matcher(a1,a2){
    if(!(a1 instanceof Array) || !(a2 instanceof Array)){
        console.log("Error: matcher function must take arrays as input");
    }
    //find how many items are common between arrays a1 and a2
    let s = a1.filter((item) => {
        if(a2.includes(item)){
            return true;
        }else{
            return false;
        }
    })
    return s.length;
}
//dataSet is an array containing objects representing each question-answer pair. For each object, the 
//questions property includes an array of arrays that have question keywords
var dataSet = [
    {
        answer: "I am fine, thankyou!",
        questions: [["how"], ["how", "doing"]]
    },
    {
        answer: "A cat is a small carnivorous animal. Many people have them as pets!",
        questions: [["cat"], ["biral"], ["what", "cat"]]
    },
    {
        answer: "I was created by Mazin Mikail Khan",
        questions: [["made"], ["created"], ["programmed"], ["designed"], ["developed"], ["engineered"]]
    }
];
function advanced(txt){
    //replace all special characters with space
    txt = txt.replace(/[~!@#$%^&*()_+{}|:;"',./<>?[]]/g, " ");
    txt = txt.replace(/[\\]/g, " ");
    txt = txt.replace(/]/g, " ");
    let arr = txt.split(" ");
    //create a list of grammatical words from the internet:
    let grammaticalWords = "i, you, he, she, it, we, they, this, that, these, those, who, whom, whose, which, that, someone, everyone, anyone, no, something, everything, anything, nothing, a, an, the, my, your, his, her, its, our, their, this, that, these, those, many, few, several, all, most, some, any, no, in, on, at, for, with, by, of, to, from, in, out, up, down, over, under, through, near, beside, between, among, before, after, since, until, during, about, around, against, according to, because of, due to, and, but, or, nor, for, yet, so, after, although, as, as if, as though, because, before, if, in order that, since, so that, though, unless, until, when, whenever, where, wherever, while, am, is, are, was, were, being, been, have, has, have, had, having, do, does, did, doing, can, could, may, might, must, shall, should, will, would, oh, wow, ouch, hurray, oops";
    grammaticalWords = grammaticalWords.split(", ");
    arr = arr.filter((word) => {
        if(grammaticalWords.includes(word)){
            return false;
        }else{
            return true;
        }
    });
    console.log(arr);
    let percentageMatches = dataSet.map((obj) => {
        //determine the number of matching words in each question option
        let matches = obj.questions.map((array_item) => {
            return matcher(arr,array_item);
        });
        //find the highest number of matching words among all question options
        let max = Math.max.apply(null, matches);
        let totalWords = arr.length;
        //return highest percentage word match for this entire answer choice
        return max/totalWords * 100;
    });
    console.log(percentageMatches);
    let maxPercentMatch = Math.max.apply(null, percentageMatches);
    let i = percentageMatches.indexOf(maxPercentMatch);
    //return an answer if maximum percentage word match is greater than 80 (%)
    if(maxPercentMatch > 80){
        return dataSet[i].answer;
    }else{
        console.log(arr);
        return false;
    }
}