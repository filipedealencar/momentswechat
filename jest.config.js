module.exports = {
  preset: 'react-native',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-button|react-redux|@react-navigation|redux|@reduxjs/toolkit)/)',
  ],
};
