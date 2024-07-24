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

const Wrapper = styled.div`
  max-width: 1024px;
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
  const { response, sendRequest } = useAxios();
  // posts
  const [posts, setPosts] = useState([]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const postsPerPage = 1;
  // page title
  const [pageTitle, setPageTitle] = useState("전체");
  // getData
  const [getData, setGetData] = useState({
    page: 1,
    size: postsPerPage,
    boardId: 0,
    categoryId: 0,
    tagId: 0,
    searchBy: "제목",
    keyword: "",
    sortBy: "postId",
  });
  // router
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // posts state 시작 ///////////////////////////////////////
  const getPosts = () => {
    const boardId = path === "talk" ? 1 : path === "community" ? 2 : path === "help" ? 3 : 0;

    const params = {
      page: getData.page,
      size: getData.size,
      searchBy: getData.searchBy,
      keyword: getData.keyword,
      sortBy: getData.sortBy,
      ...(boardId !== 0 && { boardId: boardId }),
      ...(getData.categoryId !== 0 && { categoryId: getData.categoryId }),
      ...(getData.tagId !== 0 && { tagId: getData.tagId }),
    };

    const searchParams = new URLSearchParams(params).toString();
    const url = `/posts?${searchParams}`;

    sendRequest(url, null, "get");
  };

  const resetOptions = () => {
    setGetData((prevState) => ({
      ...prevState,
      categoryId: 0,
      tagId: 0,
      searchBy: "제목",
      keyword: "",
    }));
    setTempCategoryId(0);
    setTempTagId(0);
    setTempSearchBy("제목");
    setTempKeyword("");
  };

  const setTempOptions = () => {
    setGetData((prevState) => ({
      ...prevState,
      categoryId: tempCategoryId,
      tagId: tempTagId,
      searchBy: tempSearchBy,
      keyword: tempKeyword,
    }));
  };

  const onSearchButton = () => {
    setTempOptions();
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
            : "도와줘요!",
    );
  }, [path]);

  useEffect(() => {
    getPosts();
  }, [path, getData.page, getData.sortBy]);

  useEffect(() => {
    setPosts(response?.data?.posts || []);
    setTotalPageCount(response?.data?.totalPageCount);
  }, [response]);
  // posts state 끝 ///////////////////////////////////////

  // 검색 옵션 시작 ///////////////////////////////////////
  const [boardId, setBoardId] = useState(0);
  const [tempCategoryId, setTempCategoryId] = useState(0);
  const [tempTagId, setTempTagId] = useState(0);
  const [tempSearchBy, setTempSearchBy] = useState("제목");
  const [tempKeyword, setTempKeyword] = useState("");
  // 선택한 category에 따라 tags가 바뀌여야 함 /////////////
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(getTagsForCategory(tempCategoryId));
  }, [tempCategoryId]);

  const handleCategory = (event) => {
    setTempCategoryId(event.target.value);
  };

  const handleTag = (tagValue) => {
    if (tagValue === tempTagId) {
      setTempTagId(0);
    } else {
      setTempTagId(tagValue);
    }
  };

  const handleSearchBy = (event) => {
    setTempSearchBy(event.target.value);
  };

  const handleKeyword = (event) => {
    setTempKeyword(event.target.value);
  };

  const handleSortOption = (event) => {
    setGetData((prevState) => ({
      ...prevState,
      sortBy: event.target.value,
    }));
  };
  // 검색 옵션 끝 ///////////////////////////////////////////

  // pagination 시작 ///////////////////////////////////////
  // 페이지 번호 계산을 useMemo로 최적화
  const pageNumbers = useMemo(() => {
    const size = Math.ceil(
      totalPageCount - (currentSection - 1) * postsPerPage,
    );
    const ret = [];
    for (let i = 1; i <= size; i++) {
      ret.push(i);
    }
    return ret;
  }, [currentSection, totalPageCount]);

  const handlePage = (number) => {
    setGetData((prevState) => ({
      ...prevState,
      page: number,
    }));
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
              onChange={handleCategory}
              curOption={getCategoryLabelByValue(tempCategoryId)}
            />
          </Filter>

          <Filter title="태그">
            <SelectTag tags={tags} curTag={tempTagId} handleTag={handleTag} />
          </Filter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="검색">
            <SelectBox
              options={SEARCH_OPTIONS}
              onChange={handleSearchBy}
              curOption={tempSearchBy}
            />
            <Input onChange={handleKeyword} value={tempKeyword} />
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
            curOption={getSortOptionLabelByValue(getData?.sortBy)}
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
