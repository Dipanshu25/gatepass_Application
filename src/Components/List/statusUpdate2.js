import axios from "axios";

export async function addReject(payload) {
  let response = await axios
    .post("http://localhost:5030/reject", payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
