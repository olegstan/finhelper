export function isset(obj) {
  var i, max_i;
  if(obj === undefined) return false;
  for (i = 1, max_i = arguments.length; i < max_i; i++) {
    if (obj[arguments[i]] === undefined) {
      return false;
    }
    obj = obj[arguments[i]];
  }
  return true;
};

// export {isset}