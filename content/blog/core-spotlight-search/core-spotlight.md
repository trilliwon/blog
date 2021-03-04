---
title: "About Core Spotlight"
date: "2021-03-04T10:00:03.284Z"
description: "Index your app so users can search the content from Spotlight and Safari."
categories: [ios, spotlight]
comments: true
---

### Core Spotlight를 이용해 앱 접근성을 향상시키기 위한 전략

> Core Spotlight는 OS 레벨에서 앱 컨텐츠를 검색하고 인터렉션 할 수 있는 인터페이스를 제공합니다. 
> Core Spotlight에 인덱싱 하는 방법은 3가지가 존재 합니다.

- SiriKit
    - 유저가 추가한 Siri Shortcuts 을 검색하거나 Siri에 의해 적절한 타이밍에 유저에게 제안될 수 있습니다.
- CoreSpotlight
    - 앱의 컨텐츠를 Spotlight DB에 인덱싱 하고 검색결과에서 컨텐츠로 랜딩할 수 있는 기능을 제공합니다.
- NSUserActivity
    - 유저의 액션들을 Spotlight DB에 인덱싱하고 그 액션들을 추천하거나 검색후 특정화면으로 이동하거나 액션을 트리거 할 수 있습니다.
- Web Markup
    - 포멧에 맞게 구현된 웹페이지가 일반 웹페이지보다 좀더 유려한 UI 로 검색되도록 할 수 있습니다.


https://developer.apple.com/documentation/sirikit
https://developer.apple.com/documentation/sirikit/shortcut_management/suggesting_shortcuts_to_users
https://developer.apple.com/documentation/sirikit/donating_shortcuts
https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/AppContent.html