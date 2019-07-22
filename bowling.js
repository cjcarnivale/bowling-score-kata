'use strict';

module.exports = function score(frames) {
  return frames.split(' ').reduce((acc, frame, i, frameArr) => {
    const frameScore = scoreFrame(frame, i, frameArr);
    return acc + frameScore;
  }, 0);
};

function scoreFrame(frame, i, frameArr) {
  let score = 0;
  if (frame[0] === 'X') {
    score = calculateStrike(i, frameArr);
  } else if (frame[1] === '/') {
    score = calculateSpare(i, frameArr);
  } else {
    score = simpleScore(frame[0]) + simpleScore(frame[1]);
  }
  return score;
}

function calculateStrike(i, frameArr) {
  let bonus = 0;
  //Final frame calculation
  if (i === 9) {
    bonus = simpleScore(frameArr[i][1]) + simpleScore(frameArr[i][2]);
  } else {
    const nextRoll = frameArr[i + 1][0];
    //Second next roll could be either in the next frame or the frame after
    const secondNextRoll = frameArr[i + 1][1] || frameArr[i + 2][0];
    //In the case that a strike is followed by a spare, to get the value
    //of the second roll, the first roll must be passed down.
    bonus = simpleScore(nextRoll) + simpleScore(secondNextRoll, frameArr[i + 1][0]);
  }
  return 10 + bonus;
}

function calculateSpare(i, frameArr) {
  let bonus = 0;
  //Final frame calculation
  if (i === 9) {
    bonus = simpleScore(frameArr[i][2]);
  } else {
    bonus = simpleScore(frameArr[i + 1][0]);
  }
  return 10 + bonus;
}

function simpleScore(roll, prevRoll) {
  if (roll === 'X') {
    return 10;
  } else if (roll === '/') {
    return 10 - parseInt(prevRoll);
  } else if (roll === '-') {
    return 0;
  } else {
    return parseInt(roll);
  }
}
