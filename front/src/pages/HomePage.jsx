import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";

import { increment, decrement } from "../features/counter/counterSlice";
import Button from "../components/common/Button";
import RoundButton from "../components/common/RoundButton";
import OutlineButton from "../components/common/OutlineButton";
import Modal from "../components/common/Modal";

const Div = styled.div`
  background-color: var(--LIGHT);
`;

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>모달 오픈</button>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Div>hello</Div>
        </Modal>
      )}
      <h1>count: {count}</h1>
      <Button label="증가" size="sm" onClick={handleIncrement} />
      <Button label="증가" size="md" onClick={handleIncrement} />
      <Button
        label="감소"
        color="default"
        size="lg"
        onClick={handleDecrement}
      />
      <Button
        label="감소"
        color="default"
        size="xl"
        onClick={handleDecrement}
      />
      <OutlineButton label="증가" size="sm" onClick={handleIncrement} />
      <OutlineButton label="감소" color="default" onClick={handleDecrement} />
      <OutlineButton
        label="감소"
        size="lg"
        color="ACCENT1"
        onClick={handleDecrement}
      />
      <OutlineButton
        label="감소"
        size="xl"
        color="ACCENT1"
        onClick={handleDecrement}
      />
      <RoundButton label="증가" size="sm" onClick={handleIncrement} />
      <RoundButton label="감소" color="default" onClick={handleDecrement} />
      <RoundButton label="감소" size="lg" onClick={handleDecrement} />
      <RoundButton
        label="감소"
        color="default"
        size="xl"
        onClick={handleDecrement}
      />
    </div>
  );
}

export default HomePage;
