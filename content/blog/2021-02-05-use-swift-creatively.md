---
title: Swift의 dynamic한 기능들
date: "2021-02-05T07:26:03.284Z"
description: "About Swift's KeyPath, dynamicMemberLookup, Function Builder, Property Wrapper"
categories: [Swift]
comments: true
---

Swift 는 C와 Objective-C 와의 연동이 뛰어나지만 JS, Python 과 같은 dynamic 언어들과는 상대적으로 떨어집니다. 그 이유들로 추가되고 있는 기능들이 있습니다. KeyPath, dynamicMemberLookup 등 Swift의 dynamic 한 기능들을 살펴보고 언제 사용해 볼 수 있을지를 고찰해 보려고 합니다.

# KeyPath

이름 멋지지 않습니까?

KeyPath는 값에 대한 참조가 아닌 프로퍼티에 대한 참조입니다. 말그대로 어떤 타입의 값에 대한 path 를 표현하는 것입니다. 변수는 값을 저장합니다. 즉 값에 대한 참조입니다. 변수를 사용하면 값(value)에 접근할 수 있습니다. 값에 대한 참조라고 하면 이런거겠죠.

```swift
struct Employee {
    var name: String
}

let jay = Employee(name: "Jay")
jay.name // "Jay"
```

KeyPath 는 변수와는 다르게 프로퍼티 자체를 가지고 있는 오브젝트 입니다. 프로퍼티를 자체를 참조합니다.

```swift
struct Employee {
    let name: String
    let role: String
    let level: Int
}

var designer = Employee(name: "Song", role: "Designer", level: 10)
let nameKeyPath: KeyPath<Employee, String> = \Employee.name
```

KeyPath 표현식은 백슬래시 `\` 로 시작합니다. `\<type name>.<path>`.

`<type name>` 은 제네릭 파라미터를 가지고 있거나 subscript 타입도 가능합니다. `<path>` 는 프로퍼티 이름이나 subscript 가 됩니다. 타입 추론이 되기 때문에  컴파일러가 현재 컨텍스트에서 타입을 추론할 수 있다면 `<type name>` 을 생략하고 `\.<path>` 로 사용할 수 있습니다.

#### 5 가지의 KeyPath 가 존재합니다.

- AnyKeyPath
- APartialKeyPath<Source>
- KeyPath<Source, Target>
- WritableKeyPath<Source, Target>
- ReferenceWritableKeyPath<Source, Target>
    - Source 가 reference type 일 때 사용합니다.

```swift
let strKeyPath: KeyPath<String, Int> = \String.count
let subscriptKeyPath: KeyPath<[Int], Int> = \[Int].count
let arrKeyPath: KeyPath<Array<Int>, Int> = \.count
let dictKeyPath = \Dictionary<String, Int>.values
let secondDomainKeyPath = \[String].[1]
// WritableKeyPath<Dictionary<String, Int>, Dictionary<String, Int>.Values>
```

KeyPath 를 이용해 값에 접근하기 `subscript(keyPath:)` 에 KeyPath 를 넘겨주면 됩니다.

```swift

struct Episode {
    let id: Int
    let name: String
}

var e1 = Episode(id: 42, name: "Scary Being")
let idKeyPath = \Episode.id
e1[keyPath: idKeyPath] // 42 

```

JS 의 오브젝트를 연상시킵니다. 단 Swift 는 type safe 하죠. 그럼 typescript 는?

```js
function Episode() {
    this.name = "not scary being"
    this.id = 41
}

let e1 = new Episode()
e1["name"] // "not scary being"
```

Swift5.2 에서는 Key Path Expressions 을 함수로 사용할 수 있도록 하는 제안이 구현되었습니다. `(Root) -> Value`의 함수를 `\Root.value` 로 사용할 수 있습니다. [SE-0249](https://github.com/apple/swift-evolution/blob/master/proposals/0249-key-path-literal-function-expressions.md)

```swift
let episodes = [
    Episode(id: 1, name: "Mon Story"),
    Episode(id: 2, name: "Tue Story"),
    Episode(id: 3, name: "Wed Story")
]
episodes.map(\.name) // episodes.map { $0[keyPath: \.name] }
```

- Swift.Collection 에 구현되어 있는 sorted 함수의 closure type 은 `(Root) -> Value` 가 아닙니다. key path 를 사용하기 위해 extension 을 사용하면 아래와 같습니다.

```swift
// func sorted(by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool) rethrows -> [Self.Element]

extension Sequence {
    func sorted<T: Comparable>(by keyPath: KeyPath<Element, T>) -> [Element] {
        // areInIncreasingOrder
        sorted { $0[keyPath: keyPath] < $1[keyPath: keyPath] }
    }
}

// closure 사용
episodes.sorted(by: { $0.name < $1.name } )

// keypath 사용
episodes.sorted(by: \.name)
```

- keyPath 는 `appending` 가능합니다. KeyPath<A, B> .appending( KeyPath<B, C>) 처럼 append 하는 KeyPath 의 root type 은 B 여야 합니다. 

```swift
struct Episode {
    let id: Int
    let name: String
    let creator: Creator
}

struct Creator: Decodable {
    let id: Int
    let name: String
}

var e1 = Episode(id: 42, name: "Scary Being", creator: .init(id: 72, name: "Why"))

// KeyPath<Episode, Creator>
let episodeCreatorKeyPath = \Episode.creator

// KeyPath<Episode, Creator> + KeyPath<Creator, String>
let creatorNameKeyPath = episodeCreatorKeyPath.appending(path: \Creator.name)

e1[keyPath: episodeCreatorKeyPath.appending(path: \.id)] // 72
e1[keyPath: creatorNameKeyPath] // Why
```

- KVO 에서도 keyPath를 사용할 수 있습니다. webview 의 progress 를 observe 할 때 아래처럼 사용합니다.

```swift
var progressObservation: NSKeyValueObservation?

progressObservation = webView
    .observe(\.estimatedProgress, options: [.new, .old]) { (webview, change: NSKeyValueObservedChange<Double>) in
        print(webview.estimatedProgress)
    }

```

# dynamicMemberLookup 

- [SE-0195](https://github.com/apple/swift-evolution/blob/master/proposals/0195-dynamic-member-lookup.md)

KeyPath 는 dynamicMemberLookup과 함께 사용할 수 있습니다.
dynamicMemberLookup 은 python 과 같은 dynamic 한 언어들과의 연동을 위해 추가된 기능입니다. 하지만 Swift 의 type safty 를 버리지 않습니다. dot 으로 프로퍼티에 접근하지만 그 접근되는 프러퍼티는 런타임에 결정됩니다. class, structure, enumeration 과 protocol 에 추가 할 수 있습니다. `@dynamicMemberLookup` 를 추가하고 `subscript(dynamicMemberLookup:)` 를 구현하면 됩니다.

`subscript(dynamicMemberLookup:)` 에 넘길 수 있는 파라미터 타입은 KeyPath, WritableKeyPath, ReferenceWritableKeyPath 그리고 ExpressibleByStringLiteral 타입 입니다. 

```swift
@dynamicMemberLookup
struct Episode {
    let id: Int
    var name: String

    var arbitrary: [String: String] {
        ["aliases": "\(name)", "emojis": "🌱 🥵 🍁 ❄️"]
    }

    subscript(dynamicMember member: String) -> [String] {
        get { arbitrary[member, default: ""].components(separatedBy: " ") }
        set { name = "\(name) \(newValue.joined())" }
    }
}

var episode = Episode(id: 42, name: "그때, 우리가 있었던 계절")
episode.aliases // ["그때,", "우리가", "있었던", "계절"]
episode.emojis // ["🌱", "🥵", "🍁", "❄️"]
episode.emoji = ["🥕"]
episode.name // "그때, 우리가 있었던 계절 🥕"
```

### dynamicMemberlookup 과 KeyPath 를 이용한 Builder pattern

- 책 Effective Java - Item 2: "생성자에 매개변수가 많다면 빌더를 고려하라."

타입의 매개변수가 많을 때 생성자 대신 빌더를 사용하면 사용이 쉽고 가독성 좋은 코드를 얻을 수 있다는 내용입니다.

```swift
public final class NutritionFacts {
  private final int servingSize;
  private final int servings;
  private final int calories;
  private final int fat;
  private final int sodium;
  private final int carbohydrate;

  public static final class Builder {
    ...
    public Builder calories(int val) {
      calories = val;
      return this;
    }
    ...
  }
}

...

NutritionFacts cocoCola = new NutritionFacts.Builder(240, 8).
      calories(100).sodium(35).carbohydrate(27).build();
```

Java 의 클래스에 대한 내용이지만 Swift 의 클래스 생성시에 같은 장점을 얻을 수 있습니다. 


- Base 를 Root 로 하는 KeyPath 를 이용해 dynamicMemberLookup subscript 함수를 구현합니다.
- Buildable protocol 을 선언하고 NSObject 가 Buildable 를 사용할 수 있도록 확장합니다.

```swift
@dynamicMemberLookup
public struct Builder<Base: AnyObject> {

    private var base: Base

    public init(_ base: Base) {
        self.base = base
    }

    public subscript<Value>(dynamicMember keyPath: ReferenceWritableKeyPath<Base, Value>) -> (Value) -> Builder<Base> {
        { [base] value in
            base[keyPath: keyPath] = value
            return Builder(base)
        }
    }

    public func build() -> Base { base }
}

public protocol Buildable {
    associatedtype Base: AnyObject
    var builder: Builder<Base> { get }
}

public extension Buildable where Self: AnyObject {
    var builder: Builder<Self> { Builder(self) }
}

extension NSObject: Buildable {}
```

- NSObject 타입에서 builder를 사용할 수 있습니다.

```swift
var profileImage = UIImageView(image: UIImage(named: "profile")).builder
    .translatesAutoresizingMaskIntoConstraints(false)
    .backgroundColor(UIColor.lightGray)
    .clipsToBounds(true)
    .contentMode(.scaleAspectFill)
    .build()

var nameLabel = UILabel().builder
    .text("픽셀")
    .textAlignment(.center)
    .textColor(UIColor.black)
    .numberOfLines(1)
    .build()
```

- UIKit 의 imageView 를 생성할 때 가능한 방법 중 하나는 아래와 같습니다. builder 사용한 코드가 더 좋은 가독성을 가진다고 생각되면 builder 를, 아니면 아래처럼 사용해도 무방할 것 같네요.

```swift
var thumb: UIImageView = {
    $0.translatesAutoresizingMaskIntoConstraints = false
    $0.clipsToBounds = true
    $0.backgroundColor = UIColor.lightGray
    $0.contentMode = .scaleAspectFill
    return $0
}(UIImageView(image: UIImage(named: "thumb")))
```

- dynamicMemberLookup 과 비슷하게 dynamicCallable [SE-0216](https://github.com/apple/swift-evolution/blob/master/proposals/0216-dynamic-callable.md)도 존재합니다. dynamic 언어들과 브짓지를 위해 사용할 수 있습니다.

## 결론

- Swift의 기능들을 잘 사용하면 다양한 상황에서 도움이 될 수 있다.

### 참고

- [Key Path Expressions as Functions](https://github.com/apple/swift-evolution/blob/master/proposals/0249-key-path-literal-function-expressions.md)
- [Key-Path Expressions](https://developer.apple.com/documentation/swift/swift_standard_library/key-path_expressions)
- [TSPL Attributes](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html)
- [SwiftLee](https://www.avanderlee.com/swift/dynamic-member-lookup/)
- [Hacking With Swift](https://www.hackingwithswift.com/articles/55/how-to-use-dynamic-member-lookup-in-swift)
- [Swift by Sundell](https://www.swiftbysundell.com/tips/combining-dynamic-member-lookup-with-key-paths/)
- [Swift by Sundell](https://www.swiftbysundell.com/articles/the-power-of-key-paths-in-swift/)
- [SE-0289](https://github.com/apple/swift-evolution/blob/master/proposals/0289-function-builders.md)