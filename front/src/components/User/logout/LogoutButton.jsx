import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice'; // 로그아웃 액션 가져오기
import Swal from 'sweetalert2';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      text: "로그아웃하면 다시 로그인해야 합니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF7F50',
      cancelButtonColor: '#d33',
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          icon: "success",
          title: "로그아웃 완료",
          text: "성공적으로 로그아웃 되었습니다.",
          confirmButtonColor: '#FF7F50',
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
