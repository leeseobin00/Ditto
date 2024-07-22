import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MeetingPage from "../pages/MeetingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage"
import KakaoCallback from "../pages/KakaoCallback";
import MyPage from "../pages/MyPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/callback" element={<KakaoCallback />} />
      <Route path="/mypage" element={<MyPage />} />
      {/* <Route path="/nasa" element={
        <PrivateRoute>
          <></>
        </PrivateRoute>
      } /> */}
    </Routes>
  );
};

export default AppRoutes;
