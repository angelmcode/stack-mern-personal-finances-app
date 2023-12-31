import React from 'react'
import '../stylesheets/inputs.css'

function Inputs({ select, concept, amount, addToDb, handleChange, sended, buttonSend }) {
  console.log("sended" + sended)
  
  return (
    <div className='inputs border-2 border-black'>
      <h1 className=' text-center text-4xl'>Inputs</h1>
      <form className=' flex flex-col items-center pt-1' id="form">
        <div className='w-52 h-8'>
          <select className='w-52 h-7 rounded' name='select' onChange={handleChange} value={select}>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div className='flex flex-col'><label>Concept</label><input className='w-52 h-8 border focus:outline-none hover:border-purple-500 rounded shadow-black opacity-100 hover:shadow-md' name="concept" type="text" onChange={handleChange} value={concept} placeholder='Enter a Concept' /></div>
        <div className='flex flex-col'>
          <label>Amount</label>
          <div className='bg-white flex flex-row items-center w-52 h-8 border hover:border-purple-500 rounded shadow-black opacity-100 hover:shadow-md'>
            <div>$</div>
            <input className='focus:outline-none w-52' name="amount" type="text" onChange={handleChange} value={amount} placeholder='Enter a Amount' />
          </div>
        </div>
        <div className=' mt-3'><button className={buttonSend==="Update"?"bg-blue-900 text-white w-52 h-9 pb-1 rounded text-2xl hover:bg-purple-500 transition duration-200 border":"bg-purple-950 text-white w-52 h-9 pb-1 rounded text-2xl hover:bg-purple-500 transition duration-200 border"} onClick={addToDb} type="submit">{buttonSend}</button></div>
      </form>
        <div className=' flex flex-col items-center'>
          {
            sended!==""?<span className=' bg-green-900 h-7 fixed text-center pr-4 pl-4 pt-1 text-white rounded'>{sended}</span>:<span></span>
          }
        </div>
        
    </div>
  )
}

export default Inputs