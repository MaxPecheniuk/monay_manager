// @flow
export const formatDateToTime = (date: number) => {
  return new Date(date * 1000).toLocaleTimeString(
    'ru', {hour: 'numeric', minute: 'numeric'});
};
export const formatDateToDate = (date: number) => {
  return new Date(date * 1000).toLocaleDateString('ru', {day: '2-digit', month: '2-digit', year: '2-digit'});
};

export const formatDateWithTime = (date: number) => {
  return new Date(date * 1000)
    .toLocaleString('ru',
      {hour: 'numeric', minute: 'numeric', day: '2-digit', month: '2-digit', year: 'numeric'});
};

export const convertToUnixTime = (date) => {
  return Math.round((new Date(date) / 1000));
};
