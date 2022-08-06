/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use strict";

import auth from "./Auth.json";
import clear from "rollup-plugin-clear";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import screeps from "rollup-plugin-screeps";
import typescript from "rollup-plugin-typescript2";

const screepsConfig = {
  token: auth.token,
  protocol: "https",
  hostname: "screeps.com",
  port: 443,
  path: "/",
  branch: "main"
};

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({ targets: ["dist"] }),
    resolve({ rootDir: "src" }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ config: screepsConfig, dryRun: screepsConfig == null })
  ]
};
