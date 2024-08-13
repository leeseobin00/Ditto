import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";

import useAxios from "../../hooks/useAxios";
import TabBar from "../../components/Class/ClassList/TabBar";
import SelectBox from "../../components/Board/SelectBox";
import SelectTag from "../../components/Board/SelectTag";
import Button from "../../components/common/Button";
import ClassList from "../../components/Class/ClassList/ClassList";
import PaginationBar from "../../components/common/PaginationBar";
import { getTagsForCategory } from "../../utils/options";
import {
  CLASS_SEARCH_OPTIONS,
  CLASS_SORT_OPTIONS,
} from "../../utils/searchOptions";

const ClassPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterTitle = styled.div`
  width: 60px;
  margin-right: 4px;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`;

const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 92%;
  gap: 8px;
`;

const Input = styled.input`
  width: 70%;
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

const PageTitle = styled.h1`
  font-size: 24px;
  color: var(--TEXT-PRIMARY);
  margin-top: 48px;
`;

const SearchOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

function ClassListPage() {
  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  const roleId = useSelector((state) => state.auth.roleId);

  const { sendRequest } = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const pathArr = location.pathname.split("/");
  const path = pathArr.length === 3 ? pathArr[2] : "";

  const [pageTitle, setPageTitle] = useState("전체");
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const [classList, setClassList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [tagId, setTagId] = useState(0);
  const [searchBy, setSearchBy] = useState("className");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("classId");
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);

  const getClasses = async () => {
    const params = {
      page: currentPage,
      searchBy: searchBy,
      keyword: keyword,
      sortBy: sortBy,
      ...(categoryId !== 0 && { categoryId }),
      ...(tagId !== 0 && { tagId }),
    };

    const searchParams = new URLSearchParams(params).toString();
    const url = `/classes?${searchParams}`;

    const result = await sendRequest(url, null, "get");

    setClassList(result?.data?.classList || []);
    setTotalPageCount(result?.data?.totalPages);
  };

  const resetOptions = () => {
    setTagId(0);
    setSearchBy("className");
    setKeyword("");
  };

  useEffect(() => {
    resetOptions();
    setPageTitle(
      path === ""
        ? "전체"
        : path === "living"
          ? "리빙 DIY"
          : path === "fabric"
            ? "패브릭 DIY"
            : path === "food"
              ? "푸드 DIY"
              : "아트 DIY"
    );
    setCategoryId(
      path === "living"
        ? 1
        : path === "fabric"
          ? 2
          : path === "food"
            ? 3
            : path === "art"
              ? 4
              : 0
    );
  }, [path]);

  useEffect(() => {
    getClasses();
  }, [currentPage, sortBy, categoryId, tagId]);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(getTagsForCategory(categoryId));
  }, [categoryId]);

  const handleTag = (tagValue) => {
    setTagId((prevTagId) => (prevTagId === tagValue ? 0 : tagValue));
  };

  const handleSearchBy = (value) => {
    setSearchBy(value);
  };

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleSortOption = (value) => {
    setSortBy(value);
  };

  const pageNumbers = useMemo(() => {
    const size = Math.ceil(totalPageCount - (currentSection - 1) * 12);
    const ret = [];
    for (let i = 1; i <= size; i++) {
      ret.push(i);
    }
    return ret;
  }, [currentSection, totalPageCount]);

  const handlePage = (number) => {
    setCurrentPage(number);
    navigate(`${location.pathname}?page=${number}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page"), 10) || 1;
    setCurrentPage(page);
    setCurrentSection(Math.ceil(page / 12));
  }, [location.search]);

  return (
    <ClassPageContainer>
      <TabBar />
      <Wrapper>
        <Filter>
          <FilterTitle>태그</FilterTitle>
          <FilterContent>
            <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
          </FilterContent>
        </Filter>
        <Filter style={{ paddingRight: "20px" }}>
          <FilterTitle>검색</FilterTitle>
          <FilterContent style={{ justifyContent: "space-between" }}>
            <SelectBox
              options={CLASS_SEARCH_OPTIONS}
              onChange={handleSearchBy}
              curOption={searchBy}
            />
            <Input onChange={handleKeyword} value={keyword} />
            <Button
              onClick={getClasses}
              label={<CustomSearchIcon />}
              size="md"
            />
          </FilterContent>
        </Filter>
        <PageTitle>{pageTitle}</PageTitle>
        <SearchOptionWrapper>
          <SelectBox
            options={CLASS_SORT_OPTIONS}
            onChange={handleSortOption}
            curOption={sortBy}
          />
          <Link to="/classes/add">
            {roleId == 2 && <Button label="클래스 등록" size="md" />}
          </Link>
        </SearchOptionWrapper>
        <ClassList classList={classList} />
        <PaginationBar
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          handleClick={handlePage}
        />
      </Wrapper>
    </ClassPageContainer>
  );
}

export default ClassListPage;
