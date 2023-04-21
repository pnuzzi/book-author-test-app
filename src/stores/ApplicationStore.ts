import { makeAutoObservable } from "mobx";

interface authors {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
}

interface books {
  id: number;
  title: string;
  pageCount: number;
  description: string;
  publishDate: string;
}

interface listing {
  id: number;
  authors: authors[];
  title: string;
  description: string;
  pageCount: number;
  publishDate: string;
}

export class ApplicationStore {
  
  authorList: Array<authors> = [];
  bookList: Array<books> = [];
  listingList: Array<listing> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuthors = (id: number, idBook: number, firstName: string, lastName: string) => {
    const author: authors = {
      id,
      idBook,
      firstName,
      lastName
    };
    
    this.authorList.push(author);
  };

  setBook = (id: number, title: string, pageCount: number, description: string, publishDate: string) => {  
    const book: books = {
      id,
      title,
      pageCount,
      description,
      publishDate
    };
    
    this.bookList.push(book);
  };

  addListings = (authors: Array<authors>, books: Array<books>) => {
    let bookAuthorsTMP: Array<authors> = [];

    books.map((book: books) => {
      authors.map((author: authors) => {
        if(author.idBook === book.id) {
          bookAuthorsTMP = [...bookAuthorsTMP, {id: author.id, idBook: author.idBook, firstName: author.firstName, lastName: author.lastName}]
        }
      });
      
       const listing: listing = {
        id: book.id,
        authors: bookAuthorsTMP,
        title: book.title,
        pageCount: book.pageCount,
        description: book.description,
        publishDate: book.publishDate
       };

       this.listingList.push(listing);
       bookAuthorsTMP = [];
    });
  };

  addListing = (id: number, authors: authors[], title: string, pageCount: number, description: string, publishDate: string) => {
    const listing: listing = {
      id,
      authors,
      title,
      pageCount,
      description,
      publishDate
    };
    this.listingList.push(listing);

};
}
