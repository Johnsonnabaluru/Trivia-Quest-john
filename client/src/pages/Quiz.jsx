import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, categories } from "../requests";
import { ProgressBar, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import Question from "../components/Question";
import QuizContext from "../QuizContext";

const Quiz = () => {
  const navigate = useNavigate();
  const { category, difficulty } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, scoreDispatch] = useContext(QuizContext);

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setIsAnswered(false);
  };

  const finishQuiz = () => {
    if (score === null) {
      scoreDispatch({ type: 'SET_SCORE', payload: 0 });
    }
    setIsAnswered(false);
    navigate('/results');
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['questions', category, difficulty],
    queryFn: () => getQuestions({ category, difficulty }),
  });

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-5">
        <Spinner animation="grow" style={{ color: '#4CAF50' }} />
        <div className="my-2 fs-5 lead" style={{ color: '#FFC107' }}>
          Loading questions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-5">
        <div className="my-2 fs-5 lead" style={{ color: '#F44336' }}>
          An Error Occurred
        </div>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: '#FF5722' }}
          onClick={() => location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  const questions = data?.results || [];

  if (questions.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-5">
        <div className="my-2 fs-5 lead" style={{ color: '#F44336' }}>
          No questions available for the selected category and difficulty.
        </div>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: '#FF5722' }}
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="container my-5">
        <div className="d-flex flex-column justify-content-start align-items-start">
          <div className="d-flex flex-row justify-content-between align-items-center w-100 my-2">
            <div style={{ backgroundColor: '#2196F3', padding: '10px', borderRadius: '5px' }}>
              {categories.find(cat => cat.value === Number(category))?.label}
            </div>
            <div style={{ backgroundColor: '#FFC107', padding: '10px', borderRadius: '5px' }}>
              {difficulty}
            </div>
          </div>
          <ProgressBar
            animated
            now={Math.round(((currentQuestion + 1) / questions.length) * 100)}
            className="w-100"
            style={{ backgroundColor: '#673AB7' }}
          />
          <span className="my-2">Question {currentQuestion + 1}/{questions.length}</span>
        </div>
        <div className="my-4 d-flex flex-column justify-content-center">
          <Question
            question={questions[currentQuestion]}
            setIsAnswered={setIsAnswered}
            isAnswered={isAnswered}
          />
          {questions.length === currentQuestion + 1 ? (
            <button
              className={`btn btn-primary align-self-end ${!isAnswered && 'disabled'}`}
              onClick={finishQuiz}
              style={{ backgroundColor: '#009688' }}
            >
              Finish
            </button>
          ) : (
            <button
              className={`btn btn-primary align-self-end ${!isAnswered && 'disabled'}`}
              onClick={nextQuestion}
              style={{ backgroundColor: '#03A9F4' }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
