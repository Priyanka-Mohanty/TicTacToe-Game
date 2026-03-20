if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() { return [...this].reverse(); };
}
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) { return [...this].sort(compareFn); };
}
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(start, deleteCount, ...items) {
    const copy = [...this];
    copy.splice(start, deleteCount, ...items);
    return copy;
  };
}
if (!Array.prototype.with) {
  Array.prototype.with = function(index, value) {
    const copy = [...this];
    copy[index] = value;
    return copy;
  };
}
if (!URL.canParse) {
  URL.canParse = function(url, base) {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
