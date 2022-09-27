import axios from "axios";

export async function addRequest(payload) {
  let response = await axios
    .post("http://localhost:5030/new", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  console.log(response);
  return response;
}
