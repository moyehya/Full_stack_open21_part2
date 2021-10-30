
import React,{useState,useEffect} from "react";
import axios from "axios";
import datService from './services/phonebook';
const ulstyle={listStyleType:"none",margin:"0",padding:"0"}
const ststyl={color:"green", background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:30}
const erstyl={color:"red", background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:30}
const Pbpart=({name,number,id,arst,arr,erst})=>
{ 
return(
  <>
<li key={id}>{name} {number} <button onClick={()=>{
if(window.confirm(`Delete ${name} ?`))
{
handledel(id,erst)
arst(arr.filter(n=>n.id!==id))
console.log("into del",id)
}}}> Delete</button></li>
</>
)}
const Pbook=({entries,arst,erst})=>{
  return(
    <>
<ul style={ulstyle}>{entries.map(entry=><Pbpart name={entry.name} number={entry.number} id={entry.id} arst={arst} arr={entries} erst={erst} />)}</ul>
</>
  )
}
const handledel=(id,erst)=>{
  console.log(typeof(id))
  datService.DeleteContact(id).then(response=>console.log(response)).catch(error=>{
    erst(`Entry Deleted already`)
    setTimeout(()=>{erst("")},5000)
    
  })

  }
  const Status=({msg})=>{
   if(msg==="")
   {
     return null
   }
   return(
   <div style={ststyl}>
     {msg}
   </div>
   )
  }
  const Errorstatus=({ermsg})=>{
    if(ermsg==="")
    {
      return null
    }
    return(
      <div style={erstyl}>
       {ermsg} 
      </div> 
    )
  }

const App=()=> {
  const [entry,setentry]=useState([])
  const [input,setinput]=useState("")
  const [ninput,setninput]=useState(0)
  const [search,setsearch]=useState("")
  const [serres,setser]=useState([])
  const [indicator,setindicator]=useState("")
  const [error,seterror]=useState("")
  
  useEffect(()=>{datService.getAll().then(initialRec=>{
    console.log(initialRec)
    setentry(initialRec)
  })
    //axios.get('http://localhost:3001/persons').then(response=>{setentry(response.data)})
  },[])
 
  const handleninput=(event)=>setninput(event.target.value)
  const handlesearch=(event)=>{
    console.log(event.target.value)
    setsearch(event.target.value)
    const sarr=entry.filter(en=>(en.name.toLowerCase()).includes(search.toLowerCase()))
    setser(sarr)
  }
  const handleinput=(event)=>{
    console.log(event.target.value)
    setinput(event.target.value)
  }
  const addent=(event)=>{
    event.preventDefault()
    const newnote={
   name:input,
   number:ninput,
   id: (new Date()).toUTCString()
    }

    if(entry.map(en=>(en.name.toLowerCase())).includes(input.toLowerCase()))
    { 
    const uid=entry.find(en=>en.name.toLowerCase()===input.toLowerCase())
      const idt=uid[0]
      if(window.confirm(`${input.toLowerCase()} is already added to phonebook, replace the old number with a new one?`))
      {     
        datService.UpdateContact(newnote,uid.id).then(response=>{

          console.log(response)
          const uarr=entry.filter(n=>n.id!==uid.id)
          setentry(uarr.concat(response))  
        })       
      }
      setinput("")
    setninput(0)    
    }
    else{

    datService.AddContact(newnote).then(response=>{
    setentry(entry.concat(response))
    setindicator(`${response.name} is added!`)

    setTimeout(()=>{setindicator("")},5000)
  }) 
    //setentry(entry.concat(newnote))
    setinput("")
    setninput(0)
    
    }
  }

  return (
    <div>
    <h1>Phone book</h1>
    <Status msg ={indicator}/>
    <Errorstatus ermsg={error} />
    filter shown with 
    <input type="text" onChange={handlesearch} value={search} /> 
    <div>
      <h1>Add a New</h1>
    <form onSubmit={addent}>

      Name: 
      <input type="text" onChange={handleinput} value={input} />
      Number:
      <input type="text" onChange={handleninput} value={ninput} />
      <button type="submit">add </button>
    </form>
    </div>
    <h1>Numbers</h1>
    <div>
    <Pbook entries={entry} arst={setentry} erst={seterror} />
    </div>
    <div>
      <h1>search results</h1>
      <Pbook entries={serres} arst={setsearch} erst={seterror}/>
    </div>
    </div>
  );
}

export default App;
