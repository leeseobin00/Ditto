import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;
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

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
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

const InstructorApplicationForm = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>강사 지원서</h2>
        <FormGroup>
          <FormLabel>이름</FormLabel>
          <FormInput
            type="text"
            name="name"
            placeholder="이름 입력"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>전화번호</FormLabel>
          <FormInput
            type="text"
            name="phoneNumber"
            placeholder="전화번호 입력"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>클래스 시작 가능일</FormLabel>
          <FormInput
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>활동 최소 기간</FormLabel>
          <FormInput
            type="number"
            name="minActive"
            placeholder="개월 단위로 입력"
            value={formData.minActive || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>경력</FormLabel>
          <FormTextarea
            name="experience"
            placeholder="경력 입력"
            value={formData.experience || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>활동에 임하는 각오 한마디</FormLabel>
          <FormTextarea
            name="comment"
            placeholder="활동에 임하는 각오 한마디 입력"
            value={formData.comment || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">제출</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default InstructorApplicationForm;
