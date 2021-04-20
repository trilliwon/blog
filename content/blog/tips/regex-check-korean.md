---
title:  "Regular Expression 한글 check"
description: "정규표현식으로 한글을 확인하는 방법."
date:   2021-04-20 20:00:00 +0900
categories: [Regex]
---

# 정규표현식으로 한글을 확인하는 방법

```js
const re = /[가-힣]+/g;
const sample = 'Pomodoro, 안녕하세요. Hello World! 아닌데요. Really 저 아니에요.';
const result = re.exec(sample);
const result01 = sample.match(re);

console.log(result);
console.log(result01);
```