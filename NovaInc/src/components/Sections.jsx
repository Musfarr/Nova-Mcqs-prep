import { useState, useEffect } from 'react';
import mcqsData from '../data/mcqs.json';

function Sections({ moduleId, onSelectSection, onBack }) {
  const [sections, setSections] = useState([]);
  
  useEffect(() => {
    const allMcqs = mcqsData[`module${moduleId}`] || [];
    const sectionSize = 20;
    const totalSections = Math.ceil(allMcqs.length / sectionSize);
    
    const generatedSections = Array.from({ length: totalSections }, (_, i) => ({
      id: i + 1,
      name: `Section ${i + 1}`,
      range: `${i * sectionSize + 1} - ${Math.min((i + 1) * sectionSize, allMcqs.length)}`,
      count: Math.min(sectionSize, allMcqs.length - (i * sectionSize)),
      time: 36 // minutes
    }));
    
    setSections(generatedSections);
  }, [moduleId]);

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
                ← Back to Modules
              </button>
              <h2 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                Module {moduleId} Sections
              </h2>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="fw-bold mb-2" style={{ color: '#1a1a1a' }}>Select a Section</h1>
          <p className="text-muted">Each section is timed (36 mins). Good luck!</p>
        </div>

        <div className="row g-4">
          {sections.map((section) => (
            <div key={section.id} className="col-md-6 col-lg-4">
              <div
                className="card h-100"
                style={{
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onSelectSection(section.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                      {section.name}
                    </h3>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {section.time} mins
                    </span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                      <small className="d-block text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Questions</small>
                      <span className="fs-5 fw-medium" style={{ color: '#1a1a1a' }}>{section.count}</span>
                    </div>
                    <div className="text-muted text-end">
                      <small className="d-block text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Range</small>
                      <span className="fs-5 fw-medium" style={{ color: '#1a1a1a' }}>{section.range}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sections;
