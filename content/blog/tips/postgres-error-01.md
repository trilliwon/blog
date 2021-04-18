---
title:  "PostgreSQL stale ‘postmaster.pid’ error"
description: "Fixing PostgreSQL stale ‘postmaster.pid’ error"
date:   2021-04-18 20:00:00 +0900
categories: [PostgreSQL]
---

### I had an error start postgre local server like `PostgreSQL stale ‘postmaster.pid’ error`

- To fix this error should just remove `postmaster.pid` file. This issue happens when the PostgreSQL process dies without cleaning up its pid file.

### Delete `postmaster.pid`

- `cd Library/Application\ Support/Postgres/var-13/`
- `rm postmaster.pid`


