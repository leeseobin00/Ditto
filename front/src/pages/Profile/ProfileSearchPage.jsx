import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

import Button from "../../components/common/Button";
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
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`;

const PageTitle = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: var(--PRIMARY);
  width: 100%;
  margin-bottom: 32px;
`;

const Filters = styled.div`
  min-height: 160px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const FilterColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
`;

const FilterLabel = styled.div`
  width: 60px;
  margin-right: 30px;
`;

const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 92%;
  gap: 8px;
`;

const CustomSelectBox = styled(SelectBox)``;

const Input = styled.input`
  width: 160px;
  padding: 7px 8px;
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
  margin: 2px 0px;
`;

const Profiles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 50px;

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
  const username = useSelector((state) => state.auth.nickname);
  const { sendRequest: getProfile } = useAxios();
  // state
  const [categoryId, setCategoryId] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [profiles, setProfiles] = useState([]);
  const [teacherProfiles, setTeacherProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(1);
  const [teacherTotalPage, setTeacherTotalPage] = useState(1);
  const size = 5;

  const [isReset, setIsReset] = useState(false);

  const resetResult = () => {
    setProfiles([]);
    setTeacherProfiles([]);
    setCurrentPage(1);
    setTotalPage(1);
    setCurrentTeacherPage(1);
    setTeacherTotalPage(1);
    setIsReset(true);
  };

  const handleCategory = (value) => {
    setCategoryId(value);
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

  useEffect(() => {
    if (isReset) {
      handleGetProfile();
      handleGetTeacherProfile();
      setIsReset(false);
    }
  }, [isReset]);

  const handleSearch = () => {
    resetResult();
  };

  const handleGetTeacherProfile = async () => {
    if (currentTeacherPage <= teacherTotalPage) {
      const params = {
        page: currentTeacherPage,
        size: size,
        ...(categoryId == 0 ? { categoryId: "" } : { categoryId: categoryId }),
        ...(tagId == 0 ? { tagId: "" } : { tagId: tagId }),
        role: 2,
        keyword: keyword,
      };

      const searchParams = new URLSearchParams(params).toString();
      const url = `/profiles?${searchParams}`;

      const result = await getProfile(url, null, "get");
      setTeacherProfiles((prev) => [...prev, ...result?.data?.profiles]);
      setTeacherTotalPage(result?.data?.totalPageCount);
    }
  };

  const handleGetProfile = async () => {
    if (currentPage <= totalPage) {
      const params = {
        page: currentPage,
        size: size,
        ...(categoryId == 0 ? { categoryId: "" } : { categoryId: categoryId }),
        ...(tagId == 0 ? { tagId: "" } : { tagId: tagId }),
        role: 1,
        keyword: keyword,
      };

      const searchParams = new URLSearchParams(params).toString();
      const url = `/profiles?${searchParams}`;

      const result = await getProfile(url, null, "get");
      setProfiles((prev) => [...prev, ...result?.data?.profiles]);
      setTotalPage(result?.data?.totalPageCount);
    }
  };

  const handleTeacherPage = () => {
    setCurrentTeacherPage((prev) => prev + 1);
  };

  const handlePage = () => {
    setCurrentPage((prev) => prev + 1);
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
          <FilterColumnWrapper>
            <Filter>
              <FilterLabel>카테고리</FilterLabel>
              <CustomSelectBox
                options={SEARCH_CATEGORY_OPTIONS}
                onChange={handleCategory}
                curOption={getCategoryLabelByValue(categoryId)}
              />
            </Filter>
            <Filter>
              <FilterLabel>닉네임</FilterLabel>
              <Input value={keyword} onChange={handleKeyword} />
            </Filter>
          </FilterColumnWrapper>
          <Filter style={{ width: "64%", margin: "0" }}>
            <FilterLabel>태그</FilterLabel>
            <FilterContent>
              <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
            </FilterContent>
          </Filter>
          <Button label={<CustomSearchIcon />} onClick={handleSearch} />
        </FilterWrapper>
      </Filters>

      <Section
        title="강사"
        curPage={currentTeacherPage}
        totalPage={teacherTotalPage}
        onClick={handleTeacherPage}
      >
        <Profiles>
          {uniqueTeacherProfiles.map((profile) => (
            <Profile
              profileImageId={profile?.fileId}
              userName={profile?.nickname}
              profileId={profile?.userId}
              likeCount={profile?.likeCount}
              tags={profile?.tags}
              key={profile?.userId}
            />
          ))}
        </Profiles>
      </Section>

      <Section
        title="일반 회원"
        curPage={currentPage}
        totalPage={totalPage}
        onClick={handlePage}
      >
        <Profiles>
          {uniqueProfiles.map((profile) => (
            <Profile
              profileImageId={profile?.fileId}
              userName={profile?.nickname}
              profileId={profile?.userId}
              likeCount={profile?.likeCount}
              key={profile?.userId}
              tags={profile?.tags}
            />
          ))}
        </Profiles>
      </Section>
    </Wrapper>
  );
}

export default ProfileSearchPage;
