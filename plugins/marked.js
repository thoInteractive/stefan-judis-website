import marked from 'marked';
import Prism from 'prismjs';
import { makeEmojisAccessible } from './accessible-emojis.js';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  return `<pre class="o-code o-code-${language || 'whatevs'}"><code>${
    language ? Prism.highlight(code, Prism.languages[language]) : code
  }</code></pre>`;
};

renderer.heading = function(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
    <div class="o-anchorContainer o-anchorContainer--${level}" id="${escapedText}">
    <a href="#${escapedText}" aria-label="Anchor link for '${text}'">#</a>
    <h${level} class="o-headline-${level}">${makeEmojisAccessible(
    text
  )}</h${level}>
    </div>
  `;
};

renderer.image = (href, title, text) => {
  if (/\.mp4$/.test(href)) {
    return `
      <video controls preload="metadata">
        <source src="${href}" type="video/mp4">
      </video>
    `;
  }

  return `<a href="${href}"><img src="${href}" alt="${text}"></a>`;
};

renderer.link = (href, title, text) =>
  `<a href="${href}" class="fancy-link">${text}</a>`;

renderer.paragraph = text => `<p>${makeEmojisAccessible(text)}</p>\n`;

export default function(text) {
  return text ? marked(text, { renderer }) : '';
}
