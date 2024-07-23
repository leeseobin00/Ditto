import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ClassListPage from "../pages/Class/ClassListPage";
import ClassDetailPage from "../pages/Class/ClassDetailPage";
import MeetingPage from "../pages/MeetingPage";
import LoginPage from "../pages/User/LoginPage";
import KakaoCallback from "../pages/User/KakaoCallback";
import MyPage from "../pages/Mypage/MyPage";
import SignupPage from "../pages/User/SignupPage";
import BoardListPage from "../pages/Board/BoardListPage";
import BoardDetailPage from "../pages/Board/BoardDetailPage";
import BoardAddPage from "../pages/Board/BoardAddPage";
import ProfileDetailPage from "../pages/Profile/ProfileDetailPage";
import ProfileSearchPage from "../pages/Profile/ProfileSearchPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/class/:classCategory" element={<ClassListPage />} />
      <Route path="/class/:classId" element={<ClassDetailPage />} />
      <Route path="/class" element={<ClassDetailPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/callback" element={<KakaoCallback />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/board/:boardCategory" element={<BoardListPage />} />
      <Route
        path="/board/:boardCategory/:postId"
        element={<BoardDetailPage />}
      />
      <Route path="/board/add" element={<BoardAddPage />} />
      <Route path="/board/edit/:postId" element={<BoardAddPage />} />
      <Route path="/profile" element={<ProfileDetailPage />} />
      <Route path="/profile/my" element={<ProfileDetailPage />} />
      <Route path="/profile/search" element={<ProfileSearchPage />} />
      {/* <Route path="/nasa" element={
        <PrivateRoute>
          <></>
        </PrivateRoute>
      } /> */}
    </Routes>
  );
};

export default AppRoutes;
