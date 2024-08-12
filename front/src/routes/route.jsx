import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClassListPage from "../pages/Class/ClassListPage";
import ClassDetailPage from "../pages/Class/ClassDetailPage";
import MeetingPage from "../pages/Meeting/MeetingPage";
import LoginPage from "../pages/User/LoginPage";
import KakaoCallback from "../pages/User/KakaoCallback";
import MyPage from "../pages/Mypage/MyPage";
import SignupPage from "../pages/User/SignupPage";
import BoardListPage from "../pages/Board/BoardListPage";
import BoardDetailPage from "../pages/Board/BoardDetailPage";
import BoardAddPage from "../pages/Board/BoardAddPage";
import ProfileDetailPage from "../pages/Profile/ProfileDetailPage";
import ProfileSearchPage from "../pages/Profile/ProfileSearchPage";
import UserInfoDetail from "../pages/Mypage/UserInfoPage/UserInfoDetailPage";
import PaymentPage from "../pages/Mypage/PaymentPage";
import ClassAddPage from "../pages/Class/ClassAddPage";
import ReviewListPage from "../pages/Mypage/ReviewListPage";
import LikedPage from "../pages/Mypage/LikedPage";
import ProAccountPage from "../pages/Mypage/UserInfoPage/ProUserInfoDetailPage";
import MileagePage from "../pages/Mypage/MileagePage";
import QuestionPage from "../pages/Mypage/QuestionPage";
import MyClassroomPage from "../pages/MyClassroom/MyClassroomPage";
import OrderPage from "../pages/Order/OrderPage";
import OrderSuccessPage from "../pages/Order/OrderSuccessPage";
import VideoPage from "../pages/Video/VideoPage";
import NoContentPage from "../pages/NoContent/NoContentPage";
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/classes/detail/:classId" element={<ClassDetailPage />} />
      <Route path="/classes" element={<ClassListPage />} />
      <Route path="/classes/:classCategory" element={<ClassListPage />} />
      <Route path="/classes/add" element={<ClassAddPage />} />
      <Route path="/classes/edit/:classId" element={<ClassAddPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/order/success" element={<OrderSuccessPage />} />
      <Route path="/meeting/:lectureId" element={<MeetingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/callback" element={<KakaoCallback />} />
      <Route path="/mypage/*" element={<MyPage />}>
        {/* Nested Routes */}
        <Route path="userinfo" element={<UserInfoDetail />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="question" element={<QuestionPage />} />
        <Route path="reviews" element={<ReviewListPage />} />
        <Route path="liked" element={<LikedPage />} />
        <Route path="prouserinfo" element={<ProAccountPage />} />
        <Route path="mileage" element={<MileagePage />} />
      </Route>
      <Route path="/myclassroom" element={<MyClassroomPage />} />
      <Route path="/board/all" element={<BoardListPage />} />
      <Route path="/board/talk" element={<BoardListPage />} />
      <Route path="/board/community" element={<BoardListPage />} />
      <Route path="/board/help" element={<BoardListPage />} />
      <Route path="/board/detail/:postId" element={<BoardDetailPage />} />
      <Route path="/board/add" element={<BoardAddPage />} />
      <Route path="/board/edit/:postId" element={<BoardAddPage />} />
      <Route path="/profile/:profileId" element={<PrivateRoute><ProfileDetailPage /></PrivateRoute>} />
      <Route path="/profile/search" element={<ProfileSearchPage />} />
      <Route path="/video" element={<VideoPage />} />
      <Route path="*" element={<NoContentPage />} />
    </Routes>
  );
};

export default AppRoutes;
