// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";

// import { increment, decrement } from "../features/counter/counterSlice";
import Banner from "../components/home/Banner";
import BestBoardList from "../components/home/BestBoardList";
import BestClassList from "../components/home/BestClassList";
import NewClassList from "../components/home/NewClassList";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Banner />
      <BestClassList />
      <NewClassList />
      <BestBoardList />
    </HomePageContainer>

    // <div>
    //   <button onClick={() => setModalOpen(true)}>모달 오픈</button>
    //   {modalOpen && (
    //     <Modal onClose={() => setModalOpen(false)}>
    //       <Div>hello</Div>
    //     </Modal>
    //   )}
    //   <h1>count: {count}</h1>
    //   <Button label="증가" size="sm" onClick={handleIncrement} />
    //   <Button label="증가" size="md" onClick={handleIncrement} />
    //   <Button
    //     label="감소"
    //     color="default"
    //     size="lg"
    //     onClick={handleDecrement}
    //   />
    //   <Button
    //     label="감소"
    //     color="default"
    //     size="xl"
    //     onClick={handleDecrement}
    //   />
    //   <OutlineButton label="증가" size="sm" onClick={handleIncrement} />
    //   <OutlineButton label="감소" color="default" onClick={handleDecrement} />
    //   <OutlineButton
    //     label="감소"
    //     size="lg"
    //     color="ACCENT1"
    //     onClick={handleDecrement}
    //   />
    //   <OutlineButton
    //     label="감소"
    //     size="xl"
    //     color="ACCENT1"
    //     onClick={handleDecrement}
    //   />
    //   <RoundButton label="증가" size="sm" onClick={handleIncrement} />
    //   <RoundButton label="감소" color="default" onClick={handleDecrement} />
    //   <RoundButton label="감소" size="lg" onClick={handleDecrement} />
    //   <RoundButton
    //     label="감소"
    //     color="default"
    //     size="xl"
    //     onClick={handleDecrement}
    //   />
    // </div>
  );
}

export default HomePage;
