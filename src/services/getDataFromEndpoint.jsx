const url = 'https://606591d5-a3a9-4272-abea-3efea2cef0fa.mock.pstmn.io/';

export const getDataFromEndpoint = async (endPoint) => {
  const response = await fetch(`${url}/${endPoint}`);
  const data = await response.json();
  return data;
};
