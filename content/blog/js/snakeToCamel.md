---
title: "Snake to Camel in js"
date: "2021-04-10T10:00:03.284Z"
description: "snake to camel in js"
categories: [js]
comments: true
---

```js
const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
);

const result = snakeToCamel('convert-snake-string-to_camel'); 
console.log(result);
```
