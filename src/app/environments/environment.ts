export const domainBase = {
  rest: 'https://',
};

export const environment = {
  endpoints: {
    country: {
      get: `${domainBase.rest}/api/`,
      save: `${domainBase.rest}/api/`,
    },
  },
};
