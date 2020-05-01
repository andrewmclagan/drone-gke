export default function getTemplateParams(environment) {
  let params = {
    drone: {},
    plugin: {},
    environment: {},
  };
  Object.keys(environment).forEach((key) => {
    const pieces = key.split(/_(.+)/, 2);
    if (pieces[1] && ["PLUGIN", "DRONE"].indexOf(pieces[0]) !== -1) {
      const varNamespace = pieces[0].toLowerCase();
      const varKey = pieces[1].toLowerCase();
      params[varNamespace][varKey] = environment[key];
    } else {
      params.environment[key] = environment[key];
    }
  });
  return params;
}
