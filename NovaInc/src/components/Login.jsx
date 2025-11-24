import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Static login credentials
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin/admin');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div 
              className="card shadow-sm"
              style={{
                border: '2px solid #e5e5e5',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <h1 className="fw-bold mb-2" style={{ color: '#1a1a1a' }}>MCQ Prep</h1>
                  <p className="text-muted">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label fw-medium" style={{ color: '#1a1a1a' }}>
                  Username
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  style={{
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-medium" style={{ color: '#1a1a1a' }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert" style={{ borderRadius: '8px' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark btn-lg w-100 fw-medium"
                style={{
                  borderRadius: '8px',
                  padding: '12px',
                  backgroundColor: '#1a1a1a',
                  border: 'none'
                }}
              >
                Sign In
              </button>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      Demo credentials: admin / admin
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
