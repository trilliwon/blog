---
title:  "Storyboards vs Codes"
description: "iOS 에서 UI 개발을 위해 어떤 선택을 해야할까? 이 방법들의 장단점 분석"
date:   2021-05-16 20:00:00 +0900
categories: [ios]
---



## UI 개발을 위한 최선의 선택은 무엇인가?

- Storyboard, Nib
- Code


# Storyboards, Nibs or Xibs

> Storyboards: 여러개의 뷰를 한번에 구현할 수 있는 툴, 뷰들간 transition 등 처리 가능
> Xibs: 하나의 파일이 하나의 뷰에 대응

### 장점

- storyboard 혹은 xib 파일을 보면 한번에 어떤 뷰인지 파악이 가능
  - 큰 프로젝트에서는 도움이 되지 않았음.
  - view debugger 로 찾는것이 훨씬 빠랐다.
- 러닝커브, Beginner 에게 쉽다.
- ~~프로토타입에 용이~~
  - SwiftUI 가 나온 지금에 와서 더이상 장점이라 할 수 없음

### 단점

- 재사용성 없음
- xml 파일
- 코드리뷰 불가능
- 리팩터링에 용이하지 않음
  - 복잡한 뷰일수록 더 심각해짐.
- git diff
- View, VC <-> storyboard 연결 끊어진 경우. 실행해 봐야 알 수 있음.
- 메모리에서 읽기, 분석하기, 파싱하기 라는 단계
- IBOutlets 은 메모리관리 문제가 있음.
- Xcode 는 훌륭한 툴이 아님. 문제가 있다.

#### 재사용성 문제

- storyboard는 하위 뷰들을 재사용하기 어렵습니다
- xib 는 재사용이 가능하지만 작은 뷰임에도 불구하고 .swift, .xib 두개의 파일 (컨텍스트)를 오가면서 작성해야 하는 단점이 있습니다.
- 코드로만 작성되었다면 EmptyView() 이렇게 작성하면 끝나지만 xib 인 경우 Nib(... 와 같은 추가 코드가 필요합니다. extension 으로 간편하게 작성할 수 있겠지만 extension 도 추가적 코드이니까요.

#### Xcode 문제, 리팩터링

- 컨텐츠가 많은 페이지가 아님에도 불구하고 갑자기 빌드가 시작되면서 Xcode 가 느려지는 현상이 있습니다.
- 스토리보드에 대해 기능을 추가하거나 리팩터링해야 할때 코드보다 구조 파악이나 수정이 더 어렵습니다.
- 아무런 수정을 하지 않았음에도 불구하고 Xcode 가 storyboard 를 수정해 버립니다. (M)
- storyboard, xib 파일을 열면 xib를 parsing 하고 뷰로 보여줘야하기 때문에 컴퓨팅파워를 사용하게 되는데 사이즈에 따라 다르지만 비용이 매우 큽니다.

#### 코드리뷰 불가능

- 스토리보드나 xib 파일은 코드리뷰가 불가능합니다. xml 파일을 코드리뷰 할 수 있는 개발자는 아마 많지 않을거에요ㅠ.

#### Storyboard 와 코드간 연결

- 스토리보드와 swift 파일간 연결이 끊겨도 빌드가 됩니다. 빌드타임이 아니라 런타임에 체크하기 때문이죠.

# Code

- 별도의 파일이 아니라 코드로 UI 구현. Autolayout 을 이용. animation 등 적용이 용이.
- SwiftUI 의 Preview 기능을 이용하기 위해 UIViewRepresentable 을 사용할 수 있음.


### 장점

- UI 변경에 빠르게 대응할 수 있음
- 마우스가 아니라 키보드로 UI 작성할 수 있음
- Autolayout 구조에 대한 깊은 이해가 가능.
- 생산성
  - 조금만 익숙해지면 코드로 작성하는 것이 스토리보드 보다 개발속도, 리팩터링이 훨씬 빨라짐.
- 재사용성
- No xml Merge Conflicts (특히 팀으로 일할때)
- Debugging 이 쉬움
- 모든것을 디테일하게 컨트롤 가능
- Performance
  - 메모리에서 읽기, 분석하기, 파싱하기 라는 단계가 없음
- UIViewRepresentable (feat. SwiftUI)
- 성능
- 빌드속도 (클린빌드)
- 지역화 쉬움

### 단점

- 러닝커브?

--- 

## 정리 

> 완벽한 방식은 없지만 상황에 따라 더 나은 방식은 존재합니니다. 
> 한가지 확실한건 팀으로 일할때 좋은 방식은 Code 로 작성하는 겁니다. 심지어 애플의 open source ResearchKit 에서도 대부분의 UI는 코드로 작성되어있습니다.