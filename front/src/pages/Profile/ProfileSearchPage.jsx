import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../../components/common/Button";
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
import useAxios from "../../hooks/useAxios";

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
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.nickname);
  const { sendRequest: getProfile } = useAxios();
  // state
  const [categoryId, setCategoryId] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(0);
  const [keyword, setKeyword] = useState("");

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

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    setTags(getTagsForCategory(categoryId));
  }, [categoryId]);

  const [profiles, setProfiles] = useState([]);
  const [teacherProfiles, setTeacherProfiles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(1);
  const [teacherTotalPage, setTeacherTotalPage] = useState(1);

  const handleGetTeacherProfile = async () => {
    if (currentTeacherPage <= teacherTotalPage) {
      const params = {
        page: 1,
        size: currentTeacherPage*1,
        ...(categoryId == 0 ? { categoryId: "" } : { categoryId: categoryId }),
        ...(tagId == 0 ? { tagId: "" } : { tagId: tagId }),
        role: 2,
        keyword: keyword,
      };

      const searchParams = new URLSearchParams(params).toString();
      const url = `/profiles?${searchParams}`;

      const result = await getProfile(url, null, "get");
      if (result) {
        setTeacherProfiles(result?.data?.profiles);
        setTeacherTotalPage(result?.data?.totalPageCount);
      }
    }
  };

  const handleGetProfile = async () => {
    if (currentPage <= totalPage) {
      const params = {
        page: 1,
        size: currentPage*1,
        ...(categoryId == 0 ? { categoryId: "" } : { categoryId: categoryId }),
        ...(tagId == 0 ? { tagId: "" } : { tagId: tagId }),
        role: 1,
        keyword: keyword,
      };

      const searchParams = new URLSearchParams(params).toString();
      const url = `/profiles?${searchParams}`;

      const result = await getProfile(url, null, "get");
      if (result) {
        setProfiles(result?.data?.profiles);
        setTotalPage(result?.data?.totalPageCount);
      }
    }
  };

  const handleTeacherPage = () => {
    setCurrentTeacherPage((prev) => prev+1);
  }

  const handlePage = () => {
    setCurrentPage((prev) => prev+1);
  }

  const handleSearch = () => {
    setProfiles([]);
    setTeacherProfiles([]);
    setCurrentPage(1);
    setCurrentTeacherPage(1);
    handleGetProfile();
    handleGetTeacherProfile();
  };

  useEffect(() => {
    handleGetProfile();
  }, [currentPage]);

  useEffect(() => {
    handleGetTeacherProfile();
  }, [currentTeacherPage]);

  const uniqueTeacherProfiles = teacherProfiles.filter(
    (profile, index, self) =>
        index === self.findIndex((p) => p.userId === profile.userId)
  );

  const uniqueProfiles = profiles.filter(
    (profile, index, self) =>
        index === self.findIndex((p) => p.userId === profile.userId)
  );

  return (
    <Wrapper>
      <PageTitle>프로필 찾기</PageTitle>
      <Filters>
        <FilterWrapper>
          <Filter title="닉네임">
            <Input value={keyword} onChange={handleKeyword} />
          </Filter>
          <Filter title="카테고리">
            <SelectBox
              options={SEARCH_CATEGORY_OPTIONS}
              onChange={handleCategory}
              curOption={getCategoryLabelByValue(categoryId)}
            />
          </Filter>
          <Button label={<CustomSearchIcon />} onClick={handleSearch} />
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="태그">
            <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
          </Filter>
        </FilterWrapper>
      </Filters>

      <Section title="강사" onClick={handleTeacherPage}>
        <Profiles>
          {uniqueTeacherProfiles.map((profile) => (
            <Link to={`/profile/${profile.userId}`} key={profile.userId}>
              <Profile userName={profile.nickname} profileId={profile.userId} />
          </Link>
          ))}
        </Profiles>
      </Section>

      <Section title="일반 회원" onClick={handlePage}>
        <Profiles>
          {uniqueProfiles.map((profile) => (
            <Link to={`/profile/${profile.userId}`} key={profile.userId}>
              <Profile userName={profile.nickname} profileId={profile.userId} />
            </Link>
          ))}
        </Profiles>
      </Section>
    </Wrapper>
  );
}

export default ProfileSearchPage;