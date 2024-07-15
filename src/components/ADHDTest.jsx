import React, { useState } from 'react';
import './ADHDTest.css';

const questions = [
  "I find it difficult finishing a task or project.",
  "I find it difficult to organise myself or a task.",
  "I find it difficult to remember appointments.",
  "If a task or project requires a lot of thought I will often delay in getting it started.",
  "I find it difficult to sit still and often fidget or squirm.",
  "I would describe myself as being 'on the go' and feel compelled to do things, as if driven by a 'motor'.",
  "I find it hard to remain focused in group settings.",
  "My mind feels very cluttered and it is hard for me to concentrate on one thing at a time.",
  "I make decisions quickly and fail to think through the consequences.",
  "I am often irritable, with a short fuse.",
  "I have mood swings, sometimes feeling quite high, other times low.",
  "I often miss what is being said to me in conversations.",
  "When someone asks me to complete an important task, I usually do so without being reminded.",
  "It's hard for me to get started on tasks that require a lot of focus and effort.",
  "I'm always losing my keys, my wallet, or other important items.",
  "Waiting in line is excruciating for me.",
  "When someone asks me a question, I often start answering before they've finished speaking.",
  "I often do whatever pops into my head first, even if it's not the best choice.",
  "I often get distracted by random thoughts that pop into my head.",
  "If someone else is talking or making noise while I'm working, it's hard for me to stay focused.",
  "I get easily frustrated or upset.",
  "I get so absorbed in my hobbies that I feel disconnected from the rest of the world.",
  "I usually pay my bills on time.",
  "I feel uncomfortable if I'm not moving, even just fidgeting my fingers or jiggling my leg.",
  "I often do things that I know are risky, or even dangerous.",
  "I find it easy to sit and do a quiet task, like reading a book or watching a movie.",
  "I often butt into conversations I'm not a part of."
];

const ADHDTest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setResult('');

    if (answers.some(answer => answer === '') || !gender || !age) {
      setError('Please answer all questions and provide your gender and age.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers, gender, age }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test');
      }

      const data = await response.json();
      setResult(data.result);
      
      // Navigate to the Game page after successful submission
      navigate('/game');
    } catch (error) {
      setError('An error occurred while submitting the test. Please try again.');
      navigate('/game');

    } finally {
      setIsSubmitting(false);
      navigate('/game');

    }
  };

  return (
    <div className="adhd-test-container">
      <h1>ADHD Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="demographics">
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)}  min="1" max="120" />
          </label>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            <div className="options">
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && <p className="result">{result}</p>}
    </div>
  );
};

export default ADHDTest;