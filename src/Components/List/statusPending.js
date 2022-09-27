import axios from "axios";

export async function addPending(payload) {
  let response = await axios
    .post("http://localhost:5030/pending", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
