// src/pages/Loans.jsx
import { useState, useEffect } from 'react'
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'

const LoanRequestView = () => {
  const [loans, setLoans] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.getLoans()
      setLoans(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Loan Requests</h2>
      
      <Card>
        <Table headers={['Loanee', 'Amount Requested', 'Amount Disbursed', 'Status', 'Request Date']}>
          {loans.map(loan => (
            <tr key={loan.id} className="border-b border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {loan.loanee.user.firstName} {loan.loanee.user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {loan.amountRequested}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {loan.amountDisbursed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {loan.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {loan.requestDate}
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}

export default LoanRequestView