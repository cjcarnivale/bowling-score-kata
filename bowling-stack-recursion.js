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
  const rolls = frame.split('');
  let score = 0; 
  rolls.forEach(roll => { 
    if(roll === '-'){
      score += 0; 
    } else if (roll === '/'){
      score += calculateSpare(frame, previousFrame); 
    } else if(roll === 'X'){
      score = calculateStrike(frame, previousFrame, nextPreviousFrame); 
    }else { 
      score += parseInt(roll);
    }
  }); 
  return score; 
}

function calculateSpare(frame, previousFrame){
  let score = 0;
  if (frame.length === 3){ 
    score = parseInt(frame[2]);
  } else{
    score =  (10 - parseInt(frame[0]) + frameScore(previousFrame[0]));
  } 
  return score; 
}

function calculateStrike(frame, previousFrame, nextPreviousFrame){
  let score = 0; 
  if (frame.length === 3){
    score = 20; 
  } else if (previousFrame && previousFrame.length === 1){ 
    score = 20 + frameScore(previousFrame[0]) + frameScore(nextPreviousFrame[0]); 
  } else if(previousFrame && previousFrame[1] === '/'){
    score = 20; 
  } 
  else{
    if (previousFrame){
      score = (10 + frameScore(previousFrame));
    }
  }
  return score;  
}