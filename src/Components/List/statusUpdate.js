import axios from "axios";

export async function addStatus(payload) {
  let response = await axios
    .post("http://localhost:5030/status", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
