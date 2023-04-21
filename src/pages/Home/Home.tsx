import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../../AppContext";
import { Card } from "../../components/Card";

import axios from "axios";
import { Button } from "../../components/Button";

interface Props {}

export const Home = observer(function (props: Props) {
  const { applicationStore } = React.useContext(AppContext);

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
              publishDate: Date;
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

    applicationStore.addListings(
      applicationStore.authorList,
      applicationStore.bookList
    );
  }, []);

  const [first20, setFirst20] = React.useState(0);
  const [last20, setLast20] = React.useState(20);
  const sub20 = (): void => {
    if (first20 > 0) {
      setFirst20(first20 - 20);
      setLast20(last20 - 20);
    }
  };
  const add20 = (): void => {
    setFirst20(first20 + 20);
    setLast20(last20 + 20);
  };

  return (
    <>
      <Button onClick={sub20}>Previous 20</Button>
      <Button onClick={add20}>Next 20</Button>
      {applicationStore.listingList
        .slice(first20, last20)
        .map((listing, index) => {
          return (
            <Card key={listing.id}>
              <div>
                <h2>{listing.title}</h2>
                <p>{listing.publishDate.toString()}</p>
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
