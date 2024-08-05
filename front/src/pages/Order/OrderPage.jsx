import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios";
import Button from "../../components/common/Button";
import RoundButton from "../../components/common/RoundButton";
import OutlineButton from "../../components/common/OutlineButton";
import AddressListModal from "../../components/Order/AddressListModal";

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
  height: 330px;
  display: flex;
  flex-direction: column;
  padding: 15px;
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
  align-items: center;
  margin: 5px;
`;

const AddressLineContainer = styled(LineContainer)`
  width: 580px;
`;

const OrderInfo = styled(Container)`
  width: 65%;
  justify-content: space-between;
  min-width: 630px;
`;

const OrderPrice = styled(Container)`
  width: 30%;
  min-width: 250px;
  max-width: 300px;
  justify-content: space-between;
  padding: 25px;
`;

const ItemInfo = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 10px;
`;

const Insctructor = styled.div`
  font-size: 16px;
`;

const LectureDate = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const PriceDiv = styled.div`
  font-size: 18px;
`;

const Bold = styled(PriceDiv)`
  font-weight: 600;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const ContainerTitle = styled(Bold)`
  font-size: 20px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;
  margin-right: 5px;
  width: 15%;
`;

const Img = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 10px;
  margin-left: 5px;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 1px solid var(--BACKGROUND_SECONDARY);
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-bottom: 15px;
`;

const Label = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;
`;

const Input = styled.input`
  font-family: inherit;
  border-radius: 20px;
  width: 370px;
  margin: 3px 0;
  height: 25px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--BORDER_COLOR);
  padding: 10px;

  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
  }
`;

const AddressInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 580px;
  margin: 5px;
`;

const AddressInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
`;

const PostNumLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 370px;
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

  useEffect(() => {
    handlePageAuth();
  }, []);

  const location = useLocation();

  // 나중에 Info 변수 통합할 예정 현재 test
  const [paymentInfo, setPaymentInfo] = useState({
    classId: "",
    lectureId: "",
  });
  const [classId, setClassId] = useState(null);
  const [lectureId, setLectureId] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [lectureList, setLectureList] = useState(null);
  const [lectureInfo, setLectureInfo] = useState(null);

  const { sendRequest: getClassInfo, sendRequest: getLectureList } = useAxios();

  const handleGetOrderInfo = async () => {
    try {
      const classResponse = await getClassInfo(
        `/classes/${classId}`,
        null,
        "get"
      );
      setClassInfo(classResponse?.data);
      const lectureResponse = await getLectureList(
        `/classes/${classId}/lectures`,
        null,
        "get"
      );
      setLectureList(lectureResponse?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setClassId(searchParams.get("classId"));
    setLectureId(searchParams.get("lectureId"));

    if (classId && lectureId) {
      setPaymentInfo({ classId, lectureId });
    }
  }, [location.search]);

  useEffect(() => {
    if (classId && lectureId) {
      handleGetOrderInfo();
    }
  }, [classId, lectureId, paymentInfo]);

  // lectureList에서 선택한 lectureId와 일치하는 lecture를 반환
  const findLectureById = (lectureList, lectureId) => {
    return (
      lectureList?.find((lecture) => lecture.lectureId == lectureId) || null
    );
  };

  useEffect(() => {
    if (lectureList && lectureId) {
      const lecture = findLectureById(lectureList, lectureId);
      setLectureInfo(lecture);
    }
  }, [lectureList, lectureId]);

  // 배송지 목록 모달 조작
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  // 다음 주소 API 호출
  const [address, setAddress] = useState({
    zonecode: "",
    fullAddress: "",
    detailAddress: "",
  });

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress({
      ...address,
      zonecode: data.zonecode,
      fullAddress,
    });
  };

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  const detailAddressRef = useRef();

  return (
    <OrderPageContainer>
      <Title>Order</Title>
      <LineContainer>
        <OrderInfo>
          <LineContainer>
            <Img
              src={`http://i11a106.p.ssafy.io:8080/files/download/${classInfo?.file?.fileId}`}
              alt="class-thumbnail"
            />
            <ItemInfo>
              <Bold>{classInfo?.className}</Bold>
              <Insctructor>{classInfo?.user?.nickname}</Insctructor>
              <LectureDate>
                {lectureInfo?.year}-
                {String(lectureInfo?.month).padStart(2, "0")}-
                {String(lectureInfo?.day).padStart(2, "0")}&nbsp;&nbsp;
                {String(lectureInfo?.hour).padStart(2, "0")}:
                {String(lectureInfo?.minute).padStart(2, "0")}
              </LectureDate>
            </ItemInfo>
            <Price>{classInfo?.classPrice.toLocaleString()} 원</Price>
          </LineContainer>
          <LineContainer>
            <Img
              src={`http://i11a106.p.ssafy.io:8080/files/download/${classInfo?.kit?.file?.fileId}`}
              alt="kit-img"
            />
            <Bold style={{ width: "50%", margin: "0 10px" }}>
              {classInfo?.kit?.kitName}
            </Bold>
            <Price>0 원</Price>
          </LineContainer>
        </OrderInfo>
        <OrderPrice>
          <ContainerTitle>금액</ContainerTitle>
          <PriceContainer>
            <LineContainer>
              <PriceDiv>총 상품금액</PriceDiv>
              <Bold>{classInfo?.classPrice?.toLocaleString()} 원</Bold>
            </LineContainer>
            <LineContainer>
              <PriceDiv>배송비</PriceDiv>
              <Bold>+ 3,000 원</Bold>
            </LineContainer>
            <Hr />
            <LineContainer>
              <PriceDiv>결제 예정 금액</PriceDiv>
              <Bold>{(classInfo?.classPrice + 3000).toLocaleString()} 원</Bold>
            </LineContainer>
          </PriceContainer>
          <RoundButton label={"결제하기"} size="lg" />
        </OrderPrice>
      </LineContainer>
      <OrderInfo>
        <TitleLine>
          <ContainerTitle>배송지 정보</ContainerTitle>
          <OutlineButton
            label={"배송지 목록"}
            size="sm"
            onClick={handleShowModal}
          />
        </TitleLine>
        <AddressContainer>
          <AddressLineContainer>
            <Label>배송지명</Label>
            <Input type="text" />
          </AddressLineContainer>
          <AddressInputContainer>
            <Label style={{ alignItems: "flex-start" }}>주소</Label>
            <AddressInput>
              <PostNumLine>
                <Input
                  type="text"
                  style={{ width: "240px" }}
                  placeholder="우편번호"
                  value={address.zonecode}
                  readOnly
                />
                <Button
                  size={"sm"}
                  label={"우편번호 검색"}
                  onClick={handleSearchAddress}
                />
              </PostNumLine>
              <Input
                type="text"
                placeholder="도로명(지번) 주소"
                value={address.fullAddress}
                readOnly
              />
              <Input
                type="text"
                placeholder="상세 주소"
                value={address.detailAddress}
                onChange={(e) =>
                  setAddress({ ...address, detailAddress: e.target.value })
                }
                ref={detailAddressRef}
              />
            </AddressInput>
          </AddressInputContainer>
          <AddressLineContainer>
            <Label>연락처</Label>
            <Input type="text" />
          </AddressLineContainer>
          <AddressLineContainer>
            <Label>수령인</Label>
            <Input type="text" />
          </AddressLineContainer>
        </AddressContainer>
      </OrderInfo>
      <AddressListModal show={showModal} onClose={handleShowModal} />
    </OrderPageContainer>
  );
}

export default OrderPage;
