import { useLocation, useMatch } from "react-router-dom";
import AppRoutes from "./routes/route";
import PlainLayout from "./components/common/PlainLayout";
import Layout from "./components/common/Layout";

function App() {
  const location = useLocation();

  // /meeting/:lectureId 경로 패턴에 매칭되는지 확인
  const noHeaderMatch = useMatch("/meeting/:lectureId");

  if (noHeaderMatch) {
    return (
      <PlainLayout>
        <AppRoutes />
      </PlainLayout>
    );
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
