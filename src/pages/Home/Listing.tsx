import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../../AppContext";

import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface Props {}

export const Listing = observer(function (props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  let { state } = useLocation();

  return (
    <div>
      <h1>{state.title}</h1>
      {state.authors.map((author: any) => (
        <h4 key={author.id}>
          {author.firstName} {author.lastName}
        </h4>
      ))}
      <h4>{state.publishDate}</h4>
      <p>{state.description}</p>
    </div>
  );
});
