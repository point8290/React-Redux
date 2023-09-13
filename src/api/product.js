import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:4444/api/food-item",
});
