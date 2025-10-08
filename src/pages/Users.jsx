// src/pages/Users.jsx
import { useState, useEffect, useCallback } from 'react'
import { PlusCircle, UserPlus } from 'lucide-react' // Added UserPlus icon
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Table from '../components/ui/Table'

const UserManagement = ({ setActiveView, setMemberUserData }) => {
  const [users, setUsers] = useState([])
  const [view, setView] = useState('list')
  const [selectedUser, setSelectedUser] = useState(null)
  const [organizationId] = useState('org_1')

  const fetchUsers = useCallback(async () => {
    const data = await API.findUserByOrganizationId(organizationId)
    setUsers(data)
  }, [organizationId])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleCreateUser = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    userData.address = JSON.parse(userData.address)
    userData.phone = JSON.parse(userData.phone)
    await API.createUser(userData)
    fetchUsers()
    setView('list')
  }
  
  const handleViewDetails = async (userId) => {
    const user = await API.findUserById(userId)
    setSelectedUser(user)
    setView('details')
  }

  // New function to handle adding user as member
  const handleAddAsMember = (user) => {
    // Store user data to pass to members page
    const userData = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Include other relevant user data
      ...user
    }
    
    // Pass the user data to App component and navigate to members page
    if (setMemberUserData) {
      setMemberUserData(userData)
    }
    setActiveView('members')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        {view === 'list' && (
          <Button onClick={() => setView('create')}>
            <PlusCircle className="inline w-5 h-5 mr-2" /> Create User
          </Button>
        )}
        {view !== 'list' && (
          <Button onClick={() => setView('list')} className="bg-gray-600 hover:bg-gray-700">
            Back to List
          </Button>
        )}
      </div>

      {view === 'list' && (
        <Card>
          <Table headers={['Name', 'Email', 'Role', 'Actions', 'Add as Member']}>
            {users.map(user => (
              <tr key={user.userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleViewDetails(user.userId); }} 
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Details
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button 
                    onClick={() => handleAddAsMember(user)} 
                    className="bg-green-600 hover:bg-green-700 text-xs py-1 px-2"
                  >
                    <UserPlus className="inline w-4 h-4 mr-1" />
                    Add Member
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      )}

      {view === 'create' && (
        <Card>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="First Name" name="firstName" required />
                <Input label="Middle Name" name="middleName" />
                <Input label="Last Name" name="lastName" required />
            </div>
            <Input label="Email" name="email" type="email" required />
            <Input label="Document Number" name="documentNumber" required />
            <Input 
              label="Address (JSON)" 
              name="address" 
              defaultValue='{"postalCode": "00100", "town": "Nairobi", "postalAddress": "", "phone": ""}' 
              required 
            />
            <Input 
              label="Phone (JSON)" 
              name="phone" 
              defaultValue='{"countryCode": "+254", "phoneNumber": ""}' 
              required 
            />
            <Input 
              label="Organization ID" 
              name="organizationId" 
              defaultValue={organizationId} 
              required 
            />
            <Input label="Role" name="role" defaultValue="User" required />
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      )}

      {view === 'details' && selectedUser && (
        <Card>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(selectedUser, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  )
}

export default UserManagement