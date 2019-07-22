'use strict'; 

const Stack = require('./stack');

module.exports = function main(frames){
  let rollStack = new Stack;
  frames.split('').filter(roll => roll !== ' ').forEach(roll => {
    rollStack.push(roll);
  });
  return gameScore(rollStack);
};

function gameScore(rollStack, previousRoll, nextPreviousRoll){
  //Base case
  if(rollStack.isEmpty()){
    return 0; 
  }
  rollStack.pop(); 
  return 0 + gameScore(rollStack); 
}
