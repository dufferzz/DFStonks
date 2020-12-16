import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  width: 95%;
  margin: auto;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #251f2d;
  min-height: 100vh;
  background-color: #26283d;
  color: #a4a3ad;

  @media (max-width: 1025px) {
    padding: 0;
    margin: 0;
    width: 99% !important;
  }
`;

export default Container;
