import { useState } from 'react'
import Login from './components/Login'
import Modules from './components/Modules'
import MCQTest from './components/MCQTest'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState('modules') // 'modules' or 'test'
  const [selectedModule, setSelectedModule] = useState(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('modules')
    setSelectedModule(null)
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
