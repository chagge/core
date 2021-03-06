'use strict';

import { expect } from 'chai';
import compromise from '../../src/processor/compromise';

describe('Processor: compromise', () => {

  let state;
  beforeEach( () => state = {})

  it('Up & Running', () => {
    expect(compromise).to.be.ok;
  });

  it('Compose properties {type, topics}', () => {
    state.sentence = 'Hello world';
    compromise(state);
    expect(state).to.have.all.keys('sentence', 'type', 'topics');
  });

  it('Detect topics in a sentence', () => {
    state.sentence = 'I wanna visit London and Madrid next week';
    compromise(state);
    expect(state.topics.length).equal(2);
    expect(state.topics[0]).equal('london');
    expect(state.topics[1]).equal('madrid');
  });

  it('Detect an declarative sentence', () => {
    state.sentence = 'Hello world';
    compromise(state);
    expect(state.type).equal('declarative');
  });

  it('Detect an interrogative sentence', () => {
    state.sentence = 'Where you wanna go tonight?';
    compromise(state);
    expect(state.type).equal('interrogative');
  });

  it('Detect an exclamative sentence', () => {
    state.sentence = 'I hate you!';
    compromise(state);
    expect(state.type).equal('exclamative');
  });

});
