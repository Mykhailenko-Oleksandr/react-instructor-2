- Операції CRUD
  1. Postman
  - 1. Читання
  - 2. Метод POST
  - 3. Оновлення
  - 4. Видалення
- Мутації
  1. Інвалідація кешу
- Контрольовані елементи
- Відкладений пошук
  1. Бібліотека use-debounce
- Пошук з React Query
- Власні хуки
  1. Власні хуки для React Query

# Заняття 9. Операції CRUD

Для взаємодії з серверними даними використовується чотири операції:

- Створення (create),
- Читання (read),
- Оновлення (update),
- Видалення (delete).

Для кожної з них визначений стандартний HTTP-метод.

- POST (Create) – створити новий ресурс.
- GET (Read) – отримати колекцію або один ресурс за ідентифікатором.
- PUT і PATCH (Update) – оновити ресурс за ідентифікатором.
- DELETE (Delete) – видалити ресурс за ідентифікатором.

## Postman

Для запитів до бекенда використаємо графічний HTTP-клієнт Postman, завантажте і встановіть собі його безоплатну версію, навіть не обов’язково реєструватись.

Будемо робити HTTP-запити до https://jsonplaceholder.typicode.com/, який надає колекцію завдань у ресурсі:

https://jsonplaceholder.typicode.com/todos

### Читання

HTTP-метод GET використовується для читання існуючих даних. Для отримання всієї колекції завдань вказуємо шлях до колекції.

Ось як буде виглядати код для запиту за допомогою Axios:

axios.get("https://jsonplaceholder.typicode.com/todos")
.then(response => console.log(response.data))
.catch(error => console.log(error))

Для отримання одного завдання додаємо до шляху значення її ідентифікатора:

Ось як буде виглядати код для запиту за допомогою Axios:

const todoId = 1;

axios.get(`https://jsonplaceholder.typicode.com/${todoId}`)
.then(response => console.log(response.data))
.catch(error => console.log(error))

### Метод POST

Метод POST використовується для створення нового елементу колекції.

Ось як буде виглядати код для запиту за допомогою Axios:

const newTodo = {
title: "C stands for Create",
completed: false
};

axios.post("https://jsonplaceholder.typicode.com", newTodo)
.then(response => console.log(response.data))
.catch(error => console.log(error));

У прикладі вище ми:

Робимо POST-запит звертаючись до ресурсу /todos. Таким чином, бекенд знає, що потрібно не прочитати вже існуючий, а створити новий ресурс у цій колекції.
Тіло запиту повинно бути рядком, тому що протокол HTTP передає все як текст. Axios автоматично приводить дані до рядка методом JSON.stringify().
Axios автоматично додає заголовок "Content-Type": "application/json" до POST-запитів який уточнює для бекенда тип переданих даних.

### Оновлення

Методи PUT і PATCH використовуються для оновлення існуючих даних.

За HTTP-стандартом:

метод PATCH замінює в наявному ресурсі значення, які були передані в тілі запиту. Значення, які не передавались, лишаться без змін;
метод PUT повністю замінює ресурс. Значення, які не передавались, видаляються з ресурсу.

Який саме метод використовувати, буде написано в документації бекенда.

Ось як буде виглядати код для запиту за допомогою Axios:

const todoId = 1;
const todoUpdate = {
title: "New todo title"
};

axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, todoUpdate)
.then(response => console.log(response.data))
.catch(error => console.log(error));

### Видалення

Метод DELETE використовується для видалення існуючих даних.

Ось як буде виглядати код для запиту за допомогою Axios:

const todoId = 1;

axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
.then((response) => console.log(response.data))
.catch(error => console.log(error));

# Мутації

Мутації в React Query використовуються для виконання операцій, які змінюють дані на сервері, таких як створення, оновлення або видалення записів. Для цього існує хук useMutation.

import { useMutation } from '@tanstack/react-query';

Хук useMutation приймає об’єкт налаштувань, ось деякі із них які будуть нам корисні:

useMutation({
mutationFn: async (data) => {
// HTTP-request
},
onSuccess: (data) => {
// Mutation success!
},
onError: (error) => {
// An error happened!
}
})

- mutationFn – асинхронна функція, яка виконує запит для зміни даних на сервері, тобто POST, DELETE, PUT або PATCH.
- onSuccess – викликається, коли мутація успішна. Це дозволяє вам виконати додаткові дії після того, як сервер успішно обробить запит.
- onError – викликається, коли мутація завершується помилкою. Це дозволяє вам обробити помилки, наприклад, відобразити повідомлення про помилку.

const mutation = useMutation(options);

На відміну від useQuery, хук useMutation не викликає асинхронну функцію, а повертає об’єкт мутації із наступними властивостями:

- mutate – метод, який викликається для запуску асинхронної функції.
- isPending – статус, який показує, що мутація зараз виконується (наприклад, дані відправляються на сервер).
- isError – встановлюється в true, якщо сталася помилка при виконанні мутації.
- isSuccess – встановлюється в true, якщо мутація була успішною, і дані були оновлені на сервері.

Ці стани допомагають вам відстежувати, на якому етапі виконання знаходиться мутація, і на основі цього відображати відповідну інформацію користувачу.

Ось простий приклад використання мутації для додавання нового завдання:

1. Імпортуємо хук useMutation
   import { useMutation } from '@tanstack/react-query';

export default function App() { 2. Використовуємо хук
const mutation = useMutation({
mutationFn: async (newTodo) => {
const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
return res.data;
},
onSuccess: () => {
console.log("Todo added successfully");
}
});

const handleCreateTodo = () => { 3. Викликаємо mutate для того щоб виконати HTTP-запит
mutation.mutate({
title: "My new todo",
completed: false
})
};

return (
<>
<button onClick={handleCreateTodo}>Create Todo</button>
{mutation.isPending && <div>Adding todo...</div>}
{mutation.isError && <div>An error occurred</div>}
{mutation.isSuccess && <div>Todo added!</div>}
</>
);
}

Якщо подивитись в інструментах розробника, то буде виконуватись HTTP-запит, а в консолі буде повідомлення про успішне додавання. Далі розберемось як саме оновлювати локальний кеш і відображати результат в інтерфейсі.

## Інвалідація кешу

Якби ми запитували та відображали список завдань за допомогою useQuery:

useQuery({
queryKey: ['todos'],
queryFn: async () => {
const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
return res.data;
},
});

Після додавання нового завдання через мутацію, якщо все вдало на сервері, ми не побачимо оновленого списку в інтерфейсі. Причина в тому, що дані були оновлені лише на сервері, але локальний кеш не було оновлено. Тому після успішної мутації важливо оновити дані на клієнті, щоб відобразити зміни.

Для цього нам потрібно інвалідувати кеш для конкретного queryKey, це змусить React Query зробити повторний запит за колекцією даних, тобто виконати відповідний useQuery.

1. Імпортуємо хук useQueryClient
   import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function App() { 2. Отримуємо посилання на квері-клієнт що створювали у main.tsx
const queryClient = useQueryClient();
const mutation = useMutation({
mutationFn: async (newTodo) => {
const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
return res.data;
},
onSuccess: () => { 3. Коли мутація успішно виконується,
// інвалідовуємо всі запити з ключем "todos"
// для оновлення списку завдань
queryClient.invalidateQueries({ queryKey: ['todos'] });
}
});

const handleCreateTodo = () => {
mutation.mutate({
title: "My new todo",
completed: false
})
};

return (
<>
<button onClick={handleCreateTodo}>Create Todo</button>
{mutation.isPending && <div>Adding todo...</div>}
{mutation.isError && <div>An error occurred</div>}
{mutation.isSuccess && <div>Todo added!</div>}
</>
);
}

- onSuccess – викликається після успішної мутації. Це місце, де ми можемо додавати додаткові операції, такі як інвалідація запитів.
- invalidateQueries – ця функція інвалідує запити з певним ключем, змушуючи React Query повторно отримати оновлені дані з сервера.

Після будь-якої зміни на сервері, потрібно інвалідовувати запити, що залежать від змінених даних. Наприклад:

- Якщо ви додаєте нове завдання до списку, вам потрібно інвалідовувати запит для завдань.
- Якщо ви редагуєте елемент, потрібно інвалідовувати запит на отримання цього елемента.
- Якщо ви видаляєте елемент, потрібно інвалідовувати запит для оновлення списку після видалення.

Таким чином, інвалідовування запитів після мутацій допомагає підтримувати актуальність даних на стороні клієнта.

# Заняття 10. Контрольовані елементи

Часто потрібно отримувати поточне значення елемента, наприклад текстового поля або селекта, під час його зміни, наприклад, у полі пошуку, фільтрах тощо. В таких випадках використовуються контрольовані елементи – це елементи форми, значення яких повністю керується станом компонента через React.

Контрольовані елементи = значення в полі ←→ значення в useState

Приклад: ми хочемо, щоб користувач вводив текст у полі, і відразу після цього відображалось введене значення.

Якщо поле не пов'язано зі станом компонента, воно є неконтрольованим. Це означає, що React не має безпосереднього контролю над його значенням. Ось приклад неконтрольованого поля:

import { useState } from "react";

export default function App() {
const [inputValue, setInputValue] = useState("");

return (
<>
<input type="text" />

<p>{inputValue}</p>
</>
);
}

У цьому випадку значення поля не зберігається в стані та не оновлюється на основі useState.

Щоб зробити елемент контрольованим, потрібно:

- Передати значення стану через атрибут value
- Додати обробник події onChange, який буде оновлювати стан

import { useState } from "react";

export default function App() {
const [inputValue, setInputValue] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setInputValue(event.target.value);
};

return (
<>
<input type="text" value={inputValue} onChange={handleChange} />

<p>{inputValue}</p>
</>
);
}

Тепер ми маємо замкнене коло:

- Користувач вводить символ → викликається onChange
- Ми змінюємо стан за допомогою setInputValue(...)
- React оновлює компонент
- value={inputValue} оновлює текст у полі

Якщо ви передали атрибут value, але не додали onChange, в інструментах розробника ви побачите попередження:

React попереджає, що елемент має атрибут value, але значення не оновлюється, тому потрібно додати onChange, щоб забезпечити реакцію на зміни.

# Відкладений пошук

Одна зі стандартних задач в розробці це пошук (фільтрація) по колекції даних. Користувач вводить текст у поле, виконується запит на бекенд, і відображаються відфільтровані дані.

Повна колекція даних зберігається на бекенді, тому сортування і фільтрація відбуваються саме там. Завдання фронтенда – виконати запит, отримати необхідну частину колекції та відобразити її користувачу.

Ось приклад, як може виглядати код, що виконує запит на бекенд кожного разу, коли користувач вводить текст у поле:

import { useState, useEffect } from 'react';

export default function App() {
const [text, setText] = useState('');

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setText(event.target.value);
};

useEffect(() => {
console.log(`Make HTTP request with: ${text}`);
}, [text]);

return (
<>
<input type="text" value={text} onChange={handleChange} />

<p>Text value: {text}</p>
</>
);
}

Якщо ми використовуємо useEffect або useQuery для виконання запиту на кожну зміну тексту, це призведе до великої кількості зайвих запитів на бекенд та частих оновлень компонентів на фронтенді, що може негативно вплинути на продуктивність.

Щоб розв'язати цю проблему, використовуємо відкладене значення. Це означає, що запит буде виконуватись лише після того, як користувач припинить вводити текст на певний час, наприклад, 300 мілісекунд. Такий підхід називається Debounce, і він ґрунтується на патернах роботи з подіями браузера.

Ця ілюстрація демонструє як саме працює підхід Debounce.

Користувач вводить текст, але функція не викликається.
Як тільки введення припиняється на заданий час (наприклад, 300 мс), функція викликається.
Якщо введення тексту відновлюється до того, як пройде цей час, функція не викликається.

## Бібліотека use-debounce

Для реалізації debounce-логіки будемо використовувати популярну бібліотеку use-debounce.

npm i use-debounce

Далі імпортуємо хук useDebouncedCallback(callback, delay) з бібліотеки use-debounce. Він дозволяє створити "відкладену" версію функції — тобто таку, яка не викликається одразу при кожному вводі символа, а лише через певний час після останньої дії.

Це корисно, наприклад, для запитів до API при введенні в інпут — щоб не робити запит на кожну літеру, а лише коли користувач припинив вводити.

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function App() {
const [text, setText] = useState('hello');

const handleChange = useDebouncedCallback(
(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
1000
);

useEffect(() => {
console.log(`Make HTTP request with: ${text}`);
}, [text]);

return (
<>
<input type="text" defaultValue={text} onChange={handleChange} />

<p>Text value: {text}</p>
</>
);
}

- text — стан, у якому зберігається значення інпуту.
- handleChange — обробник, який спрацьовує лише якщо користувач не вводив нових символів протягом 1000 мс. Тобто setText() буде викликано не одразу при onChange, а після паузи.

- defaultValue={text} — ми передаємо початкове значення, але не зв'язуємо повністю поле з React-станом. Це такий собі компроміс: ми хочемо мати контроль над оновленням text, але не хочемо, щоб воно оновлювалося на кожен введений символ.

- useEffect([...]) — спрацьовує лише після оновлення text. Завдяки debounce, таких запитів буде набагато менше — лише після паузи у введенні.

# Пошук з React Query

Використовуємо React Query для створення сторінки пошуку постів через https://dummyjson.com. Спочатку створимо компонент для пошуку і стан, пов'язаний з текстовим полем.

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function App() {
const [searchQuery, setSearchQuery] = useState('');

const updateSearchQuery = useDebouncedCallback(
(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
300
);

return (
<>
<input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
</>
);
}

Далі, створимо функцію для виконання запиту на бекенд, а також інтерфейси для типізації результатів.

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

interface Post {
id: number;
title: string;
body: string;
}

interface FetchPostsResponse {
posts: Post[];
}

export const fetchPosts = async (searchText: string): Promise<Post[]> => {
const res = await axios.get<FetchPostsResponse>(
'https://dummyjson.com/posts/search',
{
params: {
q: searchText,
},
}
);
return res.data.posts;
};

/_ Решта коду файла _/

Тепер додаємо useQuery для виконання запиту, який оновлюється тільки після того, як користувач припинить вводити текст:

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface Post {
id: number;
title: string;
body: string;
}

interface FetchPostsResponse {
posts: Post[];
}

export const fetchPosts = async (searchText: string) => {
const res = await axios.get<FetchPostsResponse>(
'https://dummyjson.com/posts/search',
{
params: {
q: searchText,
},
}
);
return res.data.posts;
};

export default function App() {
const [searchQuery, setSearchQuery] = useState('');

const { data: posts, isFetching } = useQuery({
queryKey: ['posts', searchQuery],
queryFn: () => fetchPosts(searchQuery),
placeholderData: keepPreviousData,
});

const updateSearchQuery = useDebouncedCallback(
(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
300
);

return (
<>
<input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
{isFetching && <div>Loading posts...</div>}
{posts && (

<ul>
{posts.map((post) => (
<li key={post.id}>{post.title}</li>
))}
</ul>
)}
</>
);
}

- queryKey – унікальний ключ для запиту, що складається з назви колекції ('posts') і тексту пошуку (searchQuery). Це дозволяє React Query зберігати кеш для кожного запиту окремо.
- queryFn – функція для отримання даних з бекенду. Вона приймає searchQuery щоб виконувати запит тільки коли користувач зробив паузу.
- placeholderData – забезпечує збереження попередніх результатів, поки не будуть отримані нові дані, щоб інтерфейс не блимав під час зміни результатів пошуку.

# Власні хуки

Ми можемо створювати власні хуки для повторного використання логіки в різних компонентах, що підвищує чистоту та зручність коду. Власний хук дозволяє інкапсулювати певну логіку або частину поведінки компонента, яку можна використовувати в багатьох місцях без дублювання коду.

Хук – це просто функція, ім'я якої обов'язково починається з приставки use. Це дає можливість React відрізняти хук від звичайної функції. Приклад: useState, useEffect, useToggle, useDevice, useImages тощо. Власні хуки зазвичай створюються поза компонентом, інколи навіть в окремих файлах, і можуть викликати інші хуки.

Простий приклад власного хука, який відстежує ширину вікна:

// src/hooks/useWindowWidth.ts

import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

}, []);

return windowWidth;
};

Використовуємо useState для збереження ширини вікна та useEffect для додавання обробника подій resize.
Хук повертає поточну ширину вікна, яку ми відображаємо в компоненті.

Тепер цей хук можна використати в будь-якому компоненті:

import { useWindowWidth } from '../hooks/useWindowWidth';

export default function App() {
const windowWidth = useWindowWidth();

return <p>Current window width: {windowWidth}px</p>;
};

Створення власних хуків потребує досвіду роботи з хуками та React загалом. Не потрібно спеціально прагнути створювати власні хуки у проєкті. Якщо ви бачите можливість повторного використання коду – зробіть свій хук. В іншому випадку краще сконцентруватися на написанні чистого коду та використанні вбудованих React-хуків або готових хуків з бібліотек, таких як react-use.

## Власні хуки для React Query

Тепер створимо власний хук useFetchPosts, в якому буде інкапсульована логіка використання useQuery. Ось як виглядав код додатка для пошуку постів:

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface Post {
id: number;
title: string;
body: string;
}

interface FetchPostsResponse {
posts: Post[];
}

export const fetchPosts = async (searchText: string) => {
const res = await axios.get<FetchPostsResponse>(
'https://dummyjson.com/posts/search',
{
params: { q: searchText },
}
);
return res.data.posts;
};

export default function App() {
const [searchQuery, setSearchQuery] = useState('');

const { data: posts, isFetching } = useQuery({
queryKey: ['posts', searchQuery],
queryFn: () => fetchPosts(searchQuery),
placeholderData: keepPreviousData,
});

const updateSearchQuery = useDebouncedCallback(
(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
300
);

return (
<>
<input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
{isFetching && <div>Loading posts...</div>}
{posts && (

<ul>
{posts.map((post) => (
<li key={post.id}>{post.title}</li>
))}
</ul>
)}
</>
);
}

Виносимо код, пов'язаний з HTTP-запитами та React Query, в окремий хук:

// src/hooks/useFetchPosts.ts

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
id: number;
title: string;
body: string;
}

interface FetchPostsResponse {
posts: Post[];
}

const fetchPosts = async (searchText: string): Promise<Post[]> => {
const res = await axios.get<FetchPostsResponse>(
'https://dummyjson.com/posts/search',
{
params: { q: searchText }
}
);
return res.data.posts;
};

export const useFetchPosts = (query: string) => {
return useQuery({
queryKey: ['posts', query],
queryFn: () => fetchPosts(query),
keepPreviousData: true,
});
};

useFetchPosts – це власний хук, який приймає query як аргумент.

Хук повертає результат useQuery, що містить data, isFetching та інші властивості.

Функція для запиту (queryFn) – це fetchPosts, що отримує пости за запитом.

Тепер можна використовувати цей хук useFetchPosts у компоненті:

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// 1. Імпортуємо хук
import { useFetchPosts } from '../hooks/useFetchPosts';

export default function App() {
const [searchQuery, setSearchQuery] = useState('');

    // 2. Використовуємо хук

const { data: posts, isFetching } = useFetchPosts(searchQuery);

const updateSearchQuery = useDebouncedCallback(
(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
300
);

return (
<>
<input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
{isFetching && <div>Loading posts...</div>}
{posts && (

<ul>
{posts.map((post) => (
<li key={post.id}>{post.title}</li>
))}
</ul>
)}
</>
);
}

Компонент App просто викликає useFetchPosts і зосереджений лише на відображенні даних. Логіка для отримання постів абстрагована в окремий хук, що робить компонент чистішим.

Такий підхід дозволяє створювати компоненти, які фокусуються на відображенні даних, а всю логіку витягання, обробки та зберігання даних можна абстрагувати в окремі хуки.
