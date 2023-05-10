import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationStore } from "../../stores/ApplicationStore";
import { useParams } from "react-router-dom";

interface Props {
  appStore: ApplicationStore;
}

export const Listing = observer(function ({ appStore }: Props) {
  const { id } = useParams();

  const listing = appStore.listingList.find((l) => l.id.toString() === id);

  console.log(listing);

  return (
    <>
      {listing && (
        <div>
          <h1>{listing.title}</h1>
          {listing.authors.map((author: any) => (
            <h4 key={author.id}>
              {author.firstName} {author.lastName}
            </h4>
          ))}
          <h4>{listing.publishDate}</h4>
          <p>{listing.description}</p>
        </div>
      )}
    </>
  );
});
