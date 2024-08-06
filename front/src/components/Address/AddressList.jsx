import styled from "styled-components";

import useAxios from "../../hooks/useAxios";
import AddressItem from "./AddressItem";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddressNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

function AddressList({ addresses }) {
  return (
    <ListContainer>
      {addresses ? (
        addresses.map((address) => (
          <AddressItem key={address.id} isPayment={true} address={address} />
        ))
      ) : (
        <AddressNull>등록된 배송지가 없습니다.</AddressNull>
      )}
    </ListContainer>
  );
}

export default AddressList;
