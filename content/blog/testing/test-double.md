---
title:  "Test double"
description: "mock, fake, stub ..."
date:   2021-01-10 20:00:00 +0900
categories: [term]
---

> Generic term is Test Double. 테스트에서 사용할 때 production object를 대신하는 용어다.

### Dummy
objects are passed around but never actually used. Usually they are just used to fill parameter lists.
실제로 사용되지 않으며 파라미터로 넘겨질 수 있는 오브젝트, 단지 파라미터 리스트를 채우기 위해 사용함.

### Fake
objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an InMemoryTestDatabase is a good example).
작동하는 구현이 있는 오브젝트 이지만 대부분 간단한 작동을 위해서만 사용하기 때문에 production 코드와 구별된다. InMemoryTestDatabase 가 좋은 예.

### Stubs
provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
테스트시 호출에 대해 미리 정해진 결과를 제공합니다. 테스트를 위한 프로그램 외에는 응답을 제공하지 않음.
결과를 제공 (true, returns)

### Spies
are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
Stubs 와 같지만 호출된 방식에 따라 정보를 기록한다. 이메일 서비스에서 몇개의 메시지가 보내졌는지 기록하는 역할.
결과를 제공 하고 기록

### Mocks

are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.
호출에 대해 예상하는 결과를 받을 수 있도록 미리 프로그램 된 오브젝트,
예상되지 않는 호출에 대해 throw exception 할 수 도 있다. 예상하는 모든 결과를 받았는지 확인할 수 있다.

- Test Double at XUnitPatterns.com

- https://martinfowler.com/bliki/TestDouble.html
- http://xunitpatterns.com/Test%20Double.html