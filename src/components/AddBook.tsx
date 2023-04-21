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

interface Props {}

export const AddBook = observer(function (props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState("");

  const onChangeInputs = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.currentTarget.name === "title") setTitle(e.currentTarget.value);
    if (e.currentTarget.name === "author") setAuthor(e.currentTarget.value);
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
    console.log(title, author, date);
  };

  return (
    <div>
      <h3>Add Book</h3>
      <Form onSubmit={addBook}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={onChangeInputs} />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" onChange={onChangeInputs} />
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc" onChange={onChangeInputs} />
        <label htmlFor="date">Date</label>
        <input type="date" name="date" onChange={onChangeInputs} />
        <button type="submit">Add Book</button>
      </Form>
    </div>
  );
});
