import axios from 'axios'


const baseUrl="http://localhost:5001/counter"
const url="/getCounterList"
const url1="/saveCounterList"
const getAllToDo = (setToDo)=>{
    axios
    .post(baseUrl + url)
    .then(({data})=>{
        console.log('data--->',data);
        setToDo(data);
    })
}

const addToDo=(text,setText,setToDo)=>{
axios
.post(`${baseUrl + url1}/save`,{text})
.then((data)=>{
    console.log(data);
    setText("")
    getAllToDo(setToDo)
})
}
export {getAllToDo,addToDo}