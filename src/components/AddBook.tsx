import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../AppContext";

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  input {
    margin-bottom: 10px;
  }

  button {
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  background-color: yellow;
  max-width: 400px;
`;

interface Props {}

export const AddBook = observer(function (props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  const [title, setTitle] = React.useState("");
  const [authorFirst, setAuthorFirst] = React.useState("");
  const [authorLast, setAuthorLast] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const onChangeInputs = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.currentTarget.name === "title") setTitle(e.currentTarget.value);
    if (e.currentTarget.name === "authorFirst")
      setAuthorFirst(e.currentTarget.value);
    if (e.currentTarget.name === "authorLast")
      setAuthorLast(e.currentTarget.value);
    if (e.currentTarget.name === "desc") setDesc(e.currentTarget.value);
    if (e.currentTarget.name === "date") {
      const newDate = new Date(e.currentTarget.value.toString());
      console.log(newDate);

      const year = newDate.getUTCFullYear();
      const month = newDate.getUTCMonth() + 1;
      const day = newDate.getUTCDate();
      const dateString = `${month}/${day}/${year}`;
      setDate(dateString);
    }
  };

  const addBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      title === "" ||
      authorFirst === "" ||
      authorLast === "" ||
      desc === "" ||
      date === ""
    ) {
      setShowError(true);
    } else {
      applicationStore.addListing(
        Math.random(),
        [{ id: 1, idBook: 1, firstName: authorFirst, lastName: authorLast }],
        title,
        100,
        desc,
        date
      );
      setShowError(false);
    }
  };

  return (
    <div>
      <h3>Add Book</h3>
      <Form onSubmit={addBook}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={onChangeInputs} />
        <label htmlFor="author">Author First Name</label>
        <input type="text" name="authorFirst" onChange={onChangeInputs} />
        <label htmlFor="author">Author Last Name</label>
        <input type="text" name="authorLast" onChange={onChangeInputs} />
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc" onChange={onChangeInputs} />
        <label htmlFor="date">Date</label>
        <input type="date" name="date" onChange={onChangeInputs} />
        <button type="submit">Add Book</button>
      </Form>
      {showError ? (
        <ErrorMessage>Add all fields to the form</ErrorMessage>
      ) : null}
    </div>
  );
});
