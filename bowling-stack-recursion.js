'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let frameStack = new Stack;
  if(frames[22]){
    frames.slice(20, 22); 
    frames[19] === 'XXX'; 
  }
  frames.replace(/-/gi, '0').split(' ').forEach(frame => {
    frameStack.push(frame);
  });
  return gameScore(frameStack);
};

function gameScore(frameStack, currentFrame = frameStack.pop(), previousFrame, nextPreviousFrame){
  let frameScore = 0; 
  //Base case
  if(currentFrame === 'Underflow') {
    return 0; 
  }

  if (currentFrame.includes('/')) {
    if (currentFrame.length === 3){
      frameScore += 10 + simpleScore(currentFrame[2]); 
    } else {
      frameScore += 10 + simpleScore(previousFrame[0]); 
    }
  } else if (currentFrame.includes('X')){
    if (currentFrame.length === 3){
      frameScore += 30; 
    }
    else if (previousFrame[1] === '/'){
      frameScore += 20; 
    } else {
      frameScore += (10 + simpleScore(previousFrame[0]) + simpleScore(previousFrame[1] ? previousFrame[1] : nextPreviousFrame[0]));
    }  
  } else {
    frameScore += simpleScore(currentFrame[0]) + simpleScore(currentFrame[1]); 
  }

  function simpleScore(roll){
    if (roll === 'X'){
      return 10;
    }
    return parseInt(roll); 
  }

  nextPreviousFrame = previousFrame; 
  previousFrame = currentFrame; 

  return frameScore + gameScore(frameStack, frameStack.pop(), previousFrame, nextPreviousFrame); 
}
