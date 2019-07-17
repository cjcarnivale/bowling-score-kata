'use strict';

module.exports = function score(frames) {
  return frames.split(' ').reduce((acc, frame, i, frameArr) => {
    return acc + scoreRolls(frame, frameArr[i + 1]);
  }, 0);
};

function scoreRolls(frame, nextFrame) {
  let score = 0;
  
  if (frame[1] === '/') {
    const bonus = scoreRolls(nextFrame[0]);
    score = 10 + bonus;
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