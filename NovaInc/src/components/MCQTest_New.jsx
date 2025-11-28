import { useState, useEffect } from 'react';
import mcqsData from '../data/mcqs.json';

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to recover timer state if page refreshed
    // Note: This simple implementation resets on mount if we don't persist start time
    // For now, we'll just reset to duration. To make it persistent, we'd need to save startTime.
    return duration * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300; // Less than 5 mins

  return (
    <div 
      className={`fw-bold px-3 py-2 rounded ${isLowTime ? 'text-danger border border-danger' : 'text-dark border border-dark'}`}
      style={{ fontSize: '1.2rem' }}
    >
      Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

function MCQTest({ moduleId, sectionId, onBack }) {
  const storageKey = `mcq_module${moduleId}_section${sectionId}`;
  const sectionSize = 20;
  
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_answers`);
    return saved ? JSON.parse(saved) : {};
  });

  const [isTimeUp, setIsTimeUp] = useState(true);
  
  const allMcqs = mcqsData[`module${moduleId}`] || [];
  // Calculate range for this section
  const startIndex = (sectionId - 1) * sectionSize;
  const endIndex = Math.min(startIndex + sectionSize, allMcqs.length);
  const currentQuestions = allMcqs.slice(startIndex, endIndex);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`${storageKey}_answers`, JSON.stringify(userAnswers));
  }, [userAnswers, storageKey]);

  const handleAnswerSelect = (questionId, answer) => {
    if (isTimeUp) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleClearSection = () => {
    if (window.confirm('Are you sure you want to clear all answers in this section?')) {
      setUserAnswers({});
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    alert('Time is up! The test is now locked.');
  };

  const getAnswerClass = (questionId, optionLabel) => {
    const question = currentQuestions.find(q => q.id === questionId);
    if (!question) return '';

    const userAnswer = userAnswers[questionId];
    const correctAnswer = question.correctAnswer;

    if (!userAnswer) return '';

    if (optionLabel === correctAnswer) {
      return 'border-success bg-success bg-opacity-10';
    }

    if (optionLabel === userAnswer && userAnswer !== correctAnswer) {
      return 'border-danger bg-danger bg-opacity-10';
    }

    return '';
  };

  const getStats = () => {
    let correct = 0;
    let wrong = 0;

    currentQuestions.forEach(q => {
      const answer = userAnswers[q.id];
      if (!answer) return;

      if (answer === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    return { correct, wrong, total: currentQuestions.length };
  };

  const stats = getStats();

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="border-bottom sticky-top bg-white" style={{ borderColor: '#e5e5e5', zIndex: 1000 }}>
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <button
                onClick={onBack}
                className="btn btn-outline-dark"
                style={{
                  borderRadius: '8px',
                  border: '2px solid #1a1a1a',
                  padding: '8px 16px'
                }}
              >
                ← Back to Sections
              </button>
              <div>
                <h2 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                  Section {sectionId}
                </h2>
                <small className="text-muted">Module {moduleId}</small>
              </div>
            </div>
            
            {!isTimeUp && <Timer duration={1} onTimeUp={handleTimeUp} />}
            {isTimeUp && <div className="text-danger fw-bold border border-danger px-3 py-2 rounded">TIME UP</div>}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        {/* Stats Bar */}
        <div className="alert alert-light mb-4" style={{ borderRadius: '12px', border: '2px solid #e5e5e5' }}>
          <div className="row text-center">
            <div className="col-4">
              <div className="fw-bold" style={{ color: '#1a1a1a', fontSize: '24px' }}>{stats.total}</div>
              <div className="text-muted small">Total Questions</div>
            </div>
            <div className="col-4">
              <div className="fw-bold text-success" style={{ fontSize: '24px' }}>{stats.correct}</div>
              <div className="text-muted small">Correct</div>
            </div>
            <div className="col-4">
              <div className="fw-bold text-danger" style={{ fontSize: '24px' }}>{stats.wrong}</div>
              <div className="text-muted small">Wrong</div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="mb-4">
          {currentQuestions.map((question, index) => (
            <div
              key={question.id}
              className="card mb-4"
              style={{
                border: '2px solid #e5e5e5',
                borderRadius: '12px',
                opacity: isTimeUp ? 0.8 : 1,
                pointerEvents: isTimeUp ? 'none' : 'auto'
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex gap-3 mb-3">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    Q{startIndex + index + 1}
                  </span>
                  <h5 className="fw-medium mb-0" style={{ color: '#1a1a1a' }}>
                    {question.question}
                  </h5>
                </div>

                <div className="d-grid gap-2">
                  {question.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 ${getAnswerClass(question.id, option.label)}`}
                      style={{
                        border: userAnswers[question.id] === option.label
                          ? '2px solid #1a1a1a'
                          : '2px solid #e5e5e5',
                        borderRadius: '8px',
                        cursor: isTimeUp ? 'default' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleAnswerSelect(question.id, option.label)}
                      onMouseEnter={(e) => {
                        if (!isTimeUp) e.currentTarget.style.borderColor = '#666';
                      }}
                      onMouseLeave={(e) => {
                        if (!isTimeUp) e.currentTarget.style.borderColor = userAnswers[question.id] === option.label ? '#1a1a1a' : '#e5e5e5';
                      }}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <span className="fw-bold" style={{ color: '#1a1a1a', minWidth: '24px' }}>
                          {option.label}.
                        </span>
                        <span style={{ color: '#1a1a1a' }}>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center mb-5">
          {!isTimeUp && (
            <button
              className="btn btn-outline-danger"
              onClick={handleClearSection}
              style={{
                borderRadius: '8px',
                border: '2px solid #dc3545',
                padding: '12px 32px'
              }}
            >
              Clear Section Answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MCQTest;
