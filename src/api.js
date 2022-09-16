import axios from "axios";

const BASE_URL = `https://minimi-place.duckdns.org`;

const API = {
  GET: `${BASE_URL}/get`,
  POST: `${BASE_URL}/post`,
  PATCH: `${BASE_URL}/patch`,
  DELETE: `${BASE_URL}/delete`,
};

//axios
const Test = {
  get: async () => {
    try {
      const { data } = await axios(API.GET);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  post: async () => {
    try {
      const string = "abcd";
      const { data } = await axios.post(API.POST, string);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  patch: async () => {
    try {
        const string = "efgh";
      const { data } = await axios.patch(API.PATCH, string);
      console.log(`patch `)
      return data;
    } catch (err) {
      console.log(err.response);
    }
  },
  delete: async () => {
    try {
      const { data } = await axios.delete(API.DELETE);
      console.log(`delete `)
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default { BASE_URL, API, Test };
