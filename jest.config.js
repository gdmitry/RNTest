module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupEnzyme.ts"],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
