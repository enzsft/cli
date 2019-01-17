module.exports = {
  coverageDirectory: ".coverage",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
  },
};
