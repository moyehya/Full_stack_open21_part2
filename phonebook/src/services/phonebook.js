import axios from 'axios'
const Baseurl='http://localhost:3001/persons'
const getAll=()=>{
    const request=axios.get(Baseurl)
    return request.then(response=>response.data)
}
const AddContact=(newContact)=>{
    const request =axios.post(Baseurl,newContact)
    return request.then(response=>response.data)
}
const DeleteContact=(id)=>{
const request=axios.delete(`${Baseurl}/${id}`)
return request.then(response=>response.data)

}
const UpdateContact=(newContact,id)=>{
    const request=axios.put(`${Baseurl}/${id}`,newContact)
    return request.then(response=>response.data)
}
const Updateid=(dat,id)=>{
    const request=axios.patch(`${Baseurl}/${id}`,dat)
    return request.then(response=>response.data)
    
}

export default{getAll,AddContact,DeleteContact,UpdateContact,Updateid}