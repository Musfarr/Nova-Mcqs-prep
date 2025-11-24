import { useState, useEffect } from 'react'
import Login from './components/Login'
import Modules from './components/Modules'
import MCQTest from './components/MCQTest'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'modules'
  })
  const [selectedModule, setSelectedModule] = useState(() => {
    const saved = localStorage.getItem('selectedModule')
    return saved ? parseInt(saved) : null
  })

  // Persist authentication state
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  // Persist current view
  useEffect(() => {
    localStorage.setItem('currentView', currentView)
  }, [currentView])

  // Persist selected module
  useEffect(() => {
    if (selectedModule) {
      localStorage.setItem('selectedModule', selectedModule)
    } else {
      localStorage.removeItem('selectedModule')
    }
  }, [selectedModule])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('modules')
    setSelectedModule(null)
    localStorage.clear()
  }

  const handleSelectModule = (moduleId) => {
    setSelectedModule(moduleId)
    setCurrentView('test')
  }

  const handleBackToModules = () => {
    setCurrentView('modules')
    setSelectedModule(null)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (currentView === 'test' && selectedModule) {
    return <MCQTest moduleId={selectedModule} onBack={handleBackToModules} />
  }

  return <Modules onSelectModule={handleSelectModule} onLogout={handleLogout} />
}

export default App
