// src/pages/Menu.js
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { categories, difficulty } from '../requests';

const Menu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
  });

  const selectCategory = (event) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const selectDifficulty = (event) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: event.target.value,
    }));
  };

  const startQuiz = (event) => {
    event.preventDefault();
    if (formData.category && formData.difficulty) {
      navigate(`/quiz/${formData.category}/${formData.difficulty}`);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-start justify-content-center w-100 py-5" style={{ color: '#FFFFFF' }}>
      <Form
        className="my-2 d-flex flex-column align-items-center justify-content-center"
        onSubmit={startQuiz}
      >
        <div>
          <div className="h3 my-3" style={{ color: '#FFC107' }}>Select Category</div>
          {categories.map((cat) => (
            <Form.Check
              key={cat.value}
              type="radio"
              id={cat.value}
              label={cat.label}
              name="category"
              onChange={selectCategory}
              value={cat.value}
              style={{ color: '#4CAF50' }}
            />
          ))}
        </div>

        <div>
          <div className="h3 my-3" style={{ color: '#FFC107' }}>Select Difficulty</div>
          {difficulty.map((option) => (
            <Form.Check
              key={option}
              type="radio"
              id={option}
              label={option}
              name="difficulty"
              className="text-capitalize"
              onChange={selectDifficulty}
              value={option}
              style={{ color: '#4CAF50' }}
            />
          ))}
        </div>

        <button
          className={`btn w-100 my-3 ${!formData.category || !formData.difficulty ? 'disabled' : ''}`}
          style={{ backgroundColor: '#03A9F4', color: '#FFFFFF' }}
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Menu;
