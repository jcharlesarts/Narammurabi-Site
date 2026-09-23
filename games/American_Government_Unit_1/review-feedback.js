/* Varied, question-type-aware feedback for Midterm Review. */
(function(root){
  'use strict';

  const banks={
    mc:[
      'Correct answer.',
      'You chose the correct answer.',
      'That choice is correct.',
      'You found the right answer.',
      'Correct choice.',
      'Yes, that answer matches.',
      'You selected the best answer.',
      'That is the right choice.',
      'You got it right.',
      'Good choice. That is correct.',
      'Your answer is correct.',
      'Exactly right.'
    ],
    order:[
      'Correct order.',
      'You put the items in the correct order.',
      'The sequence is correct.',
      'You arranged the events correctly.',
      'That order is right.',
      'Every item is in the right place.',
      'You built the correct sequence.',
      'The events are arranged correctly.',
      'You found the right order.',
      'Yes, the sequence matches.',
      'Your ordering is correct.',
      'Exactly the right order.'
    ],
    'text-100':[
      'Clear explanation.',
      'Your explanation matches the main idea.',
      'You explained the idea correctly.',
      'Your answer includes the important idea.',
      'You gave a complete explanation.',
      'Your reasoning is clear and correct.',
      'You connected the idea and the evidence.',
      'Your explanation is accurate.',
      'You supported your answer well.',
      'Your answer shows strong understanding.',
      'You stated and explained the main point.',
      'Your explanation is complete.'
    ],
    'text-50':[
      'You found part of the main idea.',
      'Your explanation includes some correct ideas.',
      'You are close. Add the missing detail.',
      'You explained one important part.',
      'Your answer has a good starting point.',
      'Part of your reasoning matches the model.',
      'You used some of the needed evidence.',
      'Your answer is partly correct.',
      'You identified an important idea.',
      'You made a useful connection.',
      'Your response shows some understanding.',
      'You have part of the explanation.'
    ],
    'text-0':[
      'This idea needs more practice.',
      'Review the model answer and try again later.',
      'Use the model answer to study this idea.',
      'Save this idea for another practice round.',
      'Look for the main idea in the model answer.',
      'Study the example, then try this idea again.',
      'This answer is marked for more practice.',
      'Compare your answer with the model closely.',
      'Review the key words before your next try.',
      'Return to this idea after more study.',
      'Use the lesson guide before trying again.',
      'Practice this explanation one more time.'
    ]
  };

  const decks=new Map(),last=new Map();

  function shuffled(items,random=Math.random){
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function bankKey(kind,earned){
    return kind==='text'?`text-${earned}`:kind;
  }

  function next(kind,earned,random=Math.random){
    const key=bankKey(kind,earned),bank=banks[key];
    if(!bank)throw new Error(`No feedback bank for ${key}`);
    let deck=decks.get(key);
    if(!deck?.length){
      deck=shuffled(bank,random);
      const previous=last.get(key);
      if(deck.length>1&&deck[deck.length-1]===previous){
        [deck[0],deck[deck.length-1]]=[deck[deck.length-1],deck[0]];
      }
      decks.set(key,deck);
    }
    const message=deck.pop();
    last.set(key,message);
    return message;
  }

  function reset(){decks.clear();last.clear();}

  const api={banks,next,reset};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.ReviewFeedback=api;
})(typeof window!=='undefined'?window:globalThis);
