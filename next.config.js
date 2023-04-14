// @generated: @expo/next-adapter@2.1.52
// Learn more: https://docs.expo.io/guides/using-nextjs/

const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["react-native-web"]);
const withImages = require("next-images");

module.exports = withPlugins(
  [
    withTM,
    [withExpo, { projectRoot: __dirname }],
    [
      withImages,
      {
        projectRoot: __dirname,
        // fileExtensions: ["png"],
        // disableStaticImages: true,
        // esModule: true,
        images: {
          fileExtensions: ["png"],
          disableStaticImages: true,
          //   esModule: true,
        },
      },
    ],
  ],
  {}
);