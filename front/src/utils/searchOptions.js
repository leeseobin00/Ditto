export const SEARCH_CATEGORY_OPTIONS = [
  { value: 0, label: "전체" },
  { value: 1, label: "리빙" },
  { value: 2, label: "패브릭" },
  { value: 3, label: "푸드" },
  { value: 4, label: "아트" },
];

export const CLASS_SEARCH_OPTIONS = [
  { value: "className", label: "강의명" },
  { value: "nickname", label: "강사명" },
];

export const SEARCH_OPTIONS = [
  { value: "제목", label: "제목" },
  { value: "작성자", label: "작성자" },
];

export const CLASS_SORT_OPTIONS = [
  { value: "postId", label: "최신순" },
  { value: "likeCount", label: "좋아요순" },
  { value: "averageRating", label: "평점순" },
  { value: "reviewCount", label: "리뷰 개수순" },
  { value: "priceLow", label: "가격 낮은순" },
];

export const SORT_OPTIONS = [
  { value: "postId", label: "최신순" },
  { value: "likeCount", label: "좋아요순" },
  { value: "viewCount", label: "조회수순" },
];

export function getCategoryLabelByValue(value) {
  const category = SEARCH_CATEGORY_OPTIONS.find(
    (option) => option.value === value
  );
  return category ? category.label : "전체";
}

export function getSortOptionLabelByValue(value) {
  const sortOption = SORT_OPTIONS.find((option) => option.value === value);
  return sortOption ? sortOption.label : "최신순";
}

export function getClassSortOptionLabelByValue(value) {
  const classSortOption = CLASS_SORT_OPTIONS.find(
    (option) => option.value === value
  );
  return classSortOption ? classSortOption.label : "최신순";
}
