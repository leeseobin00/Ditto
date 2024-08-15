import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2"; 

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: '접근 권한이 없습니다',
        text: '로그인 해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: "#FF7F50",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
