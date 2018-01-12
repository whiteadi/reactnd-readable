import moment from 'moment';

export const capitalize = (str = '') => {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1);
};

export const formatDate = timestamp => moment(timestamp).format('LLLL');

export const sortAsc = (array, key) => {
  return array.sort((item1, item2) => {
    return (item1[key] < item2[key]) ? -1 : ((item1[key] > item2[key]) ? 1 : 0);
  })
};

export const sortDesc = (array, key) => {
  return array.sort((item1, item2) => {
    return (item1[key] < item2[key]) ? 1 : ((item1[key] > item2[key]) ? -1 : 0);
  })
};

export const sortAscNum = (array, key) => {
  return array.sort((item1, item2) => {
    return item1[key] - item2[key];
  })
};

export const sortDescNum = (array, key) => {
  return array.sort((item1, item2) => {
    return item2[key] - item1[key];
  })
};
