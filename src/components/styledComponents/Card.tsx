import styled from "styled-components";

const Card = styled.div`
  background-color: "${(props) => props.theme.backgroundColor}";
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  // width: 97%;
`;

export default Card;
