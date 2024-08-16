import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';
import Swal from 'sweetalert2';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
`;

const HorizontalGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const FormInput = styled.input`
  width: calc(100% - 10px);
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const NumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const NumberInput = styled.input`
  width: 60px;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  text-align: center;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const NumberButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  color: var(DARK);
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    background-color: var(--PRIMARY);
    color: var(--BACKGROUND_COLOR);
  }
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const TagButton = styled.button`
  margin: 5px;
  padding: 10px;
  border: 1px solid ${({ selected }) => (selected ? 'var(--PRIMARY)' : 'var(--BORDER_COLOR)')};
  background-color: ${({ selected }) => (selected ? 'var(--PRIMARY)' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : 'var(--TEXT_SECONDARY)')};
  cursor: pointer;
  border-radius: 15px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: var(--PRIMARY);
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: var(--PRIMARY_DARK);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  resize: none;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const Warning = styled.div`
  background-color: #fff8e1;
  border: 1px solid #ffeb3b;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: left;
  color: #ff9800;
  p:first-child {
    font-weight: bold;
    color: #e65100;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SubTitle = styled.h3`
  color: var(--PRIMARY);
  margin-bottom: 20px;
  margin-top: 30px;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--TEXT_TERTIARY);
    position: absolute;
    bottom: -5px;
    left: 0;
    opacity: 0.5;
  }
`;

const Message = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const tags = ['향수', '향초', '비누', '뜨개질', '바느질', '가죽', '십자수', '키링', '모빌', '미니어처', '푸드'];


const validateName = (name) => {
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

const ProSignupForm = ({ formData, setFormData }) => {
  const [selectedTags, setSelectedTags] = useState(formData.tags || []);
  const [agree, setAgree] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setSelectedTags(formData.tags || []);
  }, [formData.tags]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagClick = (tag) => {
    setFormData((prevFormData) => {
      const newTags = prevFormData.tags ? (prevFormData.tags.includes(tag)
        ? prevFormData.tags.filter((t) => t !== tag)
        : [...prevFormData.tags, tag].slice(0, 3)) : [tag];
      return {
        ...prevFormData,
        tags: newTags,
      };
    });
  };

  const handleIncrease = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      minActive: (prevFormData.minActive || 0) + 1,
    }));
  };

  const handleDecrease = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      minActive: Math.max((prevFormData.minActive || 0) - 1, 0),
    }));
  };

  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: formattedPhoneNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let errors = {};
    if (!validateName(formData.name)) {
      errors.name = "이름은 한글 또는 영문만 입력 가능합니다.";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "전화번호를 입력해 주세요.";
    }
    if (!formData.startDate) {
      errors.startDate = "클래스 시작 가능일을 입력해 주세요.";
    }
    if (!formData.minActive) {
      errors.minActive = "활동 최소 기간을 입력해 주세요.";
    }
    if (!formData.experience) {
      errors.experience = "클래스 진행 경험을 입력해 주세요.";
    }
    if (!formData.comment) {
      errors.comment = "각오를 입력해 주세요.";
    }
    if (!formData.tags || formData.tags.length === 0) {
      errors.tags = "최소 하나 이상의 분야를 선택해 주세요.";
    }
  
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        title: '입력 오류',
        text: '필수 입력 사항을 모두 입력해 주세요.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7F50',
      });
      return;
    }
  
    if (!agree) {
      Swal.fire({
        title: '주의 사항',
        text: '주의 사항을 확인하고 체크해 주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7F50',
      });
      return;
    }
  
    const instructorData = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      role: formData.role,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      startDate: formData.startDate,
      minActive: formData.minActive,
      experience: formData.experience,
      comment: formData.comment,
      agreeTOS: formData.agreeTOS,
      agreePICU: formData.agreePICU,
      tags: formData.tags,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/users/signup/form', instructorData);
      Swal.fire({
        title: '가입 신청 완료',
        text: '가입 신청이 성공적으로 완료되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7F50',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('서버로 데이터 전송 중 오류 발생:', error);
      Swal.fire({
        title: '오류 발생',
        text: '가입 신청 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7F50',
      });
    }
  };
  

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Warning>
        <p><strong>지원서 작성 전 꼭 확인(체크) 후 제출해주세요.</strong></p>
        <p>자격 검토 후 Ditto 강사 활동에 적합하신 분께는 최대 2주 내로 작성하신 전화번호로 개별 연락드립니다.</p>
        <p>만 18세 이상부터 Ditto 강사 가입이 가능합니다.</p>
        <p>강사 가입 후 최소 1개 이상의 클래스를 등록해야 합니다.</p>
      </Warning>
      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          name="agree"
          checked={agree}
          onChange={handleCheckboxChange}
        />
        <FormLabel onClick={() => setAgree(!agree)}>위 내용을 확인했으며 동의합니다.</FormLabel>
      </CheckboxGroup>
      <SubTitle>기본 정보를 정확히 입력해주세요.</SubTitle>
      <HorizontalGroup>
        <FormGroup>
          <FormLabel>이름</FormLabel>
          <FormInput
            type="text"
            name="name"
            value={formData.name || ''}
            placeholder="주민등록상 본명"
            onChange={handleChange}
            required
          />
          {formErrors.name && <Message>{formErrors.name}</Message>}
        </FormGroup>
        <FormGroup>
          <FormLabel>전화번호</FormLabel>
          <FormInput
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            placeholder="'-' 없이 입력"
            onChange={handlePhoneNumberChange}
            required
          />
          {formErrors.phoneNumber && <Message>{formErrors.phoneNumber}</Message>}
        </FormGroup>
      </HorizontalGroup>
      <SubTitle>클래스 등록이 가능한 분야를 모두 선택해주세요.</SubTitle>
      <TagGroup>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            selected={selectedTags.includes(tag)}
            disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
          >
            {tag}
          </TagButton>
        ))}
      </TagGroup>
      {formErrors.tags && <Message>{formErrors.tags}</Message>}
      <SubTitle>클래스 시작 가능일을 입력해주세요.</SubTitle>
      <FormGroup>
        <FormInput
          type="date"
          name="startDate"
          value={formData.startDate || ''}
          onChange={handleChange}
          required
        />
        {formErrors.startDate && <Message>{formErrors.startDate}</Message>}
      </FormGroup>
      <SubTitle>Ditto 강사 활동 최소기간을 입력해주세요.</SubTitle>
      <FormGroup>
        <FormLabel>최소</FormLabel>
        <NumberInputWrapper>
          <NumberButton type="button" onClick={handleDecrease}>-</NumberButton>
          <NumberInput
            type="number"
            name="minActive"
            value={formData.minActive || 0}
            readOnly
          />
          <NumberButton type="button" onClick={handleIncrease}>+</NumberButton>
          <span>개월</span>
        </NumberInputWrapper>
        {formErrors.minActive && <Message>{formErrors.minActive}</Message>}
      </FormGroup>
      <SubTitle>클래스 진행 경험이 있으신가요? 있다면 입력해주세요.</SubTitle>
      <FormGroup>
        <Textarea
          name="experience"
          value={formData.experience || ''}
          placeholder="최대한 상세히 입력해주세요 . (분야/기간/강의명/수강생 수)"
          onChange={handleChange}
          rows="4"
          required
        />
        {formErrors.experience && <Message>{formErrors.experience}</Message>}
      </FormGroup>
      <SubTitle>Ditto 강사 활동에 임하는 각오 한마디!</SubTitle>
      <FormGroup>
        <Textarea
          name="comment"
          value={formData.comment || ''}
          onChange={handleChange}
          rows="4"
          required
        />
        {formErrors.comment && <Message>{formErrors.comment}</Message>}
      </FormGroup>
      <SubmitButton type="submit">가입 신청</SubmitButton>
    </StyledForm>
  );
};

export default ProSignupForm;
