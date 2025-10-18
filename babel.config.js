module.exports = function (api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
      plugins: [
        // se usar Reanimated: "react-native-reanimated/plugin",
      ],
    };
  };
  