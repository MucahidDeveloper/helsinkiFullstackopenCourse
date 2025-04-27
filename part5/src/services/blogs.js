import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;

  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    const updatedUser = { ...user, token: newToken };
    window.localStorage.setItem(
      "loggedBlogAppUser",
      JSON.stringify(updatedUser)
    );
  }
};

const clearToken = () => {
  token = null;
  window.localStorage.removeItem("loggedBlogAppUser");
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

export default { getAll, create, update, setToken, clearToken };
