import { useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import TabBar from "../../components/Board/TabBar";
import Filter from "../../components/Board/Filter";
import SelectBox from "../../components/Board/SelectBox";
import PostList from "../../components/Board/BoardList/PostList";
import PaginationBar from "../../components/Board/BoardList/PaginationBar";
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
import { current } from "@reduxjs/toolkit";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 48px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 480px;
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

function BoardListPage() {
  const { sendRequest } = useAxios();
  // router
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // page title
  const [pageTitle, setPageTitle] = useState("전체");
  // posts
  const [posts, setPosts] = useState([]);
  // getData
  // const [getData, setGetData] = useState({
  //   page: 1,
  //   size: postsPerPage,
  //   boardId: 0,
  //   categoryId: 0,
  //   tagId: 0,
  //   searchBy: "제목",
  //   keyword: "",
  //   sortBy: "postId",
  // });
  const [categoryId, setCategoryId] = useState(0);
  const [tagId, setTagId] = useState(0);
  const [searchBy, setSearchBy] = useState("제목");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("postId");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const postsPerPage = 5;

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
      path === "all"
        ? "전체"
        : path === "talk"
          ? "소통해요!"
          : path === "community"
            ? "자랑해요!"
            : "도와줘요!"
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
    setCurrentPage(number);
    setCurrentSection(Math.ceil(number / 10));
  };
  // pagination 끝 ////////////////////////////////////////

  return (
    <div>
      <TabBar />

      <Wrapper>
        {/* 필터 목록 시작 */}
        <FilterWrapper>
          <Filter title="카테고리">
            <SelectBox
              options={SEARCH_CATEGORY_OPTIONS}
              onChange={handleCategoryId}
              curOption={categoryId}
            />
          </Filter>

          <Filter title="태그">
            <SelectTag tags={tags} curTag={tagId} handleTag={handleTag} />
          </Filter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="검색">
            <SelectBox
              options={SEARCH_OPTIONS}
              onChange={handleSearchBy}
              curOption={searchBy}
            />
            <Input onChange={handleKeyword} value={keyword} />
            <Button
              onClick={onSearchButton}
              label={<CustomSearchIcon />}
              size="md"
            />
          </Filter>
        </FilterWrapper>
        {/* 필터 목록 끝 */}

        <PageTitle>{pageTitle}</PageTitle>

        {/* 검색 옵션 시작 */}
        <SearchOptionWrapper>
          <SelectBox
            options={SORT_OPTIONS}
            onChange={handleSortOption}
            curOption={sortBy}
          />
          <Link to="/board/add">
            <Button label="글쓰기" size="md" />
          </Link>
        </SearchOptionWrapper>
        {/* 검색 옵션 끝 */}

        <PostList posts={posts} />

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
