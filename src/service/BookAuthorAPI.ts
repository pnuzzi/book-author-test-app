import axios from "axios";

class BookAuthorAPI {
  static getAuthors(): Promise<any> {
    const data = axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Authors")
      .then(function (response) {
        // handle success

        return response.data;
      });

    return data;
  }

  static getBooks(): Promise<any> {
    const data = axios
      .get(`https://fakerestapi.azurewebsites.net/api/v1/Books`)
      .then(function (response) {
        // handle success

        return response.data;
      });

    return data;
  }
}

export default BookAuthorAPI;
