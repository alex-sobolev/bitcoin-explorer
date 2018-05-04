export const splitArr = (arr, limit) =>
  arr.reduce(
    (acc, block) => {
      const currentArr = acc[acc.length - 1];

      if (currentArr.length < limit) {
        return [ ...acc.slice(0, acc.length - 1), [ ...currentArr, block ] ];
      }

      return [ ...acc, [ block ] ];
    },
    [ [] ]
  );
