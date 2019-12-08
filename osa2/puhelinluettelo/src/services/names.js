import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addName = newObject => {
  return axios.post(baseUrl, newObject)
}


export default { 
  getAll: getAll, 
  addName: addName, 
}