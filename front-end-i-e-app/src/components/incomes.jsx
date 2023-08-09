import React from 'react'
import '../stylesheets/incomes.css'
import IconDelete from '../icons/icon-delete'
import IconEdit from '../icons/icon-edit'

function Incomes({ incomesDisplay, deleteRowI, editRowI }) {
  console.log(incomesDisplay)
  let formatn = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  })

  return (
    <div className='incomes rounded-br-none border-2 border-white'>
      <h1 className='text-center text-4xl pb-2 bg-purple-950 text-white rounded-t-lg'>Incomes</h1>
      <div className=' overflow-y-scroll h-52 rounded-b-lg'>
        <table className='table-incomes bg-white'>
          <thead>
            <tr className=' bg-white border-b-2 border-black border-t'>
              <th className='th-incomes w-36 min-w-full text-left pl-3 pt-2 pb-2'>Concept</th>
              <th className='th-incomes text-left pl-2'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
            incomesDisplay.map((income) => {
              return (
                <tr className='tr bg-white border-b border-black' key={income._id}>
                  <td className=' p-4 pl-4'>{income.concept}</td>
                  <td className='pl-4 pr-5'>{formatn.format(income.amount)}</td>
                  <td className=' pr-3'><button onClick={() => editRowI(income._id)}><IconEdit /></button></td>
                  <td className=' pr-2'><button onClick={() => deleteRowI(income._id)}><IconDelete /></button></td>
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

export default Incomes