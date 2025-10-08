// src/pages/Loanees.jsx
import { useState, useEffect, useCallback } from 'react'
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'

const LoaneeManagement = () => {
  const [loanees, setLoanees] = useState([])
  const [organizationId] = useState('org_1') // Remove setOrganizationId since it's not used

  // Use useCallback to memoize the function
  const fetchLoanees = useCallback(async () => {
    const data = await API.findLoaneeByOrganizationId(organizationId)
    setLoanees(data)
  }, [organizationId])

  useEffect(() => {
    fetchLoanees()
  }, [fetchLoanees]) // Add fetchLoanees to dependency array
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Loanee Management</h2>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">
          Loanees in Organization: {organizationId}
        </h3>
        <Table headers={['Loanee ID', 'Name', 'Status']}>
          {loanees.map(l => (
            <tr key={l.loaneeId}>
              <td className="px-6 py-4 whitespace-nowrap">{l.loaneeId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{l.firstName} {l.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}

export default LoaneeManagement