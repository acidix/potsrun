import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [
      "migrated-images/**",
      "takeout/**",
      "sources/**",
      "public/**",
    ],
  },
];

export default eslintConfig;
