import axios from "axios";
const baseUrl = `/api/blogs/`;

const getAll = async (id) => {
    const result = await axios.get(`${baseUrl}${id}/comments`);
    return result.data;
}


const createComment = async (id, data) => {
    const result = await axios.post(`${baseUrl}${id}/comments`, data);
    console.log(result);
    return result.data;
}


export default { getAll, createComment }