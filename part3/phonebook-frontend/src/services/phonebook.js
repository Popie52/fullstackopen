import axios from 'axios' 
const baseUrl = `/api/persons`;

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(res => res.data);
}

const create = (phoneObject) => {
    const response = axios.post(baseUrl, phoneObject);
    return response.then(res => res.data);

}

const deleteOne = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`);
    return response.then(res => res.data);
}

const updateOne = (id, object) => {
    const response = axios.put(`${baseUrl}/${id}`, object);
    return response.then(res => res.data);
}

export default { getAll, create, deleteOne, updateOne };