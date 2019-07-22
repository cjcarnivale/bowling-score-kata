'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  //Set-up Stack
  let frameStack = new Stack;
  //3 strikes in the last frame formatting
  if (frames[22] === 'X'){
    frames = frames.substring(0, 18).concat('XXX'); 
  }
  frames.replace(/-/gi, '0').split(' ').forEach(frame => {
    frameStack.push(frame);
  });
  //Call scoring function
  return gameScore(frameStack);
};

function gameScore(frameStack, currentFrame = frameStack.pop(), previousFrame, nextPreviousFrame){
  let frameScore = 0; 
  //Base case
  if(currentFrame === 'Underflow') {
    return 0; 
  }

  //Spare
  if (currentFrame.includes('/')) {
    //Final frame
    if (currentFrame.length === 3){
      frameScore += 10 + simpleScore(currentFrame[2]); 
    } else {
      frameScore += 10 + simpleScore(previousFrame[0]); 
    }
  //Strike
  } else if (currentFrame.includes('X')){
    //Final frame
    if (currentFrame.length === 3){
      frameScore += 30; 
    }
    //Previous frame is a spare
    else if (previousFrame[1] === '/'){
      frameScore += 20; 
    } else {
    //Previous frame is a strike, or not a spare
      frameScore += (10 + simpleScore(previousFrame[0]) + simpleScore(previousFrame[1] ? previousFrame[1] : nextPreviousFrame[0]));
    }
  //Neither strike nor spare  
  } else {
    frameScore += simpleScore(currentFrame[0]) + simpleScore(currentFrame[1]); 
  }

  nextPreviousFrame = previousFrame; 
  previousFrame = currentFrame; 

  //Recursive call
  return frameScore + gameScore(frameStack, frameStack.pop(), previousFrame, nextPreviousFrame); 
}

//Helper function to get numeric values
function simpleScore(roll){
  if (roll === 'X'){
    return 10;
  }
  return parseInt(roll); 
}

