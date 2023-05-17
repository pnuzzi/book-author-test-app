import styled from "styled-components";

export const Button = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  margin: 0 0 10px 0;

  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }

  &:active {
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
  }
`;
