// Bring axios into the project:
import Axios from 'axios';

//axios instance for all requests:
const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': 'Bearer Y29ycmVjdC1ob3JzZS1iYXR0ZXJ5LXN0YXBsZQ=='
    }
})

// getData, postData, patchData, deleteData
export const fetchBooks = async () => {
    try {
      const response = await axios.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  export const fetchBook = async (id) => {
    try {
      const response = await axios.get('/books/' + id);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };
  
  export const createBook = async (id) => {
    try {
      const response = await axios.post('/books', id);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  export const updateBook = async (id, bookData) => {
    if (!id) {
        throw new Error('You must provide an id to update a book.');
    }
    try {
      const response = await axios.patch(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  
  export const deleteBook = async (id) => {
    if (!id) {
        throw new Error('You must provide an id to delete a book.');
    }
    try {
      const response = await axios.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  