const generalOrder = [
  ['index'],
  ['blog', 'blog-tag-tag', 'blog-page-page', 'blog-slug'],
  ['resources', 'slug'],
  ['talks'],
  ['smalltalk'],
  ['today-i-learned', 'today-i-learned-slug'],
  ['newsletter']
];

function getIndex(name) {
  for (let i = 0; i < generalOrder.length; i++) {
    for (let j = 0; j < generalOrder[i].length; j++) {
      if (generalOrder[i][j] === name) {
        return i * 10 + j;
      }
    }
  }
}

export default (from, to) => {
  if (!from || !to) {
    return '';
  }

  if (from.name === 'blog-page-page' && to.name === 'blog-page-page') {
    return from.params.page < to.params.page ? 't-slide-left' : 't-slide-right';
  }

  const fromIndex = getIndex(from.name);
  const toIndex = getIndex(to.name);

  if (fromIndex === toIndex) {
    return 't-slide-left';
  }

  return fromIndex > toIndex ? 't-slide-right' : 't-slide-left';
};
