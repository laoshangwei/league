String.prototype.format = function (args) {
    var str = this;
    var args = Array.isArray(args) || typeof args === 'object' && length in args ? Array.from(args) : Array.from(arguments);
    args.forEach((arg, i) => str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arg));
    return str;
}