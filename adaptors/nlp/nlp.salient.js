'use strict';

import Hope from 'hope';
import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
// const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

export default (request, ava) => {
  let promise = new Hope.Promise();

  const time = new Date();
  request.nlp.salient = {
    tokens: tokenizer.tokenize(request.sentence),
    // glossary: glossary.parse(request.sentence),
    sentiment: analyser.classify(request.sentence),
    ms: (new Date() - time)
  };
  promise.done(null, request);

  return promise;
};