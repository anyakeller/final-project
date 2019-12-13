import axios from "axios";

const xhrHeader = {
  headers: {
    xhrFields: {
      withCredentials: true
    }
  }
};

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  loginUser: function (user) {
    return axios.post("/api/user/", user, xhrHeader)
  },
  signup: function (user) {
    return axios.post("/api/user/signup", user, xhrHeader)
  },
  authenticateUser: function () {
    return axios.post("/api/user/authenticate/", xhrHeader)
  },
	// contacts
  getContacts: function () {
    return axios.get("/api/contacts");
  },
  // Gets  with the given id
  getContact: function (id) {
    return axios.get("/api/contacts/" + id);
  },
  // Deletes with the given id
  deleteContact: function (id) {
    return axios.delete("/api/contacts/" + id);
  },
  // Saves to the database
  saveContact: function (contactData) {
    return axios.post("/api/contacts", contactData);
  }

};
