// src/pages/Members.jsx
import { useState, useEffect, useCallback } from 'react'
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Table from '../components/ui/Table'

const MemberManagement = ({ memberUserData, resetMemberUserData }) => {
  const [members, setMembers] = useState([])
  const [organizationId] = useState('org_1')
  const [showNotification, setShowNotification] = useState(false)
  
  // Set up form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '{"postalCode": "00100", "town": "Nairobi"}',
    phone: '{"countryCode": "+254", "phoneNumber": ""}',
    organizationId: organizationId,
    userId: ''
  })

  // Show notification when memberUserData changes
  useEffect(() => {
    if (memberUserData) {
      setShowNotification(true)
      setFormData({
        firstName: memberUserData.firstName || '',
        lastName: memberUserData.lastName || '',
        email: memberUserData.email || '',
        address: memberUserData.address ? JSON.stringify(memberUserData.address) : '{"postalCode": "00100", "town": "Nairobi"}',
        phone: memberUserData.phone ? JSON.stringify(memberUserData.phone) : '{"countryCode": "+254", "phoneNumber": ""}',
        organizationId: organizationId,
        userId: memberUserData.userId || ''
      })
    }
  }, [memberUserData, organizationId])

  const fetchMembers = useCallback(async () => {
    const data = await API.findMemberByOrganizationId(organizationId)
    setMembers(data)
  }, [organizationId])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const handleCreateMember = async (e) => {
    e.preventDefault()
    const data = { ...formData }
    
    // Parse JSON fields if they exist
    if (data.address) data.address = JSON.parse(data.address)
    if (data.phone) data.phone = JSON.parse(data.phone)
    
    // If we have a userId (from the Add as Member feature), use the createMemberFromUser API
    if (data.userId) {
      await API.createMemberFromUser(data)
    } else {
      // Otherwise, use the regular createMember API
      await API.createMember(data)
    }
    
    fetchMembers()
    
    // Reset form after successful creation
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '{"postalCode": "00100", "town": "Nairobi"}',
      phone: '{"countryCode": "+254", "phoneNumber": ""}',
      organizationId: organizationId,
      userId: ''
    })
    
    // Hide notification and reset member user data
    setShowNotification(false)
    if (resetMemberUserData) {
      resetMemberUserData()
    }
  }

  // Update form fields when user types
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Member Management</h2>
      
      {/* Show notification if user data was passed from Users page */}
      {showNotification && memberUserData && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-medium">
            User data loaded: {memberUserData.firstName} {memberUserData.lastName}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            You can review and modify the information below before creating the member.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">
            {memberUserData ? 'Create Member from User' : 'Create New Member'}
          </h3>
          <form onSubmit={handleCreateMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="First Name" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleInputChange}
                required 
              />
              <Input 
                label="Last Name" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <Input 
              label="Email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Address (JSON)" 
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
                required 
              />
              <Input 
                label="Phone (JSON)" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <Input 
              label="Organization ID" 
              name="organizationId" 
              value={formData.organizationId}
              onChange={handleInputChange}
              required 
            />
            
            {/* Hidden field for userId if it exists */}
            {formData.userId && (
              <Input 
                type="hidden"
                name="userId" 
                value={formData.userId}
              />
            )}
            
            <Button type="submit">
              {memberUserData ? 'Create Member from User' : 'Create Member'}
            </Button>
          </form>
        </Card>
      </div>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Members in Organization: {organizationId}
        </h3>
        <Table headers={['Name', 'Email', 'Type', 'Status']}>
          {members.map(m => (
            <tr key={m.memberId}>
              <td className="px-6 py-4 whitespace-nowrap">{m.firstName} {m.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{m.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{m.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}

export default MemberManagement