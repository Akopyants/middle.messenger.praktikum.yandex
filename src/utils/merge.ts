type Indexed<T = unknown> = {
  [key in string]: T;
};
function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const key in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
      continue;
    }

    try {
      if ((rhs[key] as { constructor: unknown }).constructor === Object) {
        rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } catch (e) {
      lhs[key] = rhs[key];
    }
  }

  return lhs;
}

export default merge;
