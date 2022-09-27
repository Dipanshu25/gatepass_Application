import axios from "axios";

export async function addRejectAction(payload) {
  let response = await axios
    .post("http://localhost:5030/rejected", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
