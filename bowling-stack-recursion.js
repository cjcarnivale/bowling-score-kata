'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let framesStack = new Stack;
  frames.split(' ').forEach(frame => {
    framesStack.push(frame);
  });
  return gameScore(framesStack);
};

function gameScore(framesStack, previousFrame, nextPreviousFrame){
  //Base case
  if(framesStack.isEmpty()){
    return 0; 
  }

  let currentFrame = framesStack.pop();
  let totalScore = frameScore(currentFrame, previousFrame, nextPreviousFrame);
  
  nextPreviousFrame = previousFrame; 
  previousFrame = currentFrame;

  return totalScore + gameScore(framesStack, previousFrame, nextPreviousFrame);
}

function frameScore(frame, previousFrame, nextPreviousFrame){
  if (frame.includes('/')){
    return calculateSpare(frame, previousFrame);
  } 
  if(frame.includes('X')){
    return calculateStrike(frame, previousFrame, nextPreviousFrame); 
  } 
  return simpleScore(frame[0]) + simpleScore(frame[1]);
}

function calculateSpare(frame, previousFrame){
  if (frame.length === 3){ 
    return 10 + simpleScore(frame[2]);
  }
  return (10 + simpleScore(previousFrame[0])); 
}

function calculateStrike(frame, previousFrame, nextPreviousFrame){
  if (frame.length === 3){
    return 30; 
  }
  if (previousFrame.includes('/')){
    return 20; 
  }
  return (10 + simpleScore(previousFrame[0]) + 
    (previousFrame[1] 
      ? simpleScore(previousFrame[1]) 
      : simpleScore(nextPreviousFrame[0]))
  ); 
}

function simpleScore(roll){
  if (roll === '-'){
    return 0; 
  }
  if (roll === 'X'){
    return 10; 
  }
  return parseInt(roll); 
}