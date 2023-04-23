import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../../AppContext";
import { Card } from "../../components/Card";

import axios from "axios";
import { Button } from "../../components/Button";
import { AddBook } from "../../components/AddBook";
import { ApplicationStore } from "../../stores";

interface Props {}

export const Home = observer(function (props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  const [addAuthors, setAddAuthors] = React.useState([]);
  const [addBooks, setAddBooks] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Authors")
      .then(function (response) {
        // handle success

        response.data.map(
          (
            item: {
              id: number;
              idBook: number;
              firstName: string;
              lastName: string;
            },
            index: number
          ) => {
            applicationStore.setAuthors(
              item.id,
              item.idBook,
              item.firstName,
              item.lastName
            );
          }
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setAddAuthors(applicationStore.authorList);
      });

    axios
      .get(`https://fakerestapi.azurewebsites.net/api/v1/Books`)
      .then(function (response) {
        // handle success

        response.data.map(
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
            applicationStore.setBook(
              item.id,
              item.title,
              item.pageCount,
              item.description,
              item.publishDate
            );
          }
        );
      })
      .catch(function (error) {})
      .finally(() => {
        setAddBooks(applicationStore.bookList);
      });
  }, []);

  React.useEffect(() => {
    applicationStore.addListings(addAuthors, addBooks);
  }, [addAuthors, addBooks]);

  const [first20, setFirst20] = React.useState(0);
  const [last20, setLast20] = React.useState(20);
  const sub20 = (): void => {
    if (first20 > 0) {
      setFirst20(first20 - 20);
      setLast20(last20 - 20);
    }
  };
  const add20 = (): void => {
    if (first20 < addBooks.length) {
      setFirst20(first20 + 20);
      setLast20(last20 + 20);
    }
  };

  const findDate = (date: string): React.ReactNode => {
    const newDate = new Date(date);

    const year = newDate.getUTCFullYear();
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();
    const dateString = `${month}/${day}/${year}`;

    return <p>{dateString}</p>;
  };

  return (
    <>
      <AddBook />
      <Button onClick={sub20}>Previous 20</Button>
      <Button onClick={add20}>Next 20</Button>
      {applicationStore.listingList
        .slice(first20, last20)
        .map((listing, index) => {
          return (
            <Card key={`${listing.id} ${listing.publishDate} ${listing.title}`}>
              <div>
                <h2>{listing.title}</h2>
                {findDate(listing.publishDate)}
                {listing.authors.map((author) => (
                  <h4>
                    {author.firstName} {author.lastName}
                  </h4>
                ))}
                <p>{listing.description}</p>
              </div>
            </Card>
          );
        })}
    </>
  );
});
