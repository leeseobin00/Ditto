import styled from "styled-components";

import AddressItem from "./AddressItem";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function AddressList() {
  return (
    <ListContainer>
      <AddressItem isPayment={true} />
    </ListContainer>
  );
}

export default AddressList;
