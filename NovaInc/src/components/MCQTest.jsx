import { useState, useEffect } from 'react';
import mcqsData from '../data/mcqs.json';

function MCQTest({ moduleId, onBack }) {
  const storageKey = `mcq_module${moduleId}`;
  
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_currentPage`);
    return saved ? parseInt(saved) : 1;
  });
  
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_answers`);
    return saved ? JSON.parse(saved) : {};
  });
  
  const questionsPerPage = 30;

  const mcqs = mcqsData[`module${moduleId}`] || [];
  const totalPages = Math.ceil(mcqs.length / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = mcqs.slice(startIndex, endIndex);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`${storageKey}_currentPage`, currentPage);
  }, [currentPage, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}_answers`, JSON.stringify(userAnswers));
  }, [userAnswers, storageKey]);

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleClearPage = () => {
    if (window.confirm('Are you sure you want to clear all answers on this page?')) {
      const currentPageQuestions = currentQuestions.map(q => q.id);
      const newAnswers = { ...userAnswers };
      
      currentPageQuestions.forEach(id => {
        delete newAnswers[id];
      });
      
      setUserAnswers(newAnswers);
    }
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
    const currentPageQuestions = currentQuestions.map(q => q.id);
    let correct = 0;
    let wrong = 0;

    currentPageQuestions.forEach(id => {
      const question = mcqs.find(q => q.id === id);
      const answer = userAnswers[id];

      if (!question || !answer) {
        return;
      }

      if (answer === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    return { correct, wrong, total: currentPageQuestions.length };
  };

  const isPageComplete = (page) => {
    const start = (page - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    const pageQuestions = mcqs.slice(start, end);
    if (pageQuestions.length === 0) return false;
    return pageQuestions.every(q => userAnswers[q.id]);
  };

  const stats = getStats();

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="border-bottom sticky-top bg-white" style={{ borderColor: '#e5e5e5' }}>
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
                ← Back
              </button>
              <h2 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                Module {moduleId}
              </h2>
            </div>
            <div className="text-muted">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        {/* Stats Bar */}
        {stats && (
          <div className="alert alert-light mb-4" style={{ borderRadius: '12px', border: '2px solid #e5e5e5' }}>
            <div className="row text-center">
              <div className="col-4">
                <div className="fw-bold" style={{ color: '#1a1a1a', fontSize: '24px' }}>{stats.total}</div>
                <div className="text-muted small">Total</div>
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
        )}

        {/* Questions */}
        <div className="mb-4">
          {currentQuestions.map((question, index) => (
            <div
              key={question.id}
              className="card mb-4"
              style={{
                border: '2px solid #e5e5e5',
                borderRadius: '12px'
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
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleAnswerSelect(question.id, option.label)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#666';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = userAnswers[question.id] === option.label ? '#1a1a1a' : '#e5e5e5';
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
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              borderRadius: '8px',
              border: '2px solid #1a1a1a',
              padding: '12px 24px'
            }}
          >
            ← Previous
          </button>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-danger"
              onClick={handleClearPage}
              style={{
                borderRadius: '8px',
                border: '2px solid #dc3545',
                padding: '12px 24px'
              }}
            >
              Clear Page
            </button>
          </div>

          <button
            className="btn btn-outline-dark"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            style={{
              borderRadius: '8px',
              border: '2px solid #1a1a1a',
              padding: '12px 24px'
            }}
          >
            Next →
          </button>
        </div>

        {/* Page Indicators */}
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`btn ${currentPage === page ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setCurrentPage(page)}
              style={{
                borderRadius: '6px',
                width: '40px',
                height: '40px',
                padding: '0',
                fontSize: '14px',
                position: 'relative'
              }}
            >
              {page}
              {isPageComplete(page) && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#28a745',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MCQTest;
