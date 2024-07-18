module.exports = {
  root: true, // 이 설정 파일이 프로젝트의 루트에 있는지 여부를 나타낸다.
  env: {
    browser: true, // 브라우저 환경을 설정한다.
    es2021: true, // ECMAScript 2021(ES12) 환경을 설정한다.
  },
  extends: [
    "eslint:recommended", // ESLint에서 권장하는 기본 규칙을 사용한다.
    "@titicaca/eslint-config-triple", // Triple의 ESLint 기본 설정을 확장합니다.
    "@titicaca/eslint-config-triple/frontend", // Triple의 프론트엔드 설정을 확장합니다.
    "@titicaca/eslint-config-triple/prettier", // Triple의 Prettier 설정을 확장합니다.
    "plugin:react/recommended", // React 관련 권장 규칙을 사용한다.
    "plugin:prettier/recommended", // Prettier와 연동된 규칙을 사용한다.
    "plugin:react/jsx-runtime", // 새로운 JSX 변환을 지원하는 규칙을 사용한다.
    // 'plugin:react-hooks/recommended', // React Hooks 사용에 대한 권장 규칙을 사용한다.
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.js"], // ESLint가 무시할 파일 혹은 디렉토리를 설정한다.
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX를 파싱할 수 있게 설정한다.
    },
    ecmaVersion: 12, // ECMAScript 2021(버전 12) 문법을 사용한다.
    sourceType: "module", // ECMAScript 모듈을 사용한다.
  },
  settings: {
    react: {
      version: "detect", // 설치된 React 버전을 자동으로 감지한다.
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // 사용할 파일 확장자를 설정한다.
        paths: ["./src"], // import 경로의 기본 폴더를 설정한다.
      },
    },
  },
  plugins: ["react", "react-refresh"], // 사용될 ESLint 플러그인을 설정한다.
  rules: {
    rules: {
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto',
          },
      ],
  },
    "react/prop-types": "off", // PropTypes를 사용하지 않아도 경고나 오류를 발생시키지 않는다.
    "react/jsx-no-target-blank": "warn", // 관련 보안 경고를 유지한다.
    "react-refresh/only-export-components": [
      "warn", // React Refresh에서 컴포넌트만 내보내도록 경고한다.
      {
        allowConstantExport: true, // 상수로 내보내는 것을 허용한다.
      },
    ],
    "react/react-in-jsx-scope": "off", // React가 JSX 범위 내에 있어야 한다는 규칙을 비활성화한다.
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
