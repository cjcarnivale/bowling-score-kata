"use strict";

module.exports = function score(frames){
    let frameArr = frames.split(" ");
    let totalScore = 0;

    frameArr.forEach((frame, i) => {
        let frameScore = scoreFrame(frame, frameArr[i + 1]); 
        totalScore += frameScore; 
    })
    
    function scoreFrame(frame, nextFrame){
        if (isSpare(frame[1])){
            let bonus = scoreRoll(nextFrame[0])
            return 10 + bonus;
        }
        return scoreRoll(frame[0]) + scoreRoll(frame[1]);
    }

    function scoreRoll(roll){
        if (roll === "-"){
            return 0;
        }
        return parseInt(roll);
    }
    function isSpare(roll){
        if(roll === "/"){
            return true
        }
    }
    return totalScore;
}