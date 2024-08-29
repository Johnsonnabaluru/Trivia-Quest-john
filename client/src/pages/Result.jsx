import { useContext, useEffect, useState } from 'react';
import QuizContext from '../QuizContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [highscore, setHighScore] = useState(localStorage.getItem('highScore'));
  const [score, scoreDispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (score === null) {
      navigate('/');
    } else if (score > highscore) {
      setHighScore(score);
      localStorage.setItem('highScore', JSON.stringify(score));
    }
  }, [score, highscore, navigate]);

  const goToMainMenu = () => {
    scoreDispatch({
      type: 'RESET_SCORE',
    });
    navigate('/');
  };

  const retakeQuiz = () => {
    scoreDispatch({
      type: 'RESET_SCORE',
    });
    navigate(-1);
  };

  const scorePercentage = Math.round((score / 10) * 100);
  const highScorePercentage = highscore === null ? 0 : Math.round((highscore / 10) * 100);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center my-5" style={{ color: '#FFFFFF' }}>
      <div className="h3" style={{ color: '#FFC107' }}>RESULT</div>
      <div
        className={`${
          scorePercentage > 40 ? 'bg-success' : 'bg-danger'
        } my-2 w-100 p-3 rounded-pill text-center`}
        style={{
          backgroundColor: scorePercentage > 40 ? '#4CAF50' : '#F44336',
          color: '#FFFFFF'
        }}
      >
        You scored {score} out of 10 ({scorePercentage}%)
      </div>
      <div className="my-2" style={{ color: '#FFC107' }}>
        Highscore: {highscore || 0} ({highScorePercentage}%)
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center my-3 w-100">
        <button
          className="btn w-25 mx-3"
          onClick={goToMainMenu}
          style={{ backgroundColor: '#03A9F4', color: '#FFFFFF' }}
        >
          Main Menu
        </button>
        <button
          className="btn w-25 mx-3"
          onClick={retakeQuiz}
          style={{ backgroundColor: '#03A9F4', color: '#FFFFFF' }}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
