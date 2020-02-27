import { join } from "path"
import { GenerateBoiler } from "boiler-dev"

export const generate: GenerateBoiler = async ({
  files,
  rootDirPath,
}) => {
  const actions = []

  for (const { name, source } of files) {
    if (name === "eslintrc.json") {
      actions.push({
        action: "write",
        path: join(rootDirPath, ".eslintrc.json"),
        source,
      })
    }
    if (name === "prettierrc.json") {
      actions.push({
        action: "write",
        path: join(rootDirPath, ".prettierrc"),
        source,
      })
    }
  }

  actions.push({
    action: "merge",
    path: join(rootDirPath, "package.json"),
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
