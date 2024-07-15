import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneralInfo.css';

const GeneralInfo = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/adhd-test');
  };

  return (
    <div className="adhd-info-container">
      <h1>ADHD Information</h1>
      <div className="info-section">
        <h2>What is ADHD?</h2>
        <p>
          Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder 
          characterized by inattention, hyperactivity, and impulsivity.
        </p>
        <p>
          Symptoms often begin in childhood and can persist into adulthood. ADHD can affect 
          a person's work, school, and personal relationships.
        </p>
      </div>
      <div className="info-section">
        <h2>Common Symptoms</h2>
        <ul>
          <li>Difficulty focusing on tasks</li>
          <li>Easily distracted</li>
          <li>Forgetfulness in daily activities</li>
          <li>Fidgeting or squirming</li>
          <li>Excessive talking</li>
          <li>Difficulty waiting for one's turn</li>
        </ul>
      </div>
      <div className="info-section">
        <h2>Treatment Options</h2>
        <p>
          ADHD is typically treated with a combination of medication, therapy, and lifestyle changes.
          Common treatments include:
        </p>
        <ul>
          <li>Stimulant medications</li>
          <li>Non-stimulant medications</li>
          <li>Behavioral therapy</li>
          <li>Cognitive-behavioral therapy (CBT)</li>
          <li>Educational support</li>
        </ul>
      </div>
      <button className="start-test-button" onClick={handleStartTest}>
        Start ADHD Test
      </button>
    </div>
  );
};

export default GeneralInfo;