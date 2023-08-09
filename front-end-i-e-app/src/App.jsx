import { useEffect, useState } from 'react'
import './App.css'
import Expenses from './components/expenses'
import Incomes from './components/incomes'
import Inputs from './components/inputs'
import Results from './components/results'

function App() {
  const [displayExpenses, setDisplayExpenses] = useState([])
  const [displayIncomes, setDisplayIncomes] = useState([])

  const [concept, setConcept] = useState("")
  const [amount, setAmount] = useState("0")
  const [id, setId] =useState("")
  const [select, setSelect] = useState("Income")

  const [tExpenses, setTExpenses] = useState(0)
  const [tIncomes, setTIncomes] = useState(0)
  const [difference, setDifference] = useState(0)

  useEffect(() => {
    fetchGetE();
    fetchGetI();
    // console.log("useEffect")
  },[])

  useEffect(() => {
    // console.log("useEffect2")
    fetchGetSumE()
    fetchGetSumI()
    differenceEI()
  },)

  const fetchGetSumE = () => {
    fetch("http://localhost:3000/api/db-incomes-expenses-app/expenses")
    .then(res => res.json())
    .then(response => {
      let sumExpenses = 0;
      response.map((expense) => {
        sumExpenses += expense.amount;
        // console.log(sumExpenses)
        setTExpenses(sumExpenses)
      })
    })
    .catch(err => console.log(err))
  }

  const fetchGetSumI = () => {
    fetch("http://localhost:3000/api/db-incomes-expenses-app/incomes")
    .then(res => res.json())
    .then(response => {
      let sumIncomes = 0;
      response.map((income) => {
        sumIncomes += income.amount;
        // console.log(sumIncomes)
        setTIncomes(sumIncomes)
      })
    })
  }

  const differenceEI = () => {
    setDifference(tIncomes-tExpenses)
  }

  const fetchGetE = () => {
    fetch("http://localhost:3000/api/db-incomes-expenses-app/expenses")
    .then(res => res.json())
    .then(response => {
      setDisplayExpenses(response)
      // console.log(response)
      // console.log(displayExpenses)
    })
    .catch(err => console.log(err))
  }

  const fetchGetI = () => {
    fetch("http://localhost:3000/api/db-incomes-expenses-app/incomes")
    .then(res => res.json())
    .then(response => {
      setDisplayIncomes(response)
      // console.log(response)
      // console.log(displayIncomes)
    })
    .catch(err => console.log(err))
  }

  const addToDb = (e) => {
    e.preventDefault();
    if (id) {
      let form = document.getElementById("form");
      let data = new FormData(form)

      if (data.get("concept")===""||data.get("amount")==="") {
          window.alert("Concept and Amount fields are required")
      }

      // console.log(id)
      let arrayAmount = data.get("amount").split("")
      for (let i = 0; i < arrayAmount.length; i++) {
        if (arrayAmount[i] === ",") {
          arrayAmount[i]=""
        }
      }
      let stringAmount = arrayAmount.join("")

      let amount = parseInt(stringAmount);

      let url ="";
      if (data.get("select")==="Expense") {
        url = `http://localhost:3000/api/db-incomes-expenses-app/expenses/${id}`;
      } else if (data.get("select")==="Income") {
        url = `http://localhost:3000/api/db-incomes-expenses-app/incomes/${id}`;
      }

      fetch(url,{
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              concept: data.get("concept"), 
              amount: amount
          })
      })
      .then(res => res.json())
      .then(response => {
          console.log(response)
          setId("")
          fetchGetE();
          fetchGetI();
      })
      .catch(err => console.log(err)) 

      setConcept("")
      setAmount("")

      console.log("whats up")

    } else if (id==="") {    
      let form = document.getElementById("form");
      let data = new FormData(form)
      console.log(data.get("concept"))

      if (data.get("concept")===""||data.get("amount")==="") {
          window.alert("Concept and Amount fields are required")
      }

      console.log(data.get("amount"))
      let arrayAmount = data.get("amount").split("")
      for (let i = 0; i < arrayAmount.length; i++) {
        if (arrayAmount[i] === ",") {
          arrayAmount[i]=""
        }
      }
      let stringAmount = arrayAmount.join("")

      let amount = parseInt(stringAmount);
      console.log("amount" + amount)

      let url ="";
      if (data.get("select")==="Expense") {
        url = "http://localhost:3000/api/db-incomes-expenses-app/expenses";
      } else if (data.get("select")==="Income") {
        url = "http://localhost:3000/api/db-incomes-expenses-app/incomes";
      }

      fetch(url,{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              concept: data.get("concept"), 
              amount: amount
          })
      })
      .then(res => res.json())
      .then(response => {
          console.log(response)
          fetchGetE();
          fetchGetI();
      })
      .catch(err => console.log(err))

      // form.reset();
      setConcept("")
      setAmount("")
      // setId("")
    }
  };

  const deleteRowE = (id) => {
    console.log("id: " + id)
    fetch(`http://localhost:3000/api/db-incomes-expenses-app/expenses/${id}`, {
        method: "DELETE",   
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        fetchGetE()
    })
    .catch(err => console.log(err))
  }

  const deleteRowI = (id) => {
    console.log("id: " + id)
    fetch(`http://localhost:3000/api/db-incomes-expenses-app/incomes/${id}`, {
        method: "DELETE",   
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        fetchGetI()
    })
    .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    // console.log( e.target.name)
    if (e.target.name === "concept") {
      setConcept(e.target.value)
    } else if (e.target.name === "amount") {
      console.log(e.target.value)
      if (e.target.value === "") {
        e.target.value = "0"
      }
      let string = e.target.value
      let array = string.split("")
      console.log(array)
      for (let i = 0; i < array.length; i++) {
        if (string[i] === ",") {
          array[i]=""
        }
      }
      string = array.join("")
      console.log(array)
      console.log(string)
      let a = parseFloat(string)
      setAmount(a.toLocaleString())
      // console.log(array)
      // console.log(string)
    } else if (e.target.name === "select") {
      setSelect(e.target.value)
    }
    
    // setConcept(e.target.value)
    // setAmount(e.target.value)
  }

  const editRowE = (id) => {
    fetch(`http://localhost:3000/api/db-incomes-expenses-app/expenses/${id}`)
    .then(res => res.json())
    .then(response => {
      console.log("thi is a edit")
      console.log(response)
      setConcept(response.concept)
      setAmount(response.amount)
        // fetchGetE()
      setId(response._id)
      setSelect("Expense")
    })
    .catch(err => console.log(err))
  }

  const editRowI = (id) => {
    fetch(`http://localhost:3000/api/db-incomes-expenses-app/incomes/${id}`)
    .then(res => res.json())
    .then(response => {
      console.log("thi is a edit")
      console.log(response)
      setConcept(response.concept)
      setAmount(response.amount)
        // fetchGetE()
      setId(response._id)
      setSelect("Income")
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <h1 className='h1-app bg-purple-950 text-white w-full text-5xl pb-3 pt-2 mb-3 border-b-white'>Personal Finances App</h1>
      <div className=' flex flex-col items-center'>
        <div className='container-app justify-center'>
          <Inputs select={select} concept={concept} amount={amount} addToDb={addToDb} handleChange={handleChange} />
          <Results tExpenses={tExpenses} tIncomes={tIncomes} difference={difference} />
          <Incomes incomesDisplay={displayIncomes} deleteRowI={deleteRowI} editRowI={editRowI} />
          <Expenses expensesDisplay={displayExpenses} deleteRowE={deleteRowE} editRowE={editRowE}/>
        </div>
      </div>
    </>
  )
}

export default App
