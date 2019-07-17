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
  it('should return correct score if a spare is present and next frame is a spare', () => {
    expect(score('1/ 1/ 11 -- -- -- -- -- -- --')).to.equal(24);
  });
});
