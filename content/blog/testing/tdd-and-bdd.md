---
title:  "BDD and TDD"
description: "뭐가 다르지?? 그냥 커맨트"
date:   2021-04-26 20:00:00 +0900
categories: [term]
---

### BDD & TDD

#### BDD(Behaviour-Driven Developement)는 TDD(Test-Driven Development)에 기반을 둔다. 많은 (X)DD가 있는데 대부분 TDD에 기반한다.

#### 차이

거의 차이가 없다.
- TDD는 테스트 자체에 집중한다.
- BDD는 요구사항에 집중한다.

> "Try not to think of a pink elephant." 라는 말을 들으면 우리는 핑크코끼리를 생각할 수 밖에 없다. 같은 의미로 어떤 일을 할지 말을 해놓으면 우리는 그런 생각을 하면서 코드를 작성할 수 있다. 실패하는 시나리오를 상상하면 실패하지 않을 경우를 추론할 수 있다.


### 생각하는 것을 테스트 하는것 그 후 개발하는 것 이 중요하다.

> 중요한 것은 너무 겁먹지 말고 상황에 맞는 접근법을 찾는 것이다.

### BDD 는 TDD의 진화의 산물

#### 유념해야 할 생각들

> Unit Test 의 이름은 문장이 되어야 한다. 더 인간이 사용하는 언어에 가깝게 작성해야 한다는 것이다.

- 자연어에 가까운 간단한 문장이 테스트 메서드에 집중시킨다.
- 메서드 이름이 should로 시작하는것. ex - should do something
- 중요한 User Story를 찾으면 테스트의 우선순위가 정해진다.
- 테스트를 가지고 대화할 수 있다. 아주 쉽게.

### // How To

User Story
- As a [X]
- I want [Y]
- so that [Z]

> X -> Y -> Z

---

> As a user, I want login with id and password, so that I can access my account.

- Given some initial context (the givens),
- When an event occurs,
- Then ensure some outcomes.

- Scenario 1: User uses wrong id
- Given a wrong userid : "usserid"
- And a password : "password"
- When the user login with userid and passsword
- Then login page should be shown again

---

- Scenario 2: User uses valid id
- Given a valid userid : "usserid"
- And a valid password : "password"
- When the user login with userid and password
- Then login page intial page will be show트