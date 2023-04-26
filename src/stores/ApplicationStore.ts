import { makeAutoObservable } from "mobx";

import BookAuthorAPI from "../service/BookAuthorAPI";

interface IAuthor {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
}

interface IBook {
  id: number;
  title: string;
  pageCount: number;
  description: string;
  publishDate: string;
}

interface IListing {
  id: number;
  authors: IAuthor[];
  title: string;
  description: string;
  pageCount: number;
  publishDate: string;
}

export class ApplicationStore {
  authorList: Array<IAuthor> = [];
  bookList: Array<IBook> = [];
  listingList: Array<IListing> = [];

  getAuthorData: Array<object> = [];
  getBookData: Array<object> = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAuthors = async () => {
    const getAuthorData = await BookAuthorAPI.getAuthors();

    getAuthorData.map(
      (
        item: {
          id: number;
          idBook: number;
          firstName: string;
          lastName: string;
        },
        index: number
      ) => {
        this.setAuthors(item.id, item.idBook, item.firstName, item.lastName);
      }
    );
  };

  getBooks = async () => {
    const getBookData = await BookAuthorAPI.getBooks();

    getBookData.map(
      (
        item: {
          id: number;
          title: string;
          pageCount: number;
          description: string;
          publishDate: string;
        },
        index: number
      ) => {
        this.setBook(
          item.id,
          item.title,
          item.pageCount,
          item.description,
          item.publishDate
        );
      }
    );
  };

  setAuthors = (
    id: number,
    idBook: number,
    firstName: string,
    lastName: string
  ) => {
    const author: IAuthor = {
      id,
      idBook,
      firstName,
      lastName,
    };

    this.authorList.push(author);
  };

  setBook = (
    id: number,
    title: string,
    pageCount: number,
    description: string,
    publishDate: string
  ) => {
    const book: IBook = {
      id,
      title,
      pageCount,
      description,
      publishDate,
    };

    this.bookList.push(book);
  };

  addListings = (authors: Array<IAuthor>, books: Array<IBook>) => {
    let bookAuthorsTMP: Array<IAuthor> = [];

    books.map((book: IBook) => {
      authors.map((author: IAuthor) => {
        if (author.idBook === book.id) {
          bookAuthorsTMP = [
            ...bookAuthorsTMP,
            {
              id: author.id,
              idBook: author.idBook,
              firstName: author.firstName,
              lastName: author.lastName,
            },
          ];
        }
      });

      const listing: IListing = {
        id: book.id,
        authors: bookAuthorsTMP,
        title: book.title,
        pageCount: book.pageCount,
        description: book.description,
        publishDate: book.publishDate,
      };

      this.listingList.push(listing);
      bookAuthorsTMP = [];
    });
  };

  addListing = (
    id: number,
    authors: IAuthor[],
    title: string,
    pageCount: number,
    description: string,
    publishDate: string
  ) => {
    const listing: IListing = {
      id,
      authors,
      title,
      pageCount,
      description,
      publishDate,
    };
    this.listingList.unshift(listing);
  };
}
