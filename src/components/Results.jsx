import React from 'react';
import { Link } from 'react-router-dom';

const GeneralInfo = () => {
  return (
    <div>
      <h1>ADHD Information</h1>
      <p>
        Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder 
        characterized by inattention, hyperactivity, and impulsivity.
      </p>
      <p>
        Symptoms often begin in childhood and can persist into adulthood. ADHD can affect 
        a person's work, school, and personal relationships.
      </p>
      <Link to="/test">
        <button>Start ADHD Test</button>
      </Link>
    </div>
  );
};

export default GeneralInfo;