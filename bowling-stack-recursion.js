'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let rollStack = new Stack;
  frames.split('').filter(roll => roll !== ' ').forEach(roll => {
    rollStack.push(roll);
  });
  return gameScore(rollStack);
};

function gameScore(rollStack, currentRoll = rollStack.pop(), previousRoll, nextPreviousRoll){
  let frameScore = 0;
  let nextRoll = null; 
  //Base case
  if(currentRoll === 'Underflow'){
    return 0; 
  }
  
  if (currentRoll === '-'){
    frameScore += 0;   
  } else if (currentRoll === '/'){
    nextRoll = rollStack.pop(); 
    frameScore += (10 + gameScore(rollStack, previousRoll)); 
  } else if (currentRoll === 'X'){
    if (previousRoll === 'X'){
      return 10; 
    }
    frameScore += (10 + gameScore(rollStack, previousRoll, 'X') + gameScore(rollStack, nextPreviousRoll, 'X')); 
    console.log(frameScore);
  } 
  else {
    frameScore += parseInt(currentRoll); 
  }

  nextPreviousRoll = previousRoll;
  previousRoll = currentRoll;

  return frameScore + gameScore(rollStack, (rollStack.pop() || nextRoll), previousRoll, nextPreviousRoll); 
}
