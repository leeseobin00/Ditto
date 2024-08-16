import { useState } from "react";
import styled from "styled-components";

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

function AddressList({
  addresses,
  isPayment = false,
  userId,
  onUpdate,
  onEdit,
  onAddressSelect,
}) {
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressSelect = (address) => {
    const newSelectedId =
      address.addressId === selectedAddressId ? null : address.addressId;
    setSelectedAddressId(newSelectedId);
    onAddressSelect(address);
  };

  return (
    <ListContainer>
      {addresses?.length > 0 ? (
        addresses.map((address) => (
          <AddressItem
            key={address.addressId}
            isPayment={isPayment}
            address={address}
            userId={userId}
            onUpdate={onUpdate}
            onEdit={() => onEdit(address)}
            isSelected={selectedAddressId == address.addressId}
            onAddressSelect={handleAddressSelect}
          />
        ))
      ) : (
        <AddressNull>등록된 배송지가 없습니다.</AddressNull>
      )}
    </ListContainer>
  );
}

export default AddressList;
