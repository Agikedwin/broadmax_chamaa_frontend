// src/App.jsx
import { useState } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Organizations from './pages/Organizations'
import Members from './pages/Members'
import Loanees from './pages/Loanees'
import Loans from './pages/Loans'
import Repayments from './pages/Repayments'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [memberUserData, setMemberUserData] = useState(null)

  // Function to reset member user data
  const resetMemberUserData = () => {
    setMemberUserData(null)
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'users': 
        return <Users setActiveView={setActiveView} setMemberUserData={setMemberUserData} />;
      case 'organizations': 
        return <Organizations />;
      case 'members': 
        return <Members 
                 memberUserData={memberUserData} 
                 resetMemberUserData={resetMemberUserData} 
               />;
      case 'loanees': 
        return <Loanees />;
      case 'loans': 
        return <Loans />;
      case 'repayments': 
        return <Repayments />;
      case 'dashboard':
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderActiveView()}
    </Layout>
  )
}

export default App