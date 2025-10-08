// src/components/layout/Sidebar.jsx
import { 
  Mail, User, Building, Users, DollarSign, List, FileText 
} from 'lucide-react'

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Building },
    { id: 'users', label: 'Users', icon: User },
    { id: 'organizations', label: 'Organizations', icon: Users },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'loanees', label: 'Loanees', icon: DollarSign },
    { id: 'loans', label: 'Loan Requests', icon: List },
    { id: 'repayments', label: 'Loan Repayments', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        Coptic Chama
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveView(item.id); }}
              className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                activeView === item.id ? 'bg-gray-900' : 'hover:bg-gray-700'
              }`}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar