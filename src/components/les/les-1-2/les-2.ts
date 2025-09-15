/**
 * Перелічення (enum)
 *
 * Enum - це список іменованих констант, які можна використовувати як змінні.
 * Union Type - це просто список допустимих значень, які можна присвоювати змінним.
 *
 * Якщо не знаєш, що вибрати - завжди починай з union type.
 * Enum варто використовувати лише тоді, коли є реальна потреба в цьому.
 */

/***************** 1 *****************/
// type Status = "pending" | "fulfilled" | "rejected";

// enum Status {
//   Pending = "pending",
//   Fulfilled = "fulfilled",
//   Rejected = "canceled",
// }

// enum Status {
//   Pending,
//   Fulfilled,
//   Rejected,
// }

// let requestStatus: Status = "fulfilled"; - Union type
// let requestStatus: Status = Status.Rejected;

// console.log(requestStatus === Status.Rejected);

/***************** 2 *****************/
// type Code = 200 | 201 | 400 | 500;

// enum ReqCode {
//   Success,
//   Created,
//   NotFound = 617,
//   ServerError,
// }

// let requestCode: ReqCode = ReqCode.NotFound;

// console.log(requestCode);

/***************** 3 *****************/
// enum Role {
//   Admin = "admin",
//   User = "user",
//   Guest = "guest",
// }

// let userRole: Role = Role.Admin;

// interface User {
//   username: string;
//   role: Role;
// }

// const user: User = {
//   username: "jacob",
//   role: userRole,
// };

// if (user.role === Role.Admin) {
//   console.log(`perevirka proyshla`);
// }

// console.log(Role);

/////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Узагальнені типи (generics)
 */

/***************** 1 *****************/
// function foo<T>(value: T): void {
//   console.log(value);
// }

// foo(5);
// foo("hello");
// foo(false);
// foo([1, "hello"]);
// foo<number[]>([1, 2]);

// interface User {
//   username: string;
//   age: number;
// }

// foo<User>({ username: "mango", age: 5 });

/***************** 2 *****************/
// function getFirstElement<T>(arr: T[]): T | undefined {
//   return arr[0];
// }

// console.log(getFirstElement([10, 20, 30])); // 10
// getFirstElement(["Alice", "Bob"]); // "Alice"

/***************** 3 *****************/
// function shuffle<T>(array: T[]): T[] {
//   return array.slice().sort(() => Math.random() - 0.5);
// }

// const mixedNums = shuffle([1, 2, 3, 4]);
// const mixedWords = shuffle(["apple", "banana", "cherry"]);

// console.log({ mixedNums, mixedWords });

/***************** 4 *****************/
// function saveToStorage<T>(key: string, value: T) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// saveToStorage("user", "Jacob Peterson");
// saveToStorage("clicks", 8);
// saveToStorage("clicks-2", { dsadsa: 5 });

// function loadFromStorage(key: string) {
//   const item = localStorage.getItem(key);
//   if (item !== null) {
//     return JSON.parse(item);
//   }
//   return null;
// }

// const user = loadFromStorage("user");
// const clicks = loadFromStorage("clicks");

/***************** 5 *****************/
// function max<T>(array: T[], selector: (element: T) => T[keyof T]) {
//   return array.reduce((prev, curr) =>
//     selector(curr) > selector(prev) ? curr : prev
//   );
// }

// interface Product {
//   name: string;
//   price: number;
// }

// const products: Product[] = [
//   { name: "Laptop", price: 1000 },
//   { name: "Phone", price: 800 },
// ];

// const mostExpensive = max(products, (p) => p.price);
// → { name: "Laptop", price: 1000 }

// console.log(mostExpensive);

// interface User {
//   id: number;
//   name: string;
// }

// const getUser = (): Promise<User> => {
//   return new Promise<User>((resolve) => {
//     setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000);
//   });
// };

// getUser().then((user) => console.log(user.name));

/////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Типізація промісів
 */

// function Promise2<T>(resolve: (value: T) => {}) {}

/***************** 1 *****************/
// const getData = () => {
//   return new Promise<string>((resolve) => {
//     setTimeout(() => resolve("Hello, TypeScript!"), 1000);
//   });
// };

// type CustomArray<T, X> = (T | X)[];

// const customArray: CustomArray<number, string> = [1, 2, 3];

// getData().then((result) => console.log(result)); // "Hello, TypeScript!"

/***************** 2 *****************/
// interface User {
//   id: number;
//   name: string;
// }

// const getUser = () => {
//   return new Promise<User>((resolve) => {
//     setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000);
//   });
// };

// getUser().then((user) => console.log(user.name)); // "Alice"

// const getUsers = () => {
//   return new Promise<User[]>((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { id: 1, name: "Alice" },
//         { id: 2, name: "Bob" },
//       ]);
//     }, 1000);
//   });
// };

// getUsers().then((users) => console.log(users[0].name)); // "Alice"

// type Nullable<T> = T | null | undefined;

// interface Person {
//   country: Nullable<{
//     title: string;
//     capital: string;
//   }>;
//   house: Nullable<{
//     street: string;
//     houseNumber: number;
//   }>;
// }

// const person: Person = {
//   country: null,
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Типізація HTTP-запитів з Axios
 *
 * https://dummyjson.com/docs/posts
 */

// import axios from "axios";

// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   tags: string[];
//   reactions: {
//     likes: number;
//     dislikes: number;
//   };
//   views: number;
//   userId: number;
// }

// interface GetPostsResponse {
//   posts: Post[];
//   total: number;
//   skip: number;
//   limit: number;
// }

// const getAllPosts = async () => {
//   const response = await axios.get<GetPostsResponse>(
//     "https://dummyjson.com/posts"
//   );
//   return response.data;
// };

// const getPostById = async (postId: number | string) => {
//   const response = await axios.get<Post>(
//     `https://dummyjson.com/posts/${postId}`
//   );
//   return response.data;
// };

// const createPost = async (newPost: Post) => {
//   const response = await axios.post<Post, { data: Post }>(
//     "https://dummyjson.com/posts/add",
//     newPost
//   );
//   return response.data;
// };

// console.log(
//   createPost({
//     id: 1,
//     title: "Ttile",
//     body: "string",
//     tags: [],
//     reactions: {
//       likes: 618,
//       dislikes: 0,
//     },
//     views: 618,
//     userId: 1,
//   })
// );
