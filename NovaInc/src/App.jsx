import { useState, useEffect } from 'react'
import Login from './components/Login'
import Modules from './components/Modules'
import Sections from './components/Sections'
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
  const [selectedSection, setSelectedSection] = useState(() => {
    const saved = localStorage.getItem('selectedSection')
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

  // Persist selected section
  useEffect(() => {
    if (selectedSection) {
      localStorage.setItem('selectedSection', selectedSection)
    } else {
      localStorage.removeItem('selectedSection')
    }
  }, [selectedSection])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('modules')
    setSelectedModule(null)
    setSelectedSection(null)
    localStorage.clear()
  }

  const handleSelectModule = (moduleId) => {
    setSelectedModule(moduleId)
    setCurrentView('sections')
  }

  const handleSelectSection = (sectionId) => {
    setSelectedSection(sectionId)
    setCurrentView('test')
  }

  const handleBackToModules = () => {
    setCurrentView('modules')
    setSelectedModule(null)
    setSelectedSection(null)
  }

  const handleBackToSections = () => {
    setCurrentView('sections')
    setSelectedSection(null)
  }

  const handleNextSection = () => {
    setSelectedSection(prev => prev + 1)
    window.scrollTo(0, 0)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (currentView === 'test' && selectedModule && selectedSection) {
    return (
      <MCQTest 
        key={`${selectedModule}-${selectedSection}`}
        moduleId={selectedModule} 
        sectionId={selectedSection}
        onBack={handleBackToSections}
        onNextSection={handleNextSection}
      />
    )
  }

  if (currentView === 'sections' && selectedModule) {
    return (
      <Sections 
        moduleId={selectedModule} 
        onSelectSection={handleSelectSection} 
        onBack={handleBackToModules} 
      />
    )
  }

  return <Modules onSelectModule={handleSelectModule} onLogout={handleLogout} />
}

export default App
