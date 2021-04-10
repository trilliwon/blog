const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
);

const result = snakeToCamel('convert-snake-string-to_camel'); 
console.log(result);