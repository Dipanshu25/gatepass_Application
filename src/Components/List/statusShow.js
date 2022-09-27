import axios from "axios";

export async function addAction(payload) {
  let response = await axios
    .post("http://localhost:5030/approve", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
