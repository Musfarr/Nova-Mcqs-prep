function Modules({ onSelectModule, onLogout }) {
  const modules = [
    { id: 1, name: 'Module 1', description: 'Auto Body Repair Safety & Tools', available: true, count: 261 },
    { id: 2, name: 'Module 2', description: 'Coming Soon', available: false, count: 0 },
    { id: 3, name: 'Module 3', description: 'Coming Soon', available: false, count: 0 }
  ];

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="border-bottom" style={{ borderColor: '#e5e5e5' }}>
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>MCQ Prep</h2>
            <button
              onClick={onLogout}
              className="btn btn-outline-dark"
              style={{
                borderRadius: '8px',
                border: '2px solid #1a1a1a',
                padding: '8px 24px'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="fw-bold mb-2" style={{ color: '#1a1a1a' }}>Select a Module</h1>
          <p className="text-muted">Choose a module to start practicing MCQs</p>
        </div>

        <div className="row g-4">
          {modules.map((module) => (
            <div key={module.id} className="col-md-6 col-lg-4">
              <div
                className={`card h-100 ${module.available ? '' : 'opacity-50'}`}
                style={{
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  cursor: module.available ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => module.available && onSelectModule(module.id)}
                onMouseEnter={(e) => {
                  if (module.available) {
                    e.currentTarget.style.borderColor = '#1a1a1a';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                      {module.name}
                    </h3>
                    {module.available && (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#1a1a1a',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px'
                        }}
                      >
                        {module.count} MCQs
                      </span>
                    )}
                  </div>
                  <p className="text-muted mb-0">{module.description}</p>
                  {!module.available && (
                    <div className="mt-3">
                      <span
                        className="badge bg-secondary"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px'
                        }}
                      >
                        Not Available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modules;
