import { join } from "path"
import { SetupBoiler, InstallBoiler, npm } from "boiler-dev"

export const setupBoiler: SetupBoiler = async ({
  destDir,
}) => {
  await npm.install(
    destDir,
    [
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-prettier",
      "lint-staged",
      "prettier",
    ],
    { saveDev: true }
  )
}

export const installBoiler: InstallBoiler = async ({
  destDir,
  files,
}) => {
  const actions = []

  for (const { name, source } of files) {
    if (name === "eslintrc.json") {
      actions.push({
        action: "write",
        path: join(destDir, ".eslintrc.json"),
        source,
      })
    }
    if (name === "prettierrc.json") {
      actions.push({
        action: "write",
        path: join(destDir, ".prettierrc"),
        source,
      })
    }
  }

  actions.push({
    action: "merge",
    path: join(destDir, "package.json"),
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
