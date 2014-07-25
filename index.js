/* jslint node:true */

require('colors');

console.error = function () {
    'use strict';

    var args = ['ERROR'.red.bold];
    var errors = [];
    for (var arg in arguments) {
        if (arguments[arg] instanceof Error) {
            errors.push(arguments[arg]);
            args.push(arguments[arg].message);
        } else {
            args.push(arguments[arg]);
        }
    }

    var pos = new Error().stack.split('\n')[2];
    if (pos.indexOf(__dirname) >= 0) pos = pos.slice(pos.indexOf(__dirname) + __dirname.length).replace(')', '');
    args.push(String('[ ' + pos + ' ]').bold);

    if (errors.length > 0) args = args.concat(errors.map(function (e) {
        return '\n' + (e.message ? e.message : '').italic.bold + ' ' + e.stack.grey;
    }));

    console.log.apply(console, args);
};
