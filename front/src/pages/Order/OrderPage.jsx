import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const Container = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-style: solid;
  border-color: var(--BORDER_COLOR);
  border-radius: 10px;
  border-width: 1px;
  margin: 30px 10px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OrderInfo = styled(Container)`
  width: 60%;
`;

const OrderPrice = styled(Container)`
  width: 30%;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
`;

function OrderPage() {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  const navigate = useNavigate();

  const handlePageAuth = () => {
    if (userId == null) {
      navigate("/");
      return;
    }
    if (roleId != 1) {
      navigate("/");
      return;
    }
  };

  const location = useLocation();
  const { state } = location;

  const classInfo = state?.classInfo;
  const lectureInfo = state?.lectureInfo;

  useEffect(() => {
    handlePageAuth();
    console.log(state);
    console.log(classInfo.clssName);
  }, []);

  return (
    <OrderPageContainer>
      <Title>Order</Title>
      <LineContainer>
        <OrderInfo>
          <LineContainer>
            <Img
              src={`http://i11a106.p.ssafy.io:8080/files/download/${classInfo?.file?.fileId}`}
            />
          </LineContainer>
          <LineContainer>dd</LineContainer>
        </OrderInfo>
        <OrderPrice>dd</OrderPrice>
      </LineContainer>
      <OrderInfo>dd</OrderInfo>
    </OrderPageContainer>
  );
}

export default OrderPage;
