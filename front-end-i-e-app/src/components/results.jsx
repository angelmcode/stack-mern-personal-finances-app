import React from 'react'
import '../stylesheets/results.css'

function Results({ tExpenses, tIncomes, difference }) {

  let formatn = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD"
  })

  return (
    <div className='results border-2 border-black'>
      <h1 className=' text-center text-4xl pb-1'>Results</h1>
      <div className='flex flex-col items-center gap-2 mt-2'>
        <div className='flex flex-col items-center bg-white border border-black w-52 h-14 rounded'>
          <div>Total Incomes: </div><div className=' text-green-600 font-bold'>{formatn.format(tIncomes)}</div>
        </div>
        <div className='flex flex-col items-center bg-white border border-black w-52 h-14 rounded'>
          <div>Total Expenses: </div><div className='text-red-600 font-bold'>{formatn.format(tExpenses)}</div>
        </div>
        <div className='flex flex-col items-center bg-white border border-black w-52 h-14 rounded'>
          <div>Difference: </div><div className={ difference>=0?' text-green-600 font-bold':' text-red-600 font-bold'}>{formatn.format(difference)}</div>
        </div>
      </div>
    </div>
  )
}

export default Results