import { useLocation } from "react-router-dom";

import AppRoutes from "./routes/route";
import PlainLayout from "./components/common/PlainLayout";
import Layout from "./components/common/Layout";

function App() {
  const location = useLocation();

  // Header를 렌더링하지 않을 경로 목록
  const noHeaderRoutes = ["/meeting"];

  if (noHeaderRoutes.includes(location.pathname)) {
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
