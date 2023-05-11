import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationStore } from "../../stores/ApplicationStore";
import { useParams } from "react-router-dom";

import styled from "styled-components";

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
      <button onClick={deleteListing}>Delete</button>
      {removeListing ? (
        <div>
          {listing && (
            <div>
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
            </div>
          )}
        </div>
      ) : null}
    </>
  );
});
