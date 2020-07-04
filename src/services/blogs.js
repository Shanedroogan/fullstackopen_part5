import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const like = async blog => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(baseUrl + `/${blog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(baseUrl + `/${blog.id}`, config)
}

export default { getAll, create, setToken, like, deleteBlog }
