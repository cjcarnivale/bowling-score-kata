'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let framesStack = new Stack;
  frames.split(' ').forEach(frame => {
    framesStack.push(frame);
  });
  return frameScore(framesStack);
};

function frameScore(framesStack, previousFrame){
  //Base case
  if(framesStack.isEmpty()){
    return 0; 
  }
  let currentFrame = framesStack.pop();
  let score = simpleScore(currentFrame, previousFrame);
  previousFrame = currentFrame;
  return score + frameScore(framesStack, previousFrame);
}

function simpleScore(frame, previousFrame){
  const rolls = frame.split('');
  let rollsScore = 0; 
  rolls.forEach(roll => { 
    if(roll === '-'){
      rollsScore += 0; 
    } else if (roll === '/'){
      rollsScore += (10 - parseInt(rolls[0]) + simpleScore(previousFrame[0])); 
    } else if(roll === 'X'){
      rollsScore = 10; 
    }else { 
      rollsScore += parseInt(roll);
    }
  }); 
  return rollsScore; 
}