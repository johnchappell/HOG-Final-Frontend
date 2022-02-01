import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, newUserType, logoutHandler){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
    this.userType = newUserType;
  }


  authenticatedCall(method,url,data){
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider
      },
      data,
    }).catch((error) => {
      if(error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject()
      } else {
      throw error;
    }
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  login(username,password) {
    return this.apiCall("post",url + "auth/",{username: username, password:password});
  }

  // getEvents() {
  //   return this.authenticatedCall("get", url);
  // }

  // addEvent(name, location, info, eventDate) {
  //   console.log("Posting", name)
  //   return this.authenticatedCall("post", url, { name, location, info, eventDate });
  // }

  // removeEvent(id) {
  //   return this.authenticatedCall("delete", `${url}${id}`);
  // }

  // updateEvent(id, name, location, info, eventDate) {
  //   return this.authenticatedCall("put", `${url}${id}`, { name, location, info, eventDate });
  // }
  getProfiles() {
    return this.authenticatedCall("get", url);
  }

  addProfile(username, userType, firstName, lastName, bio, email, image, cv, location, isEmployed, employedInTech, employedOther, freelance, notEmployed, inEducation, saveForlater, portfolioLink) {
    console.log("Posting", firstName)
    return this.authenticatedCall("post", url, { username, userType,  firstName, lastName, bio, email, image, cv, location, isEmployed, employedInTech, employedOther, freelance, notEmployed, inEducation, saveForlater, portfolioLink });
  }

  removeProfile(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateProfile(id, username, userType, firstName, lastName, bio, email, image, cv, location, isEmployed, employedInTech, employedOther, freelance, notEmployed, inEducation, saveForLater, portfolioLink) {
    return this.authenticatedCall("put", `${url}${id}`, { username, userType, firstName, lastName, bio, email, image, cv, location, isEmployed, employedInTech, employedOther, freelance, notEmployed, inEducation, saveForLater });
  }
}
