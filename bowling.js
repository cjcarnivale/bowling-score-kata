'use strict';

module.exports = function score(frames) {
  return frames.split(' ').reduce((acc, frame, i, frameArr) => {
    return acc + scoreFrame(frame, i, frameArr);
  }, 0);
};

function scoreFrame(frame, i, frameArr) {
  if (frame[0] === 'X'){
    return calculateStrike(i, frameArr);
  } else if (frame[1] === '/') {
    return calculateSpare(i, frameArr);
  } else{
    return simpleScore(frame[0]) + simpleScore(frame[1]); 
  }  
}

function calculateStrike(i, frameArr){
  //Final frame calculation
  if (i === 9){
    return 10 + simpleScore(frameArr[i][1]) + simpleScore(frameArr[i][2]); 
  }
  const nextRoll = frameArr[i + 1][0];
  //Second next roll could be either in the next frame or the frame after
  const secondNextRoll =  ((frameArr[i+1][1] ||frameArr[i+2][0]));
  //In the case that a strike is followed by a spare, to get the value
  //of the second roll, the first roll must be passed down.
  return 10 + simpleScore(nextRoll) + simpleScore((secondNextRoll), frameArr[i + 1][0]); 
}

function calculateSpare(i, frameArr){
  //Final frame calculation
  if (i === 9){
    return 10 + simpleScore(frameArr[i][2]); 
  }
  const nextRoll = frameArr[i+1][0];
  return 10 + simpleScore(nextRoll); 
}

function simpleScore(roll, firstRoll){ 
  if (roll === 'X'){
    return 10;
  }

  if (roll === '/'){
    return  10 - parseInt(firstRoll); 
  }

  if (roll === '-'){
    return 0;
  }
  return parseInt(roll); 
}