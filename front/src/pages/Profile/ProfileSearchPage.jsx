import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";

import Button from "../../components/common/Button";
import OutlineButton from "../../components/common/OutlineButton";
import Filter from "../../components/Board/Filter";
import SelectBox from "../../components/Board/SelectBox";
import SelectTag from "../../components/Board/SelectTag";
import Section from "../../components/Profile/ProfileDetail/Section";
import Profile from "../../components/Profile/Profile";
import { getTagsForCategory } from "../../utils/options";
import {
  SEARCH_CATEGORY_OPTIONS,
  getCategoryLabelByValue,
} from "../../utils/searchOptions";

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`;

const PageTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 24px;
  width: 100%;
  margin-bottom: 32px;
`;

const Filters = styled.div`
  min-height: 160px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 48px;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Input = styled.input`
  width: 160px;
  padding: 6px 8px;
  border-radius: 10px;
  background-color: var(--LIGHT);
  border: 1px solid var(--BORDER_COLOR);
  &:focus {
    outline: none;
  }
`;

const CustomSearchIcon = styled(BsSearch)`
  color: var(--LIGHT);
  font-size: 16px;
`;

const Profiles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  width: calc(780px + 64px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: calc(520px + 32px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    width: 260px;
    gap: 0px;
  }
`;

function ProfileSearchPage() {
  const [categoryId, setCategoryId] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(0);

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
    setTagId(0);
  };

  const handleTag = (tagValue) => {
    if (tagValue === tagId) {
      setTagId(0);
    } else {
      setTagId(tagValue);
    }
  };

  useEffect(() => {
    setTags(getTagsForCategory(categoryId));
  }, [categoryId]);

  return (
    <Wrapper>
      <PageTitle>프로필 찾기</PageTitle>
      <Filters>
        <FilterWrapper>
          <Filter title="닉네임">
            <Input />
          </Filter>
          <Filter title="카테고리">
            <SelectBox
              options={SEARCH_CATEGORY_OPTIONS}
              onChange={handleCategory}
              curOption={getCategoryLabelByValue(categoryId)}
            />
          </Filter>
          <Button label={<CustomSearchIcon />} />
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="태그">
            <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
          </Filter>
        </FilterWrapper>
      </Filters>

      <Section title="강사" onClick>
        <Profiles>
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </Profiles>
      </Section>

      <Section title="일반 회원" onClick>
        <Profiles>
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </Profiles>
      </Section>
    </Wrapper>
  );
}

export default ProfileSearchPage;
