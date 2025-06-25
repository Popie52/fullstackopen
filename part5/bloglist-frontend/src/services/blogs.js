import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = (value) => {
  if(value) {
    token = `Bearer ${value}`;
  } else token = null;
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return  request.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const updateBlog = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization : token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }