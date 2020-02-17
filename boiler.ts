import { join } from "path"
import { SetupBoiler, PromptBoiler, InstallBoiler, TeardownBoiler, npm } from "boiler-dev"

export const setupBoiler: SetupBoiler = async ({ destDir }) => {
  await npm.install(
    destDir,
    [
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-prettier",
      "lint-staged",
      "prettier"
    ],
    { saveDev: true }
  )
}

export const installBoiler: InstallBoiler = async ({ destDir, files }) => {
  const actions = []

  for (const { name, source } of files) {
    if (name === "eslintrc.json") {
      actions.push({
        action: "write",
        path: join(destDir, ".estlintrc.json"),
        source
      })
    }
    if (name === "pretierrc.json") {
      actions.push({
        action: "write",
        path: join(destDir, ".prettierrc"),
        source
      })
    }
  }

  return actions
}
