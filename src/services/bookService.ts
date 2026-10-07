import axios from "axios";

const API_URL = "https://openlibrary.org/search.json?q=";

export const searchBooks = async (query: string) => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data;
};

export const getBookDetail = async (id: string) => {
  const response = await axios.get(`https://openlibrary.org/works/${id}.json`);

  return response.data;
};
