import { useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import TabBar from "../../components/Board/TabBar";
import SelectBox from "../../components/Board/SelectBox";
import PostList from "../../components/Board/BoardList/PostList";
import PaginationBar from "../../components/common/PaginationBar";
import Button from "../../components/common/Button";
import SelectTag from "../../components/Board/SelectTag";
import { getTagsForCategory } from "../../utils/options";
import {
  SEARCH_CATEGORY_OPTIONS,
  SEARCH_OPTIONS,
  SORT_OPTIONS,
  getCategoryLabelByValue,
  getSortOptionLabelByValue,
} from "../../utils/searchOptions";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 48px;
  justify-content: space-between;
  align-items: flex-start;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterTitle = styled.p`
  white-space: nowrap;
  width: 60px;
  margin-right: 4px;
`;

const SearchWrapper = styled.div`
  width: 22%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 92%;
  gap: 8px;
`;

const InputWrapper = styled.div`
  width: 72%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 85%;
  height: 100%;
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

function BoardListPage() {
  const { sendRequest } = useAxios();
  const userId = useSelector((state) => state.auth.userId);
  // router
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page"), 10) || 1; // 기본값 1
  // page title
  const [pageTitle, setPageTitle] = useState("전체");
  // posts
  const [posts, setPosts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [tagId, setTagId] = useState(0);
  const [searchBy, setSearchBy] = useState("제목");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("postId");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const postsPerPage = 10;

  // posts state 시작 ///////////////////////////////////////
  const getPosts = async () => {
    const boardId =
      path === "talk" ? 1 : path === "community" ? 2 : path === "help" ? 3 : 0;

    const params = {
      page: currentPage,
      size: postsPerPage,
      searchBy: searchBy,
      keyword: keyword,
      sortBy: sortBy,
      ...(boardId !== 0 && { boardId: boardId }),
      ...(categoryId !== 0 && { categoryId: categoryId }),
      ...(tagId !== 0 && { tagId: tagId }),
    };

    const searchParams = new URLSearchParams(params).toString();
    const url = `/posts?${searchParams}`;

    const result = await sendRequest(url, null, "get");

    setPosts(result?.data?.posts || []);
    setTotalPageCount(result?.data?.totalPageCount);
  };

  const resetOptions = () => {
    setCategoryId(0);
    setTagId(0);
    setSearchBy("제목");
    setKeyword("");
  };

  const onSearchButton = () => {
    getPosts();
  };

  useEffect(() => {
    resetOptions();
    setPageTitle(
      path === "talk"
        ? "소통해요!"
        : path === "community"
          ? "자랑해요!"
          : path === "help"
            ? "도와줘요!"
            : "전체"
    );
  }, [path]);

  useEffect(() => {
    getPosts();
  }, [path, currentPage, sortBy]);
  // posts state 끝 ///////////////////////////////////////

  // 검색 옵션 시작 ///////////////////////////////////////
  // 선택한 category에 따라 tags가 바뀌여야 함 /////////////
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(getTagsForCategory(categoryId));
  }, [categoryId]);

  const handleCategoryId = (value) => {
    setCategoryId(value);
  };

  const handleTag = (tagValue) => {
    if (tagValue === tagId) {
      setTagId(0);
    } else {
      setTagId(tagValue);
    }
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
  // 검색 옵션 끝 ///////////////////////////////////////////

  // pagination 시작 ///////////////////////////////////////
  // 페이지 번호 계산을 useMemo로 최적화
  const pageNumbers = useMemo(() => {
    const size = Math.ceil(
      totalPageCount - (currentSection - 1) * postsPerPage
    );
    const ret = [];
    for (let i = 1; i <= size; i++) {
      ret.push(i);
    }
    return ret;
  }, [currentSection, totalPageCount]);

  const handlePage = (number) => {
    navigate(location.pathname + `?page=${number}`);
  };
  // pagination 끝 ////////////////////////////////////////

  // 쿼리 스트링에서 'page' 파라미터 읽기 ///////////////////
  useEffect(() => {
    setCurrentPage(page);
    setCurrentSection(Math.ceil(page / 10));
  }, [page]);
  /////////////////////////////////////////////////////////

  return (
    <div>
      <TabBar />

      <Wrapper>
        {/* 필터 목록 시작 */}
        <FilterWrapper>
          <Filter style={{ width: "22%" }}>
            <FilterTitle>카테고리</FilterTitle>
            <SelectBox
              options={SEARCH_CATEGORY_OPTIONS}
              onChange={handleCategoryId}
              curOption={categoryId}
            />
          </Filter>

          <Filter style={{ width: "72%", alignItems: "flex-start" }}>
            <FilterTitle style={{ lineHeight: "2" }}>태그</FilterTitle>
            <FilterContent>
              <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
            </FilterContent>
          </Filter>
        </FilterWrapper>
        <Filter>
          <SearchWrapper>
            <FilterTitle>검색</FilterTitle>
            <SelectBox
              options={SEARCH_OPTIONS}
              onChange={handleSearchBy}
              curOption={searchBy}
            />
          </SearchWrapper>
          <InputWrapper style={{ paddingRight: "20px" }}>
            <Input onChange={handleKeyword} value={keyword} />
            <Button
              onClick={onSearchButton}
              label={<CustomSearchIcon />}
              size="md"
            />
          </InputWrapper>
        </Filter>
        {/* 필터 목록 끝 */}

        <PageTitle>{pageTitle}</PageTitle>

        {/* 검색 옵션 시작 */}
        <SearchOptionWrapper>
          <SelectBox
            options={SORT_OPTIONS}
            onChange={handleSortOption}
            curOption={sortBy}
          />
          {userId && (
            <Link to="/board/add">
              <Button label="글쓰기" size="md" />
            </Link>
          )}
        </SearchOptionWrapper>
        {/* 검색 옵션 끝 */}

        <PostList posts={posts} currentPage={currentPage} />

        <PaginationBar
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          handleClick={handlePage}
        />
      </Wrapper>
    </div>
  );
}

export default BoardListPage;
