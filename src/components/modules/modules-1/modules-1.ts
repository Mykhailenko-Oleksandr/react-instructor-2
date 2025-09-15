// Типізація об'єктів
// // Використання інтерфейсів
// Опціональні (?) та readonly поля
// Типізація масивів
// Помилки типізації масивів
// Типізація масиву об'єктів
// Власні типи
// Власні та літеральні типи
// Intersection (&)
// Типізація функцій
// Типізація аргументів
// Опціональні параметри
// Function Type (Тип функції)
// Перелічення (enum)
// Рядкові значення
// Узагальнені типи (generics)
// Generics у структурах даних
// Generics у відповідях API
// Типізація промісів
// Типізація HTTP-запитів
// Типізація GETзапитів з Axios

//////////////////////////////// Типізація об'єктів //////////////////////////////////////////////////////////////////

//////////////////////////////// Використання інтерфейсів ////////////////////////////////////////////////////////////

// Якщо є декілька об’єктів з однаковим типом, незручно дублювати їх опис перед кожним оголошенням.

// const poly: { name: string; age: number } = {
//   name: "Poly",
//   age: 25
// };

// const jacob: { name: string; age: number } = {
//   name: "Jacob",
//   age: 36
// };

// Для цього можна використовувати інтерфейси (interface):

// // Оголошуємо інтерфейс користувача
// interface User {
//   name: string;
//   age: number;
// }

// // Використовуємо інтерфейс для типізації
// const poly: User = {
//   name: "Poly",
//   age: 25
// };

// const jacob: User = {
//   name: "Jacob",
//   age: 36
// };

// Тут User – це власний тип, створений для представлення об'єкта користувача.
// Його можна використовувати для будь-яких змінних такого формату.
// Інтерфейси дозволяють покращити структуру та повторне використання коду.

//////////////////////////////// Опціональні (?) та readonly поля ////////////////////////////////////////////////////////////

// TypeScript дозволяє позначати деякі поля як опціональні, тобто такі, які можуть бути відсутні в об'єкті.
// Для цього після імені властивості додається ? при описі типу.

// interface User {
//   name: string;
//   age?: number; // Це поле може бути відсутнім
// }

// const poly: User = {
//   name: "Poly"
// };

// console.log(poly.age); // ✅ Не буде помилки, оскільки age може бути відсутнім

// const jacob: User = {
//   name: "Jacob",
//   age: 36
// };

// console.log(jacob.age);

// Також можна позначити поле як readonly, щоб його не можна було змінювати після ініціалізації.

// interface User {
//   readonly id: number; // Це поле тільки для читання
//   name: string;
// }

// const user: User = {
//   id: 123,
//   name: "Alice"
// };

// user.id = 456; // ❌ Помилка: Cannot assign to 'id' because it is a read-only property.

//////////////////////////////// Типізація масивів ////////////////////////////////////////////////////////////

// Масиви в TypeScript – це списки значень, так само як і в JavaScript. Завдяки статичній типізації вони
// допомагають уникати помилок при роботі з даними.

// Існує два основних способи оголошення масивів:

// використання тип[]
// використання Array<тип>

// Ось як це виглядає в коді:

// const numbers: number[] = [1, 2, 3, 4, 5];
// const names: string[] = ["Alice", "Bob", "Charlie"];

// Альтернативний синтаксис:

// const numbers: Array<number> = [1, 2, 3, 4, 5];
// const names: Array<string> = ["Alice", "Bob", "Charlie"];

// Обидва варіанти є еквівалентними, проте у стандартних сценаріях рекомендується використовувати тип[],
// оскільки він коротший і зрозуміліший. Синтаксис Array<T> частіше застосовується у випадках, коли працюємо
// з узагальненнями (generics), про які ми поговоримо пізніше.

// TypeScript також автоматично виводить типи для масивів, тому в простих випадках тип можна не задавати:

// // TypeScript виведе тип як number[]
// const numbers = [1, 2, 3];

// // TypeScript виведе тип як string[]
// const names = ["Alice", "Bob"];

/////////////////////////// Помилки типізації масивів

// TypeScript дозволяє створювати масиви лише з визначеним типом даних. Якщо спробувати додати в масив
// значення іншого типу, буде помилка:

// const numbers: number[] = [1, 2, 3];

// numbers.push(4); // ✅ Можна додати число

// numbers.push("5");
// // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// Також TypeScript не дозволяє звертатись до неіснуючих елементів без додаткових перевірок:

// const names: string[] = ["Alice", "Bob"];

// console.log(names[5].toUpperCase());
// // ❌ Error: Object is possibly 'undefined'.

////////////////////////////////////////// Типізація масиву об'єктів

// TypeScript дозволяє типізувати масиви, що містять об'єкти. Створюємо інтерфейс User для типізації
// об’єктів, який потім використовуємо для типізації масиву.

// interface User {
//   name: string;
//   age: number;
// }

// const users: User[] = [
//   { name: "Alice", age: 25 },
//   { name: "Jacob", age: 30 }
// ];

// Також можна використовувати Array<T>:

// const users: Array<User> = [
//   { name: "Alice", age: 25 },
//   { name: "Jacob", age: 30 }
// ];

// Якщо спробувати додати в такий масив елемент, який не відповідає заданій структурі, TypeScript видасть помилку:

// users.push({ name: "Charlie" });
// // ❌ Error: Property 'age' is missing in type '{ name: string; }'.

// Це дозволяє бути впевненим, що всі об'єкти в масиві мають вірну структуру.

//////////////////////////////// Власні типи ////////////////////////////////////////////////////////////

// Об'єднання

// Union дозволяє змінній мати один із кількох типів. Це дуже зручно, коли хочемо визначити змінну,
// яка може приймати різні типи даних. Тобто це буквально перелічення можливих типів, які перераховуються
// через вертикальну риску |.

// // Union для ідентифікаторів, які можуть бути рядком або числом
// let userId: string | number = 123; // ✅
// userId = "user-456"; // ✅
// userId = false; // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.

// За допомогою об'єднання можна не тільки вказувати типи, а й задавати набір можливих значень для змінної.

// let currentTheme: "light" | "dark" = "light";
// currentTheme = "dark"; // ✅
// currentTheme = "blue";
// // ❌ Error: Type 'blue' is not assignable to type "light" | "dark".

// let status: "pending" | "shipped" | "delivered" = "pending"; // ✅
// status = "shipped"; // ✅
// status = "cancelled";
// // ❌ Error: Type 'cancelled' is not assignable to type "pending" | "shipped" | "delivered".

// Це корисно, коли значення може мати кілька варіантів, наприклад, вхідні дані у формах або дані з API,
// які можуть бути різних форматів.

// Об'єднання також можна використовувати для типізації властивостей об'єкта:

// interface User {
//   id: number;
//   role: "admin" | "user";
// }

// const poly: User = {
//   id: 1,
//   role: "admin"
// };

// const jacob: User = {
//   id: 2,
//   role: "user"
// };

/////////////////////////////// Власні та літеральні типи

// Для зручності та повторного використання можна створювати власні типи за допомогою type.

// type Id = string | number;

// let productId: Id = "45gkw8"; // ✅
// productId = 856; // ✅
// productId = false; // ❌ Error: Type 'boolean' is not assignable to type 'Id'.

// Літеральні типи дозволяють обмежити можливі значення змінної конкретними значеннями.

// type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

// let status: OrderStatus = "pending"; // ✅
// status = "shipped"; // ✅
// status = "returned"; // ❌ Error: Type '"returned"' is not assignable to type 'OrderStatus'.

// Використання type у таких випадках допомагає зробити код більш зрозумілим, передбачуваним та зручним у підтримці.

///////////////////////////////////// Intersection (&)

// Intersection дозволяє створювати новий тип, який поєднує властивості двох або більше існуючих типів.

// type MyType = FirstType & SecondType;

// Наприклад, іноді потрібно поєднувати базову структуру HTTP-відповіді з конкретними даними.
// Це можна зробити за допомогою Intersection (&).

// // Базова структура HTTP-відповіді
// interface HttpResponse {
//   status: number;
//   message: string;
// }

// // Специфічна відповідь для користувача
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
// }

// // Поєднання базової відповіді з даними користувача
// type UserResponse = HttpResponse & { data: UserData };

// const response: UserResponse = {
//   status: 200,
//   message: "Success",
//   data: {
//     id: 1,
//     name: "Alice",
//     email: "alice@example.com"
//   }
// };

// console.log(response.data.name); // Alice

// У цьому прикладі тип UserResponse містить властивості як HttpResponse, так і UserData.
// Такий підхід дозволяє легко розширювати базові відповіді для різних типів запитів, не дублюючи код.
// Це особливо корисно, коли необхідно об'єднати декілька типів у складніших структурах даних.

// Коли використовувати type, а коли interface?

// Використовуйте interface, якщо описуєте структуру об'єкта.
// Використовуйте type, якщо створюєте об'єднання типів (Union), перетини (Intersection), літеральні значення
// або складні структури даних.

//////////////////////////////// Типізація функцій ////////////////////////////////////////////////////////////

///////////////// Типізація аргументів

// Аргументи функції можна типізувати так само, як і звичайні змінні:

// function greet(name: string, age: number): void {
//   console.log(`Hello, my name is ${name} and I am ${age} years old.`);
// }

// greet("Alice", 30); // ✅
// greet(25, "Alice");
// // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// name: string – означає, що перший параметр name очікує рядок.
// age: number – означає, що другий параметр age очікує число.
// void – вказує, що функція не повертає значення. Тип значення, що повертається, вказується після списку аргументів.

// Тип void у TypeScript використовується для позначення відсутності значення у функціях, що повертається.

// Тип значення, яке повертає функція

// Якщо функція повертає значення, його тип теж можна вказати:

// function sum(a: number, b: number): number {
//   return a + b;
// }

// const result = sum(5, 10); // ✅ result матиме тип number

// Якщо реальний тип значення, яке повертає функція, не збігається з оголошеним, TypeScript видасть помилку:

// function sum(a: number, b: number): number {
//   return "I'm a string"; // ❌ Error: Type 'string' is not assignable to type 'number'
// }

// Вказування типу значення, що повертається – це не тільки зручний спосіб документування функцій, але й
// важливий інструмент контролю коректності вашого коду. Він дозволяє компілятору TypeScript перевірити,
// чи функція дійсно повертає те, що ви припускали, і видати помилку, якщо це не так.

// TypeScript також може автоматично вивести тип значення що повертається, якщо він явно не вказаний:

// function sum(a: number, b: number) {
//   return a + b;
// }

// const result = sum(5, 10); // ✅ TypeScript виведе тип як number

// Розглянемо задачу, де необхідно написати функцію, що отримує список користувачів та повертає імена цих
// користувачів у вигляді масиву рядків. Ось як ми можемо типізувати таку функцію:

// interface User {
//   id: number;
//   name: string;
// }

// const getUserNames = (users: User[]): string[] => {
//   return users.map((user) => user.name);
// };

// const userList: User[] = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' },
// ];

// const names = getUserNames(userList);
// console.log(names); // ['Alice', 'Bob', 'Charlie']

// У цьому прикладі функція getUserNames приймає масив об'єктів типу User та повертає масив рядків.

/////////////////////////// Опціональні параметри

// TypeScript дозволяє робити параметри функції опціональними за допомогою додавання ?.

// function greet(name: string, age?: number) {
//   if (age !== undefined) {
//     console.log(`Hello, my name is ${name} and I am ${age} years old.`);
//   } else {
//     console.log(`Hello, my name is ${name}.`);
//   }
// }

// greet("Alice", 30); // ✅
// greet("Bob"); // ✅
// greet("Jacob", true); // ❌

// Якщо параметр позначений ?, його можна не передавати, але якщо він буде переданий, то має відповідати
// зазначеному типу.

////////////////////////////// Function Type (Тип функції)

// У TypeScript можна визначати не тільки окремі параметри та типи значень, що повертаються, а й описувати
// форму всієї функції за допомогою Function Type.

// Function Type визначає, які аргументи приймає функція та яке значення повертає. Для цього використовують type.

// type AddFunction = (a: number, b: number) => number;

// const add: AddFunction = (x, y) => x + y;

// console.log(add(2, 3)); // 5

// AddFunction – це тип функції, що приймає два числа та повертає число.
// add – функція, яка реалізує цей тип.

// Якщо спробувати присвоїти add функцію з іншою сигнатурою, TypeScript видасть помилку:

// type AddFunction = (a: number, b: number) => number;

// const incorrectAdd: AddFunction = (x: string, y: string) => x + y;
// // ❌ Error: Type '(x: string, y: string) => string' is
// // not assignable to type '(a: number, b: number) => number'.

//////////////////////////////// Заняття 2. Перелічення (enum) ////////////////////////////////////////////////////////////

// Перелічення дозволяє створювати набір іменованих констант. Це корисно, коли потрібно описати перелік
// можливих значень у вигляді констант.

// enum Status {
//   Loading,
//   Success,
//   Error
// }

// let requestStatus: Status = Status.Loading;
// console.log(requestStatus); // 0

// Заведено використовувати великі літери для назв enum, а його значення записувати у PascalCase або UPPER_CASE.
// Це покращує читабельність коду та відповідає загальноприйнятим стандартам.

// TypeScript автоматично присвоює числові значення (0, 1, 2) кожному елементу, починаючи з 0. Також можна
// вказати власні значення:

// enum Status {
//   Loading = 1,
//   Success = 200,
//   Error = 500
// }

// console.log(Status.Success); // 200

/////////////// Рядкові значення

// Якщо потрібно задати конкретні рядкові значення, їх також можна явно вказати:

// enum Role {
//   Admin = "ADMIN",
//   User = "USER",
//   Guest = "GUEST"
// }

// let userRole: Role = Role.Admin;
// console.log(userRole); // "ADMIN"

// Enum чи Union Type?

// Enum – це список іменованих констант, які можна використовувати як змінні.

// Union Type – це просто список допустимих значень, які можна присвоювати змінним.

// У деяких випадках Union Type (|) може бути простішою альтернативою.

// type Status = "loading" | "success" | "error";

// let requestStatus: Status = "loading";
// console.log(requestStatus); // "loading"

// Використовуй enum, якщо:

// Потрібен конкретний набір значень, який можна перераховувати (наприклад, Object.values(Status)).
// Значення можуть мати чіткі асоціації (наприклад, Success = 200, Error = 500).
// Використовується у великому проєкті з інтеграцією у сторонні API або з константними значеннями
// (наприклад, ролі користувачів, статуси замовлення).

// enum Role {
//   Admin = "ADMIN",
//   User = "USER",
//   Guest = "GUEST"
// }

// const getRoleName = (role: Role) => {
//   return `Your role is: ${role}`;
// }

// console.log(getRoleName(Role.Admin)); // "Your role is: ADMIN"

// Використовуй Union Type, якщо:

// Значення ніколи не змінюються і не потребують додаткових властивостей.
// Використовується у простих ситуаціях, де потрібен обмежений набір значень (наприклад, статуси запитів).

// type Status = "loading" | "success" | "error";

// const getStatusMessage = (status: Status) => {
//   return `Current status: ${status}`;
// }

// console.log(getStatusMessage("loading")); // "Current status: loading"

// Якщо не знаєш, що вибрати – завжди починай з union type. Enum варто використовувати лише тоді,
// коли є реальна потреба в цьому.

//////////////////////////////// Узагальнені типи (generics) ////////////////////////////////////////////////////////////

//////////// Generics у функціях

// function myFunction<T>(value: T): T {
//   return value;
// }

// myFunction<string>("Hello"); // "Hello"
// myFunction<number>(42); // 42

// У цій функції T є узагальненим типом. Це означає, що:

// T є певним типом, який буде вказаний при виклику функції.
// Функція приймає аргумент типу value: T і повертає значення того ж типу T.
// Ми можемо передати будь-який тип, і TypeScript автоматично його підставить як T.

// Якщо передати "Hello", TypeScript підставить T = string. Якщо передати 42, T = number.
// TypeScript автоматично визначає тип, але краще й вказати його явно.

// Generics дуже корисні у роботі з колекціями, промісами та багатьма іншими випадками, коли функція має
//  гнучкою за типами даних, але водночас зберігати сувору типізацію.

// Generics корисні для роботи з масивами. Наприклад, напишемо функцію, яка приймає масив та повертає його
// перший елемент.

// function getFirstElement<T>(arr: T[]): T {
//   return arr[0];
// }

// getFirstElement<number>([10, 20, 30]); // 10
// getFirstElement<string>(["Alice", "Bob"]); // "Alice"

// У цьому прикладі функція може працювати з масивами будь-яких типів і завжди повертає елемент того ж типу,
// що й елементи масиву. Тобто тип T буде замінений на number або string залежно від значень, що передаються.

// TypeScript може автоматично виводити тип під час використання узагальнених функцій.

// function getFirstElement<T>(arr: T[]): T {
//   return arr[0];
// }

// getFirstElement([1, 2, 3, 4, 5]);
// // TypeScript виводить як
// // function getFirstElement<number>(arr: number[]): number

// getFirstElement(['a', 'b', 'c', 'd']);
// // TypeScript виводить як
// // function getFirstElement<string>(arr: string[]): string

// Але все ж таки рекомендується задавати тип явно, щоб розробник візуально бачив з яким типом узагальнення
// викликається функція.

////////////////// Generics у структурах даних

// Generics можна використовувати не тільки у функціях, а й в інтерфейсах та об'єктах.

// interface List<T> {
//   items: T[];
//   getItem: (index: number) => T;
// }

// const numberList: List<number> = {
//   items: [1, 2, 3],
//   getItem(index) {
//     return this.items[index];
//   },
// };

// const stringList: List<string> = {
//   items: ['Alice', 'Bob'],
//   getItem(index) {
//     return this.items[index];
//   },
// };

// Тут:

// List<T> – це узагальнений інтерфейс для будь-якого типу T.
// items: T[] – масив елементів типу T.
// getItem(index: number): T – метод, який повертає значення того ж типу T.

// Цей підхід дозволяє створювати багаторазові інтерфейси.

/////////////////////////// Generics у відповідях API

// Generics особливо корисні для типізації відповідей сервера, де дані можуть мати різну структуру.

// interface ApiResponse<T> {
//   data: T;
//   status: number;
// }

// Тут ApiResponse<T> визначає інтерфейс відповіді API, де T – це тип переданих даних для властивості data.

// Тепер можемо використати такий generic для типізації відповідей з різними значеннями властивості data.

// interface ApiResponse<T> {
//   data: T;
//   status: number;
// }

// const userResponse: ApiResponse<{ id: number; name: string; }> = {
//   data: {
//     id: 1,
//     name: 'Alice',
//   },
//   status: 200,
// };

// const invoiceResponse: ApiResponse<{ email: string; amount: number; }> = {
//   data: {
//     email: 'alice@mail.com',
//     amount: 150,
//   },
//   status: 201,
// };

// Завдяки узагальненням ми можемо використовувати один інтерфейс для різних API-відповідей, не дублюючи код.

// Висновок

// Generics роблять код гнучким, але безпечним – він працює з будь-якими типами, але TypeScript гарантує
// правильність даних.
// Можна створювати узагальнені функції, інтерфейси, класи – це допомагає уникати дублювання коду.
// Generics особливо корисні для роботи з масивами, API-відповідями та структурами даних.

// Якщо потрібно писати багаторазовий код, який працює з різними типами – Generics стануть найкращим рішенням.

//////////////////////////////// Типізація промісів ////////////////////////////////////////////////////////////

// При роботі з асинхронними операціями, наприклад такими як HTTP-запити, отримаємо проміси,
// які також потрібно типізувати як Promise<T>, щоб вказати, який тип даних повертається після виконання проміса.

// const getData = (): Promise<string> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("Hello, TypeScript!"), 1000);
//   });
// };

// getData().then((result) => console.log(result)); // "Hello, TypeScript!"

// Тип Promise<T> вказує, що функція поверне результат типу T після завершення асинхронної операції.
// У цьому прикладі Promise<string> означає, що Promise виконається з даними тип яких буде рядок (string).

// Ось приклад типізації проміса, який виконається з об’єктом:

// interface User {
//   id: number;
//   name: string;
// }

// const getUser = (): Promise<User> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000);
//   });
// }

// getUser().then((user) => console.log(user.name)); // "Alice"

// Тут Promise<User> означає, що Promise виконається з об'єктом типу User.

// І, звичайно, якщо потрібно типізувати проміс із масивом:

// const getUsers = (): Promise<User[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve([
//       { id: 1, name: "Alice" },
//       { id: 2, name: "Bob" }
//     ]), 1000);
//   });
// };

// getUsers().then((users) => console.log(users[0].name)); // "Alice"

// Тут Promise < User[] > вказує, що після виконання Promise отримаємо масив користувачів.

//////////////////////////////// Типізація HTTP-запитів ////////////////////////////////////////////////////////////

// У TypeScript при роботі з fetch або axios важливо правильно типізувати отримані дані, тобто проміс і його
// значення.

///////////////////// Типізація fetch

// Якщо GET-запит повертає об’єкт, створюємо відповідний інтерфейс.

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const fetchUser = async (userId: number): Promise<User> => {
//   const response = await fetch(`https://api.example.com/users/${userId}`);
//   const data = await response.json() as User;
//   return data;
// };

// Тут:

// Тип Promise<User> вказує, що асинхронна функція повертає проміс, який після виконання міститиме об'єкт User.
// Оператор as Тип означає, що ми очікуємо відповідь саме цієї структури. TypeScript довіряє, але
// не перевіряє вміст автоматично.

// Коли викликаємо await response.json(), то отримуємо data типу any(будь-який тип). TypeScript не знає,
// яку саме структуру повертає сервер – лише те, що це "щось з JSON". Це вимикає перевірку типів та призведе
// до помилок, які не видно під час розробки. Тому ми вказуємо TypeScript as User, що ми очікуємо об'єкт типу User.

// Якщо відповідь – це масив об’єктів, типізуємо так:

// const fetchUsers = async (): Promise<User[]> => {
//   const response = await fetch("https://api.example.com/users");
//   const data = await response.json() as User[];
//   return data;
// };

// Promise<User[]> – функція повертає масив користувачів.
// as User[] гарантує, що кожен елемент масиву відповідає інтерфейсу User.

//////////////////////////////// Типізація GETзапитів з Axios

// Axios автоматично розбирає JSON, а також підтримує Generics для точного вказання типу даних.

// import axios from "axios";

// const fetchUser = async (userId: number): Promise<User> => {
//   const response = await axios.get<User>(
// 	  `https://api.example.com/users/${userId}`
// 	);
//   return response.data;
// };

// axios.get<User>(...) означає, що відповідь очікується у форматі User і це буде тип для значення
// властивості response.data.

// Якщо запит повертає масив:

// const fetchUsers = async (): Promise<User[]> => {
//   const response = await axios.get<User[]>("https://api.example.com/users");
//   return response.data;
// };

// Підсумок

// Promise<T> використовується для позначення типу результату асинхронної функції.
// Масив типізується як T[], наприклад User[].
// У fetch потрібно вручну вказувати тип через as.
// Axios дозволяє передавати тип напряму через axios.get<T>(), що спрощує типізацію.

////////////////////////////////  ////////////////////////////////////////////////////////////
