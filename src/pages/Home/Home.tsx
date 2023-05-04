import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Card } from "../../components/Card";
import { ApplicationStore } from "../../stores/ApplicationStore";
import { Button } from "../../components/Button";
import { AddBook } from "../../components/AddBook";

interface Props {
  appStore: ApplicationStore;
}

export const Home = observer(function (props: Props) {
  // const { applicationStore } = React.useContext(AppContext);

  const appStore = ApplicationStore.getInstance();

  React.useEffect(() => {
    appStore.getBooksAuthors();
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
    if (first20 < appStore.listingList.length - 20) {
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
      {appStore.listingList.slice(first20, last20).map((listing, index) => {
        return (
          <Link
            to={`/listing/${listing.id}`}
            key={`${listing.id} ${listing.publishDate} ${listing.title}`}
            state={{
              title: listing.title,
              authors: listing.authors,
              description: listing.description,
              publishDate: listing.publishDate,
              id: listing.id,
            }}
          >
            <Card>
              <div>
                <h2>{listing.title}</h2>
                {findDate(listing.publishDate)}
                {listing.authors.map((author) => (
                  <h4 key={author.id}>
                    {author.firstName} {author.lastName}
                  </h4>
                ))}
                <p>{listing.description}</p>
              </div>
            </Card>
          </Link>
        );
      })}
    </>
  );
});
