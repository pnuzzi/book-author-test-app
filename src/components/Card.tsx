import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;

  button {
    width: 25px;
    height: 25px;
    border: 1px solid black;
    border-radius: 50%;
    background-color: white;

    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 10px 0;
  }
  h4 {
    font-size: 1.2rem;
    margin: 0 0 10px 0;
  }
  p {
    font-size: 1.1rem;
    margin: 0 0 10px 0;
  }
`;
