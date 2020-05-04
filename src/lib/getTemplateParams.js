export default function getTemplateParams(environment) {
  const params = {};
  Object.keys(environment).forEach((key) => {
    params[key] = environment[key];
  });
  return params;
}
