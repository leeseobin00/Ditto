import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ClassListPage from "../pages/Class/ClassListPage";
import ClassDetailPage from "../pages/Class/ClassDetailPage";
import MeetingPage from "../pages/MeetingPage";
import BoardListPage from "../pages/Board/BoardListPage";
import BoardDetailPage from "../pages/Board/BoardDetailPage";
import BoardAddPage from "../pages/Board/BoardAddPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/class/:classCategory" element={<ClassListPage />} />
      <Route path="/class/:classId" element={<ClassDetailPage />} />
      <Route path="/class" element={<ClassDetailPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/board/:boardCategory" element={<BoardListPage />} />
      <Route
        path="/board/:boardCategory/:postId"
        element={<BoardDetailPage />}
      />
      <Route path="/board/add" element={<BoardAddPage />} />
      <Route path="/board/edit/:postId" element={<BoardAddPage />} />
      {/* <Route path="/nasa" element={
        <PrivateRoute>
          <></>
        </PrivateRoute>
      } /> */}
    </Routes>
  );
};

export default AppRoutes;
