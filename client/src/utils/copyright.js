const setCopyright = title => {
  let year = new Date().getFullYear();
  return `\u00A9 ${year} ${title}`;
};

export default setCopyright;
