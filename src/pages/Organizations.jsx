// src/pages/Organizations.jsx
import { useState } from 'react'
import { Search, PlusCircle } from 'lucide-react'
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const OrganizationManagement = () => {
  const [view, setView] = useState('search')
  const [organization, setOrganization] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const orgData = Object.fromEntries(formData.entries())
    orgData.address = JSON.parse(orgData.address)
    orgData.phone = JSON.parse(orgData.phone)
    const newOrg = await API.createOrganization(orgData)
    alert(`Organization created with ID: ${newOrg.organizationId}`)
    setOrganization(newOrg)
    setView('details')
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const orgId = e.target.organizationId.value
    const result = await API.findOrganizationById(orgId)
    setOrganization(result)
    setView('details')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Organization Management</h2>
        {view !== 'search' && (
          <Button 
            onClick={() => setView('search')} 
            className="bg-gray-600 hover:bg-gray-700"
          >
            Back
          </Button>
        )}
      </div>
      
      {view === 'search' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Organization</h3>
            <form onSubmit={handleSearch} className="flex items-end gap-2">
              <div className="flex-grow">
                <Input 
                  label="Organization ID" 
                  name="organizationId" 
                  required 
                />
              </div>
              <Button type="submit">
                <Search className="inline w-5 h-5 mr-2" /> 
                Find
              </Button>
            </form>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Organization</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input label="Name" name="name" required />
              <Input label="Email" name="email" type="email" required />
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
              <Button type="submit">
                <PlusCircle className="inline w-5 h-5 mr-2" /> 
                Create
              </Button>
            </form>
          </Card>
        </div>
      )}
      
      {view === 'details' && organization && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Organization Details</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(organization, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  )
}

export default OrganizationManagement