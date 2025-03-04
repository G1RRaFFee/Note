export const transformEmptyStringsToNull = <T>(data: T): T => {
  if (data === null || data === undefined) return data;

  if (Array.isArray(data)) {
    return data.map((item) =>
      transformEmptyStringsToNull(item),
    ) as unknown as T;
  }

  if (typeof data === 'object') {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: transformEmptyStringsToNull(value),
      }),
      {} as T,
    );
  }

  return data === '' ? null : (data as T);
};
