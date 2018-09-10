const isProd = process.env.NODE_ENV === "production";
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withTypescript = require("@zeit/next-typescript");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = withTypescript(
  withBundleAnalyzer({
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    distDir: "build",
    webpack: function(cfg) {
      if (cfg.resolve.alias) {
        delete cfg.resolve.alias["react"];
        delete cfg.resolve.alias["react-dom"];
      }

      return cfg;
    }
  })
);
