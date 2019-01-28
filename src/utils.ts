export const getHighestLength = (values: string[]) =>
  values.reduce((acc, { length }) => (acc > length ? acc : length), 0);
