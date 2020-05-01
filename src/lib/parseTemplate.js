import fs from 'fs';
import dot from 'dot';

export default function processTemplate(pathToTemplate, params) {
  const templateFile = fs.readFileSync(pathToTemplate, 'utf8');
  const templateString = templateFile.toString();

  const template = dot.template(templateString, {
    evaluate:    /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode:      /\{\{!([\s\S]+?)\}\}/g,
    use:         /\{\{#([\s\S]+?)\}\}/g,
    define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'template',
    strip: false,
    append: true,
    selfcontained: false
  });

  return template(params);
}