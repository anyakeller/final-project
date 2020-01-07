import axios from "axios";

const xhrHeader = {
  headers: {
    xhrFields: {
      withCredentials: true
    }
  }
};

export default {
  loginUser: function (user) {
    return axios.post("/api/user/", user, xhrHeader)
  },
  signup: function (user) {
    return axios.post("/api/user/signup", user, xhrHeader)
  },
  authenticateUser: function () {
    return axios.post("/api/user/authenticate/", xhrHeader)
  },
  logout: function () {
    return axios.post("/api/user/logout/", xhrHeader)
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
