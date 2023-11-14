import axios from "axios";

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/api/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get book data: ", error);
    throw error;
  }
};

export async function apiPutRequest(id, formData) {
  try {
    // Ganti URL sesuai dengan endpoint yang Anda gunakan
    const response = await axios.put(`/api/books/${id}`, formData);
    return response;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}
