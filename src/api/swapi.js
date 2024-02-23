// src/api/swapi.js
import axios from "axios";

const BASE_URL = "https://swapi.dev/api";

export const fetchPlanets = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/planets/?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
