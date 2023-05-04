import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../../AppContext";
import { ApplicationStore } from "../../stores/ApplicationStore";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";

interface Props {
  appStore: ApplicationStore;
}

export const Listing = observer(function ({ appStore }: Props) {
  const { id } = useParams();

  // const listing = applicationStore.listingList.find(
  //   (l) => l.id.toString() === id
  // );

  // const appStore = ApplicationStore.getInstance();

  console.log(appStore);

  return (
    <div>
      {/* <h1>{listing.title}</h1>
      {listing.authors.map((author: any) => (
        <h4 key={author.id}>
          {author.firstName} {author.lastName}
        </h4>
      ))}
      <h4>{listing.publishDate}</h4>
      <p>{listing.description}</p> */}
    </div>
  );
});
