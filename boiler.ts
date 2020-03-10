import { join } from "path"
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

export const generate: ActionBoiler = async ({
  files,
  cwdPath,
}) => {
  const actions = []

  for (const { name, source } of files) {
    if (name === "eslintrc.json") {
      actions.push({
        action: "write",
        path: join(cwdPath, ".eslintrc.json"),
        source,
      })
    }
    if (name === "prettierrc.json") {
      actions.push({
        action: "write",
        path: join(cwdPath, ".prettierrc"),
        source,
      })
    }
  }

  actions.push({
    action: "merge",
    path: join(cwdPath, "package.json"),
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
