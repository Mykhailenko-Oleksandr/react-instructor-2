/**
 * - Прості типи: any, number, string, boolean, null, undefined
 * - Виведення типів (type inference)
 */

// let zminna: any = 5;
// const ryadok: string = "Andrii";

// let zminna2: boolean = true;
// let zminna3: null = null;
// let zminna4: undefined = undefined;

// zminna = "";

// zminna = 444;

// console.log(zminna, ryadok, zminna2, zminna3, zminna4);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Типізація об'єктів
 * - Використання interface
 * - Опціональні (?) та readonly поля
 */

// type Person = {
//   username?: string;
//   email?: string;
//   isOnline?: boolean;
//   readonly age?: number;
//   location?: {
//     country?: string;
//     city?: string;
//   };
// };

// interface PersonI {
//   username?: string;
//   email?: string;
//   isOnline?: boolean;
//   readonly age?: number;
//   location?: {
//     country?: string;
//     city?: string;
//   };
// }

// interface Person {
//     username?: string;
//     email?: string;
//     isOnline?: boolean;
//     readonly age?: number;
//     location?: {
//       country?: string;
//       city?: string;
//     };
//   }

//   const jacob: Person = {
//     username: "Jacob",
//     email: "j.mercer@mail.com",
//     isOnline: false,
//     age: 30,
//     location: {
//       city: "Limassol",
//       country: "Cyprus",
//     },
//   };

//   const poly: Person = {
//     username: "Poly",
//     email: "p.makko@mail.com",
//     isOnline: true,
//     age: 20,
//   };

//   const andrii: Person = {};

//   console.log(jacob);

//   console.log(poly);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Типізація масивів: тип[] та Array<тип>
 * - Підказки методів та властивостей
 * - Типізація масиву об'єктів
 */

/***************** 1 *****************/
// const planets: Array<string> = [
// const planets = [
//   "Mercury",
//   "Venus",
//   "Earth",
//   "Mars",
//   "Jupiter",
//   "Saturn",
//   "Uranus",
//   "Neptune",
// ];

// console.log(planets[0].length);

/***************** 2 *****************/
// interface Order {
//   email: string;
//   total: number;
// }

// type Order = {
//     email: string;
//     total: number;
//   };

//   // const orders: Array<Order> = [
//   const orders: Order[] = [
//     { email: "j.mercer@mail.com", total: 120 },
//     { email: "emily.watts@mail.com", total: 85 },
//     { email: "liam.smith@mail.com", total: 200 },
//     { email: "sophia.jones@mail.com", total: 150 },
//     { email: "noah.brown@mail.com", total: 95 },
//   ];

//   console.log(orders);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Union
 * - Літеральні типи ( )
 */

/***************** 1 *****************/
// "pending", "shipped", "delivered", "canceled"
// type Status = "pending" | "shipped" | "delivered" | "canceled";

// let status: Status = "pending";

// status = "shipped";

// console.log(status);

/***************** 2 *****************/
// delivery: "drone", "courier", "pickup"
// deliveryTime: "morning", "afternoon", "evening"

// type Delivery = "courier" | "drone" | "pickup";
// type DeliveryTime = "morning" | "afternoon" | "evening";

// interface Order {
//   username: string;
//   email: string;
//   total: number;
//   delivery: Delivery;
//   deliveryTime: DeliveryTime;
// }

// const order: Order = {
//   username: "Jacob",
//   email: "j.mercer@mail.com",
//   total: 120,
//   delivery: "pickup",
//   deliveryTime: "morning",
// };

// console.log(order);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Типізація функцій
 * - Типізація аргументів
 * - Тип значення, яке повертає функція
 * - Опціональні параметри
 * - Типізація методів
 */

/***************** 1 *****************/
// interface User {
//   username: string;
//   age: number;
// }

// const allUsers: User[] = [
//   { username: "poly", age: 20 },
//   { username: "jacob", age: 30 },
//   { username: "mango", age: 25 },
// ];

// function getUserNames(users: User[]): string[] {
//   return users.map((user) => user.username);
// }

// const names = getUserNames(allUsers);

// console.log(names);

/***************** 2 *****************/
// function greet(username: string, age?: number): void {
//   if (age !== undefined) {
//     console.log(`${username}, ${age}`);

//     return;
//   }

//   console.log(username);
// }

// function greet(username: string, age?: number) {
//   console.log(age === undefined ? username : `${username}, ${age}`);
// }

// greet("poly", 15);

// greet("jacob");

/***************** 3 *****************/
// interface User {
//   username: string;
//   greet: (message: string) => string;
// }

// const jacob: User = {
//   username: "Jacob",
//   greet: (message) => {
//     return message;
//   },
// };

// jacob.greet("Welcome!");

/***************** 4 *****************/
// interface Player {
//   username: string;
//   isOnline: boolean;
// }

// const allPlayers: Player[] = [
//   { username: "poly", isOnline: false },
//   { username: "jacob", isOnline: true },
//   { username: "adrian", isOnline: false },
// ];

// interface GamePlatform {
//   getOnlinePlayers: (players: Player[]) => Player[];
//   getPlayerNames: (players: Player[]) => string[];
// }

// const platform: GamePlatform = {
//   getOnlinePlayers: (players) => {
//     return players.filter((player) => player.isOnline);
//   },
//   getPlayerNames: (players) => {
//     return players.map((player) => player.username);
//   },
// };

// platform.getOnlinePlayers(allPlayers);
// platform.getPlayerNames(allPlayers);

// type ArrowFunc = (name: string) => void;

// const arrowFunc: ArrowFunc = (name) => {
//   console.log(name);
// };

// const arrowFunc = (name: string): void => {
//   console.log(name);
// };

// arrowFunc("Andrii");

// type Person = { name: string; age?: number };

// const arrowFunc = ({ name, age }: Person): void => {
//   console.log(name, age);
// };

// arrowFunc({ name: "Andrii", age: 50 });
