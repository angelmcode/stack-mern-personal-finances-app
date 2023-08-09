import React from 'react'
import '../stylesheets/expenses.css'
import IconDelete from '../icons/icon-delete'
import IconEdit from '../icons/icon-edit'

function Expenses({ expensesDisplay, deleteRowE, editRowE }) {
// console.log(expensesDisplay);
let formatn = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD"
})

  return (
    <div className='expenses rounded-br-none border-2 border-white'>
      <h1 className='text-center text-4xl pb-2 bg-purple-950 text-white rounded-t-lg'>Expenses</h1>
      <div className=' overflow-y-scroll h-52 rounded-b-lg'>
        <table className='table-expenses bg-white'>
          <thead>
            <tr className=' bg-white border-b-2 border-black border-t'>
              <th className='th-expenses w-36 min-w-full text-left pl-3 pt-2 pb-2'>Concept</th>
              <th className='th-expenses text-left pl-2'> Amount</th>
            </tr>
          </thead>
          <tbody>
            {
            expensesDisplay.map((expense) => {
              return (
                <tr className="tr bg-white border-b border-black" key={expense._id}>
                  <td className=' p-4 pl-4'>{expense.concept}</td>
                  <td className='pl-4 pr-5'>{formatn.format(expense.amount)}</td>
                  <td className=' pr-3'><button onClick={() => editRowE(expense._id)}><IconEdit /></button></td>
                  <td className=' pr-2'><button onClick={() => deleteRowE(expense._id)}><IconDelete /></button></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Expenses