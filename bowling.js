'use strict';

module.exports = function score(frames) {
  return frames.split(' ').reduce((acc, frame, i, frameArr) => {
    return acc + scoreFrame(frame, i, frameArr);
  }, 0);
};

function scoreFrame(frame, i, frameArr) {
  let score = 0;
  
  if (frame[0] === 'X'){
    score = calculateStrike(i, frameArr);
  } else if (frame[1] === '/') {
    score = calculateSpare(i, frameArr);
  } else{
    score = frame.split('').reduce((acc, roll) => {
      if (roll === '-'){
        return acc + 0;
      }
      return acc + parseInt(roll); 
    }, 0);
  }
  return score; 
}

function calculateStrike(i, frameArr){
  const secondNextRoll =  (frameArr[i+1][1]) || (frameArr[i+2][0]);
  return 10 + simpleScore(frameArr[i+1][0]) + simpleScore(secondNextRoll, frameArr[i + 1][0]); 
}

function calculateSpare(i, frameArr){
  return 10 + simpleScore(frameArr[i+1][0]); 
}

function simpleScore(roll, diff){ 
  if (roll === 'X'){
    return 10;
  }

  if (roll === '/'){
    return  10 - parseInt(diff); 
  }

  if (roll === '-'){
    return 0;
  }
  return parseInt(roll); 
}