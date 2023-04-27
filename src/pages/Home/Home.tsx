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

  React.useEffect(() => {
    applicationStore.getBooksAuthors();
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
    if (first20 < applicationStore.listingList.length - 20) {
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
