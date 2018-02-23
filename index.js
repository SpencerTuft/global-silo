let global_store = {};

/**
 * Checks if the value is a string
 * @param val
 * @returns {boolean}
 */
const isStr = (val) => typeof val === 'string';

/**
 * Initializes multiple variables by calling the set method for each array element.
 * @param options is an array of arrays, each with two strings, e.g. [[key, value], [key2, value2]].
 */
const init = (options) => {
  if (Object.keys(global_store).length !== 0) throw new Error('The silo already has been initialized');
  if (options && !Array.isArray(options)) throw new Error('The parameter must be an array');
  options.forEach((option, index) => {
    // option[0] is key
    // option[1] is value

    // Verifying the integrity of the configuration option structure
    if (!Array.isArray(option)) throw new Error(`Element at index ${index} must be an array`);
    if (option.length > 2) throw new Error(`Element at index ${index} has too many elements. Should contain 2 elements`);
    if (option.length < 2) throw new Error(`Element at index ${index} has too few elements. Should contain 2 elements`);
    if (!isStr(option[0])) throw new Error(`Element key at index ${index} must be a string.`);
    // Save the key-value pair in the store
    set(option[0], option[1]);
  });
};

/**
 * Retrieves all the store properties and values
 * @returns the store
 */
const all = () => global_store;

/**
 * Retrieves the key-value pair
 * @param key
 * @returns the value of the key in the store
 */
const get = (key) => {
  if (!isStr(key)) throw new Error('Parameter must be a string.');
  return global_store[key];
};

/**
 * Stores the key-value pair, over-writes the key if it already exists
 * @param key is the store property (must be a string)
 * @param val is the value of this store property
 * @returns the key
 */
const set = (key, val) => {
  if (!isStr(key)) throw new Error('Parameter must be a string.');
  global_store[key] = val;
  return key;
};

/**
 * Creates the key-value pair, will not over-write the key if it already exists
 * @param key is the store property (must be a string)
 * @param val is the value of this store property
 * @returns the key or null
 */
const create = (key, val) => {
  if (!isStr(key)) throw new Error('Parameter must be a string.');
  if (global_store[key] === undefined) {
    global_store[key] = val;
    return key;
  }
  return null;
};

/**
 * Removes the property from the store
 * @param key is the store property (must be a string)
 */
const remove = (key) => {
  if (!isStr(key)) throw new Error('Parameter must be a string.');
  delete global_store[key];
};

/**
 * Copy the value from one property to another
 * @param src is the property of the value that you want to copy (must be a string)
 * @param dest is the destination to which the value will be copied (must be a string)
 * @returns the dest
 */
const copy = (src, dest) => {
  if (!isStr(src) || !isStr(dest)) throw new Error('Parameters must be strings.');
  global_store[dest] = global_store[src];
  return dest;
};

/**
 * Move the value from one property to another
 * @param src is the property of the value that you want to move (must be a string)
 * @param dest is the destination to which the value will be moved (must be a string)
 * @returns the dest
 */
const move = (src, dest) => {
  if (!isStr(src) || !isStr(dest)) throw new Error('Parameters must be strings.');
  if (src !== dest) {
    global_store[dest] = global_store[src];
    delete global_store[src];
  }
  return dest;
};

module.exports = {
  init: init,
  all: all,
  get: get,
  set: set,
  add: create,
  rm: remove,
  cp: copy,
  mv: move
};
