import styled from "styled-components";

const GraphCard = styled.div`
  background-color: #1f1c30;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 0 1rem 1rem 1rem;
  min-width: 28vw;
  max-width: 90vw;

  @media (max-width: 1025px) {
    width: 90vw;
  }
`;
export default GraphCard;
