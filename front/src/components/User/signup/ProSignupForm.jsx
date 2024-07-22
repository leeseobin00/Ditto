import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
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

const ProSignupForm = ({ formData, setFormData }) => {
  const tags = ['향수', '향초', '비누', '뜨개질', '바느질', '가죽', '십자수', '키링', '모빌', '미니어처', '푸드'];
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTagClick = (tag) => {
    let newTags = [...selectedTags];
    if (newTags.includes(tag)) {
      newTags = newTags.filter((t) => t !== tag);
    } else if (newTags.length < 3) {
      newTags.push(tag);
    }
    setSelectedTags(newTags);
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:8080/users/signup/form', formData);
      console.log('Submitted Data:', response.data);
      alert("가입 신청이 완료되었습니다.");
      navigate('/');
    } catch (error) {
      console.error('서버로 데이터 전송 중 오류 발생:', error);
      alert('가입 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel>이름</FormLabel>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>전화번호</FormLabel>
        <FormInput
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>클래스 등록이 가능한 분야를 모두 선택해주세요.</FormLabel>
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
      </FormGroup>
      <FormGroup>
        <FormLabel>클래스 시작 가능일을 입력해주세요.</FormLabel>
        <FormInput
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Ditto 강사 활동 최소기간을 입력해주세요.</FormLabel>
        <FormInput
          type="number"
          name="minActive"
          value={formData.minActive}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>클래스 진행 경험이 있으신가요? 있다면 입력해주세요.</FormLabel>
        <FormInput
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Ditto 강사 활동에 임하는 각오 한마디!</FormLabel>
        <FormInput
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </FormGroup>
      <SubmitButton type="submit">가입 신청</SubmitButton>
    </StyledForm>
  );
};

export default ProSignupForm;
