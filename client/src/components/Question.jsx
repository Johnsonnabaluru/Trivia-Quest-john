import { useContext, useEffect, useState } from 'react';
import QuizContext from '../QuizContext';

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Question = ({ question, setIsAnswered, isAnswered }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [score, scoreDispatch, options, optionsDispatch] = useContext(QuizContext);

  useEffect(() => {
    if (question) {
      const shuffledOptions = shuffle([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);
      optionsDispatch({
        type: 'SET_OPTIONS',
        payload: shuffledOptions,
      });
    }
  }, [question, optionsDispatch]);

  const selectOption = (opt) => {
    setSelectedOption(opt);
    if (opt === question.correct_answer) {
      scoreDispatch({
        type: 'SET_SCORE',
        payload: score + 1,
      });
    }
    setIsAnswered(true);
  };

  const displayedOptions = options || [];
  
  return (
    <div>
      <div className="fs-4 fw-bold lead" style={{ color: '#FFFFFF' }}>
        <div dangerouslySetInnerHTML={{ __html: question?.question }} />
      </div>
      <div className="list-group my-3">
        {displayedOptions.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={`list-group-item list-group-item-action my-1 rounded-pill ${
              isAnswered ? (
                opt === question.correct_answer ? 'bg-success border border-success text-white' :
                opt === selectedOption && opt !== question.correct_answer ? 'bg-danger border border-danger text-white' : ''
              ) : ''
            }`}
            disabled={isAnswered}
            onClick={() => !isAnswered && selectOption(opt)}
            style={{ backgroundColor: isAnswered ? '#343A40' : '#343A40', color: '#FFFFFF' }}
          >
            <div dangerouslySetInnerHTML={{ __html: opt }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
