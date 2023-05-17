import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { Main } from "../../components/Main";
import { ApplicationStore } from "../../stores/ApplicationStore";
import { Button } from "../../components/Button";
import { AddBook } from "../../components/AddBook";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";

interface Props {
  appStore: ApplicationStore;
}

export const Home = observer(function ({ appStore }: Props) {
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

  const deleteListing = (listing: any) => {
    const index = appStore.listingList.indexOf(listing);
    appStore.listingList.splice(index, 1);

    // setRemoveListing(false);
  };

  return (
    <>
      <Header>
        <h1>Book Listings Test App</h1>
        <p>This app uses a fake books and authors api from fakerestapi.</p>
      </Header>

      <Main>
        <AddBook appStore={appStore} />
        <Pagination>
          <Button onClick={sub20}>Previous 20</Button>
          <Button onClick={add20}>Next 20</Button>
        </Pagination>

        {appStore.listingList.slice(first20, last20).map((listing, index) => {
          return (
            <Card>
              <Link to={`/listing/${listing.id}`} key={listing.id}>
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
              </Link>
              <button onClick={() => deleteListing(listing)}>X</button>
            </Card>
          );
        })}
      </Main>
    </>
  );
});
