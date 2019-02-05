export const getHighestLength = (values: string[]): number =>
  values.reduce((acc, { length }) => (acc > length ? acc : length), 0);
