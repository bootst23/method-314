import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: [
      "packages/*",
      "tests/*/vitest.config.{e2e,unit}.js",
      {
        test: {
          name: "get all accounts",
          root: "./tests",
          environment: "node",
          setupFiles: ["./setup.js"],
        },
      },
    ],
  },
});
