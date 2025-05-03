// jest.config.js
module.exports = {
    testEnvironment: "jsdom", // important for React DOM tests
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    transform: {
      "^.+\\.jsx?$": "babel-jest", // use babel to transform JSX
    },
    moduleNameMapper: {
      // handle SCSS or CSS imports if you're using CSS Modules
      "\\.(scss|css)$": "identity-obj-proxy",
  
      // support module aliasing if you use it (adjust if needed)
      "^components/(.*)$": "<rootDir>/src/components/$1",
      "^services/(.*)$": "<rootDir>/src/services/$1",
      "^store/(.*)$": "<rootDir>/src/store/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  };
  