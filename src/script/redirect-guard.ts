(() => {
  const originPathName = '/abs-webtools/';
  const targetPathName = '/abs-webtools/dist/';
  const currentPathName = window.location.pathname;
  if(currentPathName === originPathName) {
    window.location.href = targetPathName;
  }
})();