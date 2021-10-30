import React,{useState,useEffect} from "react";
import axios from 'axios';
const ulstyle={listStyleType:"none",margin:"0",padding:"0"}
const Cntent=({cntent,id,btnarr})=>{
const [cntst,setcntst]=useState(0)
if(cntst===1){
  return(
    <Cntdts arr={btnarr} />
  )
}
return(
<li key={id}>{cntent} <button onClick={()=>setcntst(1)}>Show</button></li>
)
}
const Tmm=()=><p>Too many matches</p>
const Lang=({arr})=><ul>{Object.entries(arr.languages).map(en=><li key={en[0]}>{en[1]}</li>)}</ul>
const Weather=({wdata})=>{console.log(wdata)
  return(
    <>
    
    <p><strong>Temperature:</strong> {wdata["current"].temperature}</p>
    <img src={wdata["current"].weather_icons[0]} alt="Weather desc" />
    <p><strong>Wind:</strong> {wdata["current"].wind_speed} mph direction {wdata["current"].wind_dir}</p>
    </>
  )
}
const Cntdts=({arr})=>{
 const [wstate,setwstate]=useState({}) 
const wapi_key=process.env.REACT_APP_WAPI_KEY
const params={access_key:wapi_key ,query: arr.capital[0]}
console.log(params) 
useEffect(()=>{axios.get('http://api.weatherstack.com/current', {params}).then(response=>{
  console.log(response.data)
  setwstate(response.data)})
  },[])

console.log(wstate)

if(Object.keys(wstate).length===0)
{
  return(
    <> </>
  )
}
  return(
    <>
    <h1>{arr.name.common}</h1>
    <p>Capital: {arr.capital[0]}</p>
    <p>Population: {arr.population}</p>
    <strong>languages</strong>
    <Lang arr={arr} />
    <img src={arr.flags.png} alt="Flag" />
    <p><strong>Weather in {arr.capital[0]}</strong></p>
    <Weather wdata={wstate} />
    </>
  )
}
const Disp=({dispobj})=>{
  return(
    <>
   <ul style={ulstyle}>{dispobj.map(ent=><Cntent cntent={ent.name.common} id={ent.ccn3} btnarr={ent} />)}</ul> 
    </>
  )
}
const App=()=> {
  const [val,setval]=useState("")
  const [arr,setarr]=useState([])
  const hanser=(event)=>setval(event.target.value)
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>{console.log(response.data)
  const rarr=response.data
console.log(rarr)
const sarr=rarr.filter(ent=>ent.name.common.toLowerCase().includes(val.toLowerCase()))
setarr(sarr)})},[val])

if(arr.length>10)
{ const api_key=process.env.REACT_APP_WAPI_KEY
  console.log(api_key)
  return(
    <>
    find  countries <input type ="text" value={val} onChange={hanser} />
   <Tmm />
  </>)
}
if(arr.length===0){
  return(<>
find  countries <input type ="text" value={val} onChange={hanser} />
<p>No Country found. Try a different search query</p>  
  </>)
}
if(arr.length===1)
{console.log(arr)
  return(<>
  find  countries <input type ="text" value={val} onChange={hanser} />
{arr.map(en=><Cntdts arr={en} />)}  
  </>)
}  
return (
    <>
    find  countries <input type ="text" value={val} onChange={hanser} />
    <Disp dispobj={arr} />
  </>
  );
}

export default App;
