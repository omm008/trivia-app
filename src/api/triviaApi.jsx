// src/api/triviaApi.js
import axios from "axios";

const BASE = "https://the-trivia-api.com/v2/questions";

/**
 * Fetches questions from The Trivia API v2
 * Arrow-function version
 */
export const fetchQuestions = async ({
  limit = 10,
  difficulties = "easy",
  categories = undefined,
  session = undefined,
  preview = false,
} = {}) => {
  const params = new URLSearchParams();
  params.append("limit", limit);
  if (difficulties) params.append("difficulties", difficulties);
  if (categories) params.append("categories", categories);
  if (session) params.append("session", session);
  if (preview) params.append("preview", "true");

  const url = `${BASE}?${params.toString()}`;
  console.log("Fetching URL:", url);

  try {
    const res = await axios.get(url);
    return res.data; // array of TextChoiceQuestion objects
  } catch (err) {
    console.error("Error fetching trivia questions:", err);
    throw err;
  }
};
