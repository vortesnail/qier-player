/**
 * Conditionally joining classNames together.
 * https://github.com/JedWatson/classnames
 * @param args any[]
 */
function classNames(...args: any[]): string {
  const classes = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length > 0) {
        const inner = classNames(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const key in arg) {
          if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}

export default classNames;
