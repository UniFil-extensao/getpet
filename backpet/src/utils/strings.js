const trim = str => {
  if (typeof str !== 'string') return;
  return str.trim();
};

const snakeToCamelCase = str => {
  if (typeof str !== 'string') return;
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
};

const camelToSnakeCase = str => {
  if (typeof str !== 'string') return;
  return str.replace(/([a-z])([A-Z])/g, g => `${g[0]}_${g[1].toLowerCase()}`);
};

module.exports = {
  trim,
  snakeToCamelCase,
  camelToSnakeCase,
};
