import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addName = newObject => {
  return axios.post(baseUrl, newObject)
}

const updateName = person => {
  return axios.put(`${baseUrl}/${person.id}`, person)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default { 
  getAll: getAll, 
  addName: addName, 
  deletePerson: deletePerson,
  updateName: updateName
}