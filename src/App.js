// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {

  const[query,setQuery]=useState(1);

  const[currency1,setCurrency1]=useState("USD");

  const[currency2,setCurrency2]=useState("USD");

  const[output,setOutput]=useState("");

  const[isLoading,setIsLoading]=useState(false);

  useEffect(  function(){
     async function FindAndSetCurrency()
      { 

          setIsLoading(true)
       
          const res = await fetch(`https://api.frankfurter.app/latest?amount=${query}&from=${currency1}&to=${currency2}`);

          const data = await res.json();

          console.log(data.rates[currency2]);
          setOutput(data.rates[currency2]);
          setIsLoading(false);
          
      }
      if ((currency1===currency2) || query==0) return setOutput(query);
      FindAndSetCurrency();
  },[query,currency1,currency2] );
  
  return (
    <div>
      <input type="text" value={query} onChange={(e)=>{ setQuery(Number(e.target.value)) }} />
      <select value={currency1} onChange={(e)=>{ setCurrency1(e.target.value)}} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select  value={currency2} onChange={(e)=>{ setCurrency2(e.target.value)}} disabled={isLoading}  >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p> {output} {currency2}</p>
    </div>
  );
}

