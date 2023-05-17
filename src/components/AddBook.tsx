import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../AppContext";

import styled from "styled-components";
import { ApplicationStore } from "../stores";
import { Button } from "./Button";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    margin-bottom: 10px;
    width: 300px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #000;
  }
`;

const ErrorMessage = styled.p`
  padding: 10px;
  color: #ffc312;
  background-color: #ea2027;
  tex-align: center;
  max-width: 400px;
`;

interface Props {
  appStore: ApplicationStore;
}

export const AddBook = observer(function ({ appStore }: Props) {
  const [title, setTitle] = React.useState("");
  const [authorFirst, setAuthorFirst] = React.useState("");
  const [authorLast, setAuthorLast] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const [toggleAddBookForm, setToggleAddBookForm] = React.useState(false);

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
      appStore.addListing(
        Math.random(),
        [
          {
            id: Math.random(),
            idBook: Math.random(),
            firstName: authorFirst,
            lastName: authorLast,
          },
        ],
        title,
        100,
        desc,
        date
      );
      setShowError(false);
    }
  };

  return (
    <>
      <Button onClick={() => setToggleAddBookForm(!toggleAddBookForm)}>
        Show/Hide Add Book Form
      </Button>
      {toggleAddBookForm ? (
        <Wrapper>
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
            <Button type="submit">Add Book</Button>
          </Form>
          {showError ? (
            <ErrorMessage>ADD ALL FIELDS TO THE FORM</ErrorMessage>
          ) : null}
        </Wrapper>
      ) : null}
    </>
  );
});
