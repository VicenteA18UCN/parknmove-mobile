module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    // moduleNameMapper: {
    //   '^react-native$': 'react-native-web'
    // },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|expo|@expo|expo-.*|@react-native|@react-navigation/.*|@unimodules/.*|unimodules-*|sentry-expo|native-base/.*|@babel/plugin-transform-private-methods))/'
    ]
  };
  