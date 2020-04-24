module.exports = {
    setupFiles: ['<rootDir>/jest/setup.js'], // 运行测试前可执行的脚本（比如注册enzyme的兼容）
    transform: {
      '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
      "^.+\\.(ts|tsx)$": "ts-jest"
    //   '^.+\\.css$': '<rootDir>/__test__/css-transform.js',
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'], //转换时需忽略的文件
    testURL: 'http://localhost/', // 运行环境下的URl,
    // typescript 中 coverage显示行数和实际对不上
    mapCoverage: true,
  };