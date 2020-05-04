export default (rawKey = "") => {
  const key = rawKey.toUpperCase();
  const value = process.env[`PLUGIN_${key}`]
    ? process.env[`PLUGIN_${key}`]
    : process.env[key];
  return value || "";
};
