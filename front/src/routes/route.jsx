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
import PaymentPage from "../pages/Mypage/PaymentPage/PaymentPage";
import ClassAddPage from "../pages/Class/ClassAddPage";
import MyQuestionsPage from "../pages/Mypage/QuestionPage/MyQuestionsPage";
import ReviewListPage from "../pages/Mypage/ReviewListPage/ReviewListPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/class/:classCategory" element={<ClassListPage />} />
      <Route path="/class/:classId" element={<ClassDetailPage />} />
      <Route path="/class" element={<ClassDetailPage />} />
      <Route path="/class/add" element={<ClassAddPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/callback" element={<KakaoCallback />} />
      <Route path="/mypage/*" element={<MyPage />}> {/* Nested Routes */}
        <Route path="account" element={<UserInfoDetail />} />
        <Route path="payments" element={<PaymentPage />} />
        <Route path="questions" element={<MyQuestionsPage />} />
        <Route path="reviews" element={<ReviewListPage />} />
      </Route>
      <Route path="/board/:boardCategory" element={<BoardListPage />} />
      <Route path="/board/:boardCategory/:postId" element={<BoardDetailPage />} />
      <Route path="/board/add" element={<BoardAddPage />} />
      <Route path="/board/edit/:postId" element={<BoardAddPage />} />
      <Route path="/profile" element={<ProfileDetailPage />} />
      <Route path="/profile/my" element={<ProfileDetailPage />} />
      <Route path="/profile/search" element={<ProfileSearchPage />} />
    </Routes>
  );
};

export default AppRoutes;
