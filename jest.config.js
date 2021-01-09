module.exports = {
  maxWorkers: 1,
  roots: ["./"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
