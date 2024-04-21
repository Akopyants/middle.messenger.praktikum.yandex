import merge from "./merge";

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    return 'path must be string';
  }

  const result = path.split('.').reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value,
  );
  return merge(object as Indexed, result as Indexed);
}

export default set;

/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */
