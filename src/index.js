module.exports = function check(str, bracketsConfig) {
  
  const openSet = new Set();
  const closeSet = new Set();
  const sameSet = new Set();

  for (const [open, close] of bracketsConfig) {
    if (open === close) {
      sameSet.add(open);
    } else {
      openSet.add(open);
      closeSet.add(close);
    }
  }

  const stack = [];

  for (const bracket of str) {
    if (sameSet.has(bracket)) {
      if (stack.length > 0 && stack[stack.length - 1] === bracket) {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    } else if (openSet.has(bracket)) {
      stack.push(bracket);
    } else if (closeSet.has(bracket)) {
      const last = stack.pop();
      if (!last || bracketsConfig.find(([open, close]) => open === last && close === bracket) === undefined) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
