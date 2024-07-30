export const BOARD_TYPE_OPTIONS = [
  { value: 1, label: "소통해요" },
  { value: 2, label: "자랑해요" },
  { value: 3, label: "도와줘요" },
];

export const CATEGORY_OPTIONS = [
  { value: 1, label: "리빙" },
  { value: 2, label: "패브릭" },
  { value: 3, label: "푸드" },
  { value: 4, label: "아트" },
];

export const LIVING_OPTIONS = [
  { value: 1, label: "비누" },
  { value: 2, label: "향수" },
  { value: 3, label: "캔들" },
  { value: 4, label: "무드등" },
  { value: 5, label: "방향제" },
  { value: 6, label: "라탄" },
];

export const FABRIC_OPTIONS = [
  { value: 7, label: "뜨개질" },
  { value: 8, label: "가죽" },
  { value: 9, label: "모루" },
  { value: 10, label: "바느질" },
  { value: 11, label: "십자수" },
  { value: 12, label: "마크라메" },
];

export const FOOD_OPTIONS = [
  { value: 13, label: "떡" },
  { value: 14, label: "베이커리" },
];

export const ART_OPTIONS = [
  { value: 15, label: "미니어처" },
  { value: 16, label: "키링" },
  { value: 17, label: "모빌" },
  { value: 18, label: "페인팅" },
];

export function getBoardTypeLabelByValue(value) {
  const boardType = BOARD_TYPE_OPTIONS.find((option) => option.value === value);
  return boardType ? boardType.label : "소통해요";
}

export function getCategoryLabelByValue(value) {
  const category = CATEGORY_OPTIONS.find((option) => option.value === value);
  return category ? category.label : "리빙";
}

export function getStartTagIdForCategory(categoryId) {
  switch (categoryId) {
    case 1: // 리빙
      return LIVING_OPTIONS[0].value;
    case 2: // 패브릭
      return FABRIC_OPTIONS[0].value;
    case 3: // 푸드
      return FOOD_OPTIONS[0].value;
    case 4: // 아트
      return ART_OPTIONS[0].value;
    default:
      return null;
  }
}

export function getTagsForCategory(category) {
  switch (category) {
    case 0:
      return [
        ...LIVING_OPTIONS,
        ...FABRIC_OPTIONS,
        ...ART_OPTIONS,
        ...FOOD_OPTIONS,
      ];
    case 1:
      return LIVING_OPTIONS;
    case 2:
      return FABRIC_OPTIONS;
    case 3:
      return FOOD_OPTIONS;
    case 4:
      return ART_OPTIONS;
    default:
      return [];
  }
}
