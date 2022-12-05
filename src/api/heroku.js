import axios from "axios";

export default axios.create({
	baseURL: "https://comp3123assignment.herokuapp.com/api/",
	timeout: 1000,
});
