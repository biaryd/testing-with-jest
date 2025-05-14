const _ = require('underscore');

let stack = [];

// Lägger ett element överst i stacken
exports.push = function (x) {
    stack.push(x);
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return stack.pop();
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    return _.last(stack);
}

// Returnerar det minsta värdet i stacken
exports.min = function () {
    return Math.min(...stack);
  }
  
// Returnerar det största värdet i stacken
exports.max = function () {
    return Math.max(...stack);
  }