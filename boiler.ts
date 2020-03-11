import { ActionBoiler } from "boiler-dev"

export const install: ActionBoiler = async () => {
  const actions = []

  actions.push({
    action: "npmInstall",
    dev: true,
    source: [
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-prettier",
      "lint-staged",
      "prettier",
    ],
  })

  return actions
}

export const generate: ActionBoiler = async () => {
  const actions = []

  actions.push({
    action: "write",
    path: ".eslintrc.json",
    sourcePath: "eslintrc.json",
  })

  actions.push({
    action: "write",
    path: ".prettierrc",
    sourcePath: "prettierrc.json",
  })

  actions.push({
    action: "merge",
    path: "package.json",
    source: {
      "lint-staged": {
        "*.{css,json,md}": ["prettier --write", "git add"],
        "*.{js,jsx,ts}": [
          "eslint --ignore-path .gitignore --fix",
          "git add",
        ],
      },
    },
  })

  return actions
}
