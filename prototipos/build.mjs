// Embute assets/orion.css e assets/orion.js dentro de cada página.
// Por quê: assim cada protótipo abre sozinho em qualquer lugar (painel de
// visualização, duplo clique, enviado por e-mail), sem depender da pasta assets/.
// A fonte da verdade continua sendo assets/. Depois de mudar algo lá, rode:
//   node prototipos/build.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(dir, 'assets/orion.css'), 'utf8');
const js  = readFileSync(join(dir, 'assets/orion.js'), 'utf8');

const blocos = {
  css: `<!-- orion:css (gerado por build.mjs, edite assets/orion.css) -->\n<style>\n${css}</style>\n<!-- /orion:css -->`,
  js:  `<!-- orion:js (gerado por build.mjs, edite assets/orion.js) -->\n<script>\n${js}</script>\n<!-- /orion:js -->`,
};

for (const f of readdirSync(dir).filter(f => f.endsWith('.html'))) {
  const p = join(dir, f);
  let html = readFileSync(p, 'utf8');
  const antes = html;
  html = html
    .replace(/<link rel="stylesheet" href="assets\/orion\.css">/, blocos.css)
    .replace(/<script src="assets\/orion\.js"><\/script>/, blocos.js)
    .replace(/<!-- orion:css[\s\S]*?<!-- \/orion:css -->/, () => blocos.css)
    .replace(/<!-- orion:js[\s\S]*?<!-- \/orion:js -->/, () => blocos.js);
  if (html !== antes) { writeFileSync(p, html); console.log('embutido:', f); }
  else console.log('sem mudança:', f);
}
