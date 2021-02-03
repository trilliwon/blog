---
title: Swift Property Wrapper
date: "2021-02-20T09:00:03.284Z"
description: "Swift Property Wrapper"
categories: [Swift]
comments: true
---

Property Wrapper

Property는 상태를 가질 수 있습니다. 상태가 변할 때 변경사항을 전파하는 로직은 매우 일반적이죠. Property Observer didSet, willSet 을 사용해 다른 타입으로 값을 바꿔 사용하거나 UI업데이트 작업을 trigger 할 수 있겠네요. Property Wrapper 는 property 에 대해 저장하는 로직의 코드와 정의하는 코드를 분리합니다. 어떤 Property 의 값이 변경될 때 UserDefaults에 저장한다고 하면 유사한 property 들을 didSet 에서 매번 구현해 줘야 하죠. property wrapper 는 프러퍼티에 대한 wrapper 코드를 정의해 관련 작업을 추상화 할 수 있습니다.

container 와 wrapper 의 차이를 아시나요? 일반적으로 container 는 포함하는 element가 여러개 일 때, wrapper 는 한개 일때 쓴다고 합니다.
structure, enumeration, 또는 class 에 @propertyWrapper attribute 를 추가하고 wrappedValue 를 선언 해 주면 됩니다. 추가로 projectedValue 를 선언하면 wrappedValue 에 대한 project value (투영 값) 기능을 사용할 수 있습니다. property wrapper 로 구현된 property 의 앞에 $ 기호를 추가해 접근할 수 있습니다.