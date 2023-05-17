import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationStore } from "../../stores/ApplicationStore";
import { Link, useParams } from "react-router-dom";

import styled from "styled-components";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #000;
`;

const Container = styled.div`
  width: 100%;
  word-break: break-all;
`;

const EditDiv = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 25px;
    height: 25px;
    background-color: white;
    outline: none;
    border: none;

    :hover {
      background-color: white;
      border-bottom: 1px solid black;
      border-top: 1px solid black;
    }

    :active {
      background-color: black;
    }
  }

  h1 {
    margin: 0;
  }

  input {
    margin-bottom: 10px;
    width: 300px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #000;
  }

  p {
    width: 100%;
  }
`;

interface Props {
  appStore: ApplicationStore;
}

export const Listing = observer(function ({ appStore }: Props) {
  const { id } = useParams();
  const [toggleTitle, setToggleTitle] = React.useState(true);
  const [toggleDescription, setToggleDescription] = React.useState(true);
  const [removeListing, setRemoveListing] = React.useState(true);

  let listing = appStore.listingList.find((l) => l.id.toString() === id);

  const findDate = (date: string): React.ReactNode => {
    const newDate = new Date(date);

    const year = newDate.getUTCFullYear();
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();
    const dateString = `${month}/${day}/${year}`;

    return <p>{dateString}</p>;
  };

  const changeTextHandler = (e: any) => {
    if (e.target.name === "title") {
      listing.title = e.target.value;
    }
    if (e.target.name === "description") {
      listing.description = e.target.value;
    }
  };

  const deleteListing = () => {
    const index = appStore.listingList.indexOf(listing);
    appStore.listingList.splice(index, 1);

    setRemoveListing(false);
  };

  return (
    <>
      <Header>
        <h1>Book Listings Test App</h1>
        <p>This app uses a fake books and authors api from fakerestapi.</p>
      </Header>
      <Link to={"/"}>
        <Button>Back to Home</Button>
      </Link>
      {removeListing ? (
        <Wrapper>
          {listing && (
            <Container>
              <EditDiv>
                <button onClick={() => setToggleTitle(!toggleTitle)}>⚙️</button>
                {toggleTitle ? (
                  <h1>{listing.title}</h1>
                ) : (
                  <input
                    type="text"
                    name="title"
                    value={listing?.title}
                    onChange={changeTextHandler}
                  />
                )}
              </EditDiv>
              <hr />
              {listing.authors.map((author: any) => (
                <h4 key={author.id}>
                  {author.firstName} {author.lastName}
                </h4>
              ))}
              <h4>{findDate(listing.publishDate)}</h4>
              <EditDiv>
                <button
                  onClick={() => setToggleDescription(!toggleDescription)}
                >
                  ⚙️
                </button>
                {toggleDescription ? (
                  <p>{listing.description}</p>
                ) : (
                  <input
                    type="text"
                    name="description"
                    value={listing?.description}
                    onChange={changeTextHandler}
                  />
                )}
              </EditDiv>
            </Container>
          )}
          <Button onClick={deleteListing}>Delete</Button>
        </Wrapper>
      ) : (
        <h1>Listing Deleted</h1>
      )}
    </>
  );
});
