'use strict';

const score = require('../bowling');

const { expect } = require('chai');

describe('score', () => {
  it('should return 0 if all gutter balls rolled', () => {
    expect(score('-- -- -- -- -- -- -- -- -- --')).to.equal(0);
  });
  it('should return 10 if 1 pin per frame was destroyed', () => {
    expect(score('1- 1- 1- 1- 1- 1- 1- 1- 1- 1-')).to.equal(10);
  });
  it('should return correct score if a spare is present and next frame is gutters', () => {
    expect(score('1/ -- -- -- -- -- -- -- -- --')).to.equal(10);
  });
  it('should return correct score if a spare is present and next frame is greater than 0', () => {
    expect(score('1/ 11 -- -- -- -- -- -- -- --')).to.equal(13);
  });
  it('should return correct score if a spare is present and next frame is a spare', () => {
    expect(score('1/ 1/ 11 -- -- -- -- -- -- --')).to.equal(24);
  });
  it('should return correct score if a strike is present and next frame is gutters', () => {
    expect(score('X -- -- -- -- -- -- -- -- --')).to.equal(10);
  });
  it('should return correct score if a strike is present and next frame is greater than 0', () => {
    expect(score('X 11 -- -- -- -- -- -- -- --')).to.equal(14);
  });
  it('should return correct score if a strike is present and next frame is a strike', () => {
    expect(score('X X 11 -- -- -- -- -- -- --')).to.equal(35);
  });
  it('should return correct score if a strike is present and next frame is a spare', () => {
    expect(score('X 1/ -- -- -- -- -- -- -- --')).to.equal(30);
  });
  it('should return correct score if every frame is a spare plus extra roll in final frame', () => {
    expect(score('5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5')).to.equal(150);
  });
  it('should return correct score if every frame is a strike with an additional two strikes in the final frame', () => {
    //If three strikes in the final frame are considered as counting for two
    //additional frames, a for loop has to be used instead of a reduce to break
    //the loop early as you do not want to score them as seperate frames.
    expect(score('X X X X X X X X X XXX')).to.equal(300);
  });
  it('should return the correct score with a mix of strikes, spares, and gutters', () => {
    expect(score('8/ 54 9- X X 5/ 53 63 9/ 9/X')).to.equal(149);
  });
});
