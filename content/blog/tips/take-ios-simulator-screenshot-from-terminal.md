---
title:  "How to take a screenshot and record a Video in iOS Simulator in Terminal"
description: "take a screenshot and record a Video"
date:   2021-01-21 20:00:00 +0900
categories: [tip]
---

### commands

```
xcrun simctl io booted screenshot 1r.png
xcrun simctl io booted recordVideo appPreview.mp4
```


### More

```
xcrun simctl list
xcrun simctl addmedia booted ~/Desktop/sample.png
xcrun simctl list | grep Booted # list booted simulators
xcrun simctl shutdown $UUID
xcrun simctl erase $UUID
pbcopy ~/Desktop/sample.txt
xcrun simctl pbpaste booted
xcrun simctl openurl booted "https://developer.apple.com"
```