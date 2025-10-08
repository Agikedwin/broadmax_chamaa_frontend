// src/pages/Repayments.jsx
import { useState, useEffect } from 'react'
import { API } from '../services/api'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'

const LoanRepaymentView = () => {
  const [repayments, setRepayments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.getLoanRepayments()
      setRepayments(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Loan Repayments</h2>
      
      <Card>
        <Table headers={['Loan ID', 'Loanee', 'Amount', 'Balance', 'Payment Date', 'Mode']}>
          {repayments.map(r => (
            <tr key={r.id} className="border-b border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-xs text-gray-500 font-mono">{r.loanRequest.id}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {r.loanRequest.loanee.user.firstName} {r.loanRequest.loanee.user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {r.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {r.balance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {r.paymentDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {r.paymentMode}
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}

export default LoanRepaymentView