import getTemplateParams from "../lib/getTemplateParams";
import parseTemplate from "../lib/parseTemplate";

it("returns correct template param variables", () => {
  const mockEnvironment = {
    PLUGIN_CLUSTER: "mock-cluster",
    PLUGIN_ZONE: "mock-zone",
    DRONE_TAG: "mock-tag",
    DRONE_COMMIT: "mock-commit",
    DRONE_BUILD_NUMBER: "mock-drone-number",
    SOMEOTHERENV: "mock-other",
    MY_ENV_VAR: "mock-my",
    YOUR_ENV: "mock-your",
  };
  expect(getTemplateParams(mockEnvironment)).toEqual({
    PLUGIN_CLUSTER: "mock-cluster",
    PLUGIN_ZONE: "mock-zone",
    DRONE_TAG: "mock-tag",
    DRONE_COMMIT: "mock-commit",
    DRONE_BUILD_NUMBER: "mock-drone-number",
    SOMEOTHERENV: "mock-other",
    MY_ENV_VAR: "mock-my",
    YOUR_ENV: "mock-your",
  });
});

it("processes a template correctly", () => {
  const templatePath = `${__dirname}/_fixtures/kubernetes.yml`;
  const params = getTemplateParams({
    DRONE_TAG: "0.1.3",
    BAR: "my-env-var",
  });
  const result = parseTemplate(templatePath, params);
  expect(/0.1.3/.test(result)).toBe(true);
  expect(/my-env-var/.test(result)).toBe(true);
});
