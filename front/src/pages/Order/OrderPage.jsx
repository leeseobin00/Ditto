import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import styled from "styled-components";
import Swal from "sweetalert2";

import useAxios from "../../hooks/useAxios";

import RoundButton from "../../components/common/RoundButton";
import OutlineButton from "../../components/common/OutlineButton";
import AddressListModal from "../../components/Address/AddressListModal";
import AddressInput from "../../components/Address/AddressInput";

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
  width: 80%;
  padding-left: 50px;
  margin-bottom: 15px;
`;

function OrderPage() {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);
  const email = useSelector((state) => state.auth.email);
  const nickname = useSelector((state) => state.auth.nickname);

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
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    if (classInfo?.classPrice) {
      setTotalPrice(classInfo.classPrice + 3000);
    }
  }, [classInfo]);

  // 배송지 목록 모달 조작
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddressComplete, setIsAddressComplete] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address); // 선택된 주소를 상태로 저장
  };

  const handleAddressChange = (address) => {
    // 모든 필드가 입력되었는지 확인
    const isComplete =
      address.addressName &&
      address.zipCode &&
      address.address1 &&
      address.address2 &&
      address.phoneNumber &&
      address.receiver;
    setIsAddressComplete(isComplete); // 상태 업데이트
  };

  // 결제 구현
  const [payment, setPayment] = useState();
  const clientKey = "=====CLIENTKEY=====";
  const customerKey = uuidv4();

  const initializeTossPayments = async () => {
    const tossPayments = await loadTossPayments(clientKey);
    setPayment(tossPayments.payment({ customerKey }));
  };

  useEffect(() => {
    initializeTossPayments();
  }, []);

  async function requestPayment() {
    if (!isAddressComplete) {
      Swal.fire({
        title: "입력 오류",
        text: "배송지 정보를 정확히 입력해주세요.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });

      return;
    }
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await payment.requestPayment({
      method: "CARD", // 카드 결제
      amount: {
        currency: "KRW",
        value: totalPrice,
      },
      orderId: uuidv4(), // 고유 주분번호
      orderName: classInfo?.className,
      successUrl:
        `${window.location.origin}/order` +
        `/success?userId=${userId}&lectureId=${lectureId}`, // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
      customerEmail: email,
      customerName: nickname,
      // customerMobilePhone: nickname,
      // 카드 결제에 필요한 정보
      card: {
        useEscrow: false,
        flowMode: "DEFAULT", // 통합결제창 여는 옵션
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

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
          <RoundButton label={"결제하기"} size="lg" onClick={requestPayment} />
        </OrderPrice>
      </LineContainer>
      <OrderInfo style={{ height: "400px" }}>
        <TitleLine>
          <ContainerTitle>배송지 정보</ContainerTitle>
          <OutlineButton
            label={"배송지 목록"}
            size="sm"
            onClick={handleShowModal}
          />
        </TitleLine>
        <AddressContainer>
          <AddressInput
            onChange={handleAddressChange}
            initialAddress={selectedAddress}
          />
        </AddressContainer>
      </OrderInfo>
      <AddressListModal
        show={showModal}
        onClose={handleShowModal}
        userId={userId}
        onSelect={handleAddressSelect}
      />
    </OrderPageContainer>
  );
}

export default OrderPage;
