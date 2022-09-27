import axios from "axios";

export async function addAll(payload) {
  let response = await axios
    .post("http://localhost:5030/all", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
