'use strict';

// const score = require('../bowling');
const score = require('../bowling-stack-recursion');

const { expect } = require('chai');

describe('score', () => {
  it.only('should return 0 if all gutter balls rolled', () => {
    expect(score('-- -- -- -- -- -- -- -- -- --')).to.equal(0);
  });
  it.only('should return 10 if 1 pin per frame was destroyed', () => {
    expect(score('1- 1- 1- 1- 1- 1- 1- 1- 1- 1-')).to.equal(10);
  });
  it.only('should return correct score if a spare is present and next frame is gutters', () => {
    expect(score('1/ -- -- -- -- -- -- -- -- --')).to.equal(10);
  });
  it.only('should return correct score if a spare is present and next frame is greater than 0', () => {
    expect(score('1/ 11 -- -- -- -- -- -- -- --')).to.equal(13);
  });
  it.only('should return correct score if a spare is present and next frame is a spare', () => {
    expect(score('1/ 1/ 11 -- -- -- -- -- -- --')).to.equal(24);
  });
  it.only('should return correct score if a strike is present and next frame is gutters', () => {
    expect(score('X -- -- -- -- -- -- -- -- --')).to.equal(10);
  });
  it.only('should return correct score if a strike is present and next frame is greater than 0', () => {
    expect(score('X 11 -- -- -- -- -- -- -- --')).to.equal(14);
  });
  it.only('should return correct score if a strike is present and next frame is a strike', () => {
    expect(score('X X 11 -- -- -- -- -- -- --')).to.equal(35);
  });
  it.only('should return correct score if a strike is present and next frame is a spare', () => {
    expect(score('X 1/ -- -- -- -- -- -- -- --')).to.equal(30);
  });
  it.only('should return correct score if every frame is a spare plus extra roll in final frame', () => {
    expect(score('5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5')).to.equal(150);
  });
  it.only('should return correct score if every frame is a strike with an additional two strikes in the final frame', () => {
    expect(score('X X X X X X X X X X X X')).to.equal(300);
  });
  it.only('should return the correct score with a mix of strikes, spares, and gutters', () => {
    expect(score('8/ 54 9- X X 5/ 53 63 9/ 9/X')).to.equal(149);
  });
});
