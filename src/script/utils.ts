export const queryParam = {
  get: (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  },
  set: (key: string, value: string, setState: boolean = false) => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathName = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    searchParams.set(key, value);
    if(setState) {
      const queryParameters = searchParams.toString();
      const newUrl = `${protocol}//${host}${pathName}?${queryParameters}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  },
  delete: (key: string, setState: boolean = false) => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathName = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete(key);
    if(setState) {
      const queryParameters = searchParams.toString();
      const newUrl = queryParameters.length ?
        `${protocol}//${host}${pathName}?${queryParameters}` :
        `${protocol}//${host}${pathName}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

    }
  },
};