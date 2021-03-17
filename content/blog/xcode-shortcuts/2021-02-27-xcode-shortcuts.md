---
title: "생산성 향상을 위한 Xcode 단축키들: ⌘ + R 을 넘어서"
date: "2021-02-27T10:00:03.284Z"
description: "생산성은 주어진 시간 동안 생산하는 가치의 양이죠. 가치를 올리거나 시간을 줄이면 생산성이 향상됩니다..."
categories: [xcode, ios, productivity]
comments: true
---

> 생산성은 주어진 시간 동안 생산하는 가치의 양이죠. 가치를 올리거나 시간을 줄이면 생산성이 향상됩니다.<br>
> 아주 작은 시간들이지만 매우 반복적인 시간들을 절약할 수 있다면 분명히 생산성이 향상 될겁니다.<br>
> 생산성 향상을 위한 Xcode 사용팁과 단축키들에 대해 공유해 볼까 합니다.<br>
> Build와 Run, Test, Clean을 위한 기본적인 단축키들은 이미 잘 아실거라 생각됩니다.<br>

### 기본적인 Run, Stop, Clean Build Folder 단축키들

- Run: `⌘ R` // 실행 ▶️
- Stop: `⌘ .`
- Clean Build Folder: `⇧ ⌘ K`

### Run without Building: `^ ⌘ R`

코드를 수정했지만 새로 빌드 후 실행 하지않고 기존 빌드로 실행하고 싶을 때 사용할 수 있습니다.<br>
예를 들면 collectionView 를 선언할 때 `sectionInset, scrollDirection`은 기본값이 `0, .vertical`입니다. 제거해도 실행결과에 영향을 주지 않기 때문에. 빌드 없이 실행 하면 됩니다.

<img src = "/2021-02-27/build1.png"> <br />

위 코드에서 collectionView의 `backgroundColor`를 `.black`으로 바꾸려고 한다고 칩시다. <br>
수정하고 빌드 및 실행해도 되지만 Xcode의 디버깅 툴을 이용하면 쉽게 결과를 확인할 수 있습니다. <br>
실행중이 아니라면 기존 빌드로 바로 실행하여 `^ ⌘ R` 확인 할 수 있습니다.

<img src = "/2021-02-27/build2.png"> <br />

### 빌드: `⌘ B`

`⌘ + B` 를 사용하면 빌드만 됩니다. 빌드시간을 상태바에서 확인하기 위해서는 터미널에<br>
`defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES`<br>
커맨드를 실행하면 됩니다. 아래처럼 상태바에  빌드시간이 표시됩니다. <br>
<img src = "/2021-02-27/build3.png"> <br />
혹은 `Product ➔ Perform Action ➔ Build with Timing Summary` 메뉴를 사용해도 됩니다.

### 테스트: `⌘ U`

테스트를 실행합니다. 테스트는 반복적인 작업이죠. 수정의 연속됩니다. <br>
매번 전체 테스트를 실행하는 대신 현재 작성중인 테스트함수만 실행하면 시간을 줄일 수 있겠죠? <br>
이 때 `⌃ ⌥ ⌘ U`를 사용하면 됩니다. 커서가 아래처럼 테스트 함수 내부에 있어야 합니다.

<img src = "/2021-02-27/build4.png"> <br />

---

# Editor 팁

## 새로운 에디터 열기: `⌃ ⌘ T`

<img src = "/2021-02-27/new-editor.gif"> <br/>

## 파일 빨리 열기: `⇧ ⌘ O`

<img src = "/2021-02-27/open-quickly.gif"> <br/>

## Focus 이동하기: ``^ ` ``, `⌘ J`

현재 열려있는 다음 에디터로 Focus 이동, 혹은 `⌘ J`로 원하는 에디터로 이동.

<img src = "/2021-02-27/move-focus.gif"> <br/>

## Jump to Definition: `^ ⌘ J`

선언파일로 점프할때 사용할 수 있습니다. 정말 자주 사용합니다.

<img src = "/2021-02-27/jump-to-definition.gif"> <br/>

## Project Navigator 에서 파일 선택하기: `⇧ ⌘ J`

특정 파일에서 코딩을 하다가 현재 어느 폴더에 속해 있는지 알아야 할 때가 있죠. 혹은 같은 폴더에 있는 파일로 이동할 때 사용할 수 있습니다.

<img src = "/2021-02-27/reveal-file.gif"> <br/>

## Show Code Actions: `⇧ ⌘ A`

원하는 액션을 빠르게 실행할 수 있습니다.

<img src = "/2021-02-27/show-code-actions.gif"> <br/>

## 현재 범위에서 편집하기: `⌃ ⌘ E`

현재 에디터에서 변수나 함수를 수정할 때 사용 할 수 있습니다.

<img src = "/2021-02-27/edit-in-scope.gif"> <br/>


## 여러개 커서 만들기 위/아래: `⇧ ⌃ ↑` /  `⇧ ⌃ ↓`

이 단축키도 중복된 코드를 수정할 때 정말 자주 사용하게 됩니다.

<img src = "/2021-02-27/next-occurence.gif"> <br/>

## Select Next Occurrence: `⌥ ⌘ E`, `⇧ ⌥ ⌘ E`

텍스트가 선택된 상태에서 동일한 텍스트를 선택할 때 사용합니다. Shift `⇧`를 선택하면 이전 단어를 선택합니다.
제가 생각했을 때 가장 유용한 단축키입니다.

<img src = "/2021-02-27/next-occurrence1.gif"> <br/>

## 검색: `⌘ F`, `⇧ ⌘ F`, `⇧ ⌘ G`

에디터 내부에서 텍스트 검색은 `⌘ F`이죠. `⇧ ⌘ F` 는 프로젝트 스콥에서 검색합니다.<br>
<img src = "/2021-02-27/findg.png"> <br/>
<br>프로젝트 스콥에서 검색 후 `⌃ ⌘ G` 를 사용하면 다음 검색결과를 선택합니다.<br>
<img src = "/2021-02-27/find-in-proj.gif"> <br/>


## Fix All Issues: `⌃ ⌥ ⌘ F`

Xcode가 코드의 Syntax 오류를 수정할 수 있는 경우 아래와 같은 사인이 뜨죠?<br>
<img src = "/2021-02-27/fix0.png"> <br/>

<br> 만약 수정할 수 있는 방법이 하나 뿐이라면 `⌃ ⌥ ⌘ F` 조합으로 쉽게 수정할 수 있습니다.

<img src = "/2021-02-27/fix3.gif"> <br/>

하지만 아래처럼 수정할 수 있는 방법이 여러개이면 사용할 수 없어요.<br>

<img src = "/2021-02-27/fix2.png"> <br/>


# 마무리

iOS개발자들에게 Xcode외에 사용할 수 있는 IDE 대안이 크게 없어 보입니다.
[AppCode](https://www.jetbrains.com/objc/)나 [VSCode](https://nshipster.com/vscode/)를 사용해 볼 수도 있지만 단점들이 더 많아 보입니다.<br>
공유드린 것들 외에도 사용하지 못하고 있는 많은 단축키와 기능들이 존재할 겁니다. 찾아보고 사용해보다 보면 손에 익숙해지고 생산성을 올릴 수 있습니다. 잘 사용한다면 손목 통증도 덜 생기겠죠.<br>
이 글이 조금이나마 도움이 됐으면 좋겠습니다.<br>
 
**테스트 주도 개발 - 켄트 벡** 의 샤워 방법론을 소개하면서 글을 마무리 하겠습니다.

> **샤워 방법론** - 키보드로 쳐야 할것을 알면 치면 된다. 모르면 샤워하러 가서 뭘 해야 하는지 생각 날 때까지 계속 샤워를 한다. 샤워 방법론을 따른다면 많은 팀들이 더 행복해 질 것이고 생산성도 향상될 것이고 냄새도 좋아질 것이다.

- 언젠가 Xcode에서 공식 Vim을 사용할 수 있는 날을 고대하며...

### 참고

- [Keyboard Shortcuts for Xcode](https://mouseless.app/xcode-keyboard-shortcuts/)
- [Xcode Workspace Window Overview](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/TheWorkspaceWindow.html#//apple_ref/doc/uid/TP40010215-CH25-SW1)

