// src/pages/Dashboard.jsx
import { Building, User, Users, DollarSign, List, FileText } from 'lucide-react'
import Card from '../components/ui/Card'

const Dashboard = ({ setActiveView }) => {
  // eslint-disable-next-line no-unused-vars
  const DashboardCard = ({ title, icon: Icon, onClick }) => (
    <Card 
      className="hover:shadow-lg hover:border-blue-500 border-2 border-transparent transition-all cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Click to manage</p>
        </div>
      </div>
    </Card>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Coptic Chama Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Manage Users" 
          icon={User} 
          onClick={() => setActiveView('users')} 
        />
        <DashboardCard 
          title="Manage Organizations" 
          icon={Building} 
          onClick={() => setActiveView('organizations')} 
        />
        <DashboardCard 
          title="Manage Members" 
          icon={Users} 
          onClick={() => setActiveView('members')} 
        />
        <DashboardCard 
          title="Manage Loanees" 
          icon={DollarSign} 
          onClick={() => setActiveView('loanees')} 
        />
        <DashboardCard 
          title="View Loans" 
          icon={List} 
          onClick={() => setActiveView('loans')} 
        />
        <DashboardCard 
          title="View Repayments" 
          icon={FileText} 
          onClick={() => setActiveView('repayments')} 
        />
      </div>
    </div>
  )
}

export default Dashboard