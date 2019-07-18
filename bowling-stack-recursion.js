'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let framesStack = new Stack;
  frames.split(' ').forEach(frame => {
    framesStack.push(frame);
  });
  return frameScore(framesStack);
};

function frameScore(frames){
  //Base case
  if(frames.isEmpty()){
    let score = simpleScore(frames.pop());
    return score + frameScore(frames);
  }
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