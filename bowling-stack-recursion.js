'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let framesStack = new Stack;
  frames.split(' ').forEach(frame => {
    framesStack.push(frame);
  });
  return frameScore(framesStack);
};

function frameScore(framesStack){
  //Base case
  if(framesStack.isEmpty()){
    return 0; 
  }
  let score = simpleScore(framesStack.pop());
  return score + frameScore(framesStack);
}

function simpleScore(frame){ 
  const rolls = frame.split('');
  let rollsScore = 0; 
  rolls.forEach(roll => {
    if(roll === '-'){
      rollsScore += 0; 
    } else { 
      rollsScore += parseInt(roll);
    }
  }); 
  return rollsScore; 
}