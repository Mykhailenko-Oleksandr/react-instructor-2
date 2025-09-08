- Бібліотека React Query
  1. Налаштування QueryClient
  2. Налаштування DevTools
- Хук useQuery
- Ключі запиту
- Залежні запити
- Пагінація запитів
- Бібліотека React Paginate
- Бібліотека Formik
  1. Елементи форми
  2. Компонент Formik
  3. Компонент Form
  4. Компонент Field
  5. Розмітка форми
  6. Стилізація
  7. Початкові значення полів
  8. Типізація початкових значень
  9. Відправка форми
  10. Типи полів
  - 1.  Селект
  - 2.  Радіокнопки
  - 3.  Чекбокси
  - 4.  Елемент textarea
- Валідація з Yup
  1. Як працює схема Yup
  2. Відображення помилок

# Бібліотека React Query

Інсталяція React Query

Щоб почати використовувати React Query, спершу потрібно додати її в залежності. Для цього виконайте наступну команду в терміналі:

npm install @tanstack/react-query

## Налаштування QueryClient

Перед тим як використовувати React Query, потрібно налаштувати QueryClient. Це об’єкт, який містить конфігурацію й управління запитами та кешуванням даних. Імпортуйте його з бібліотеки та створіть новий QueryClient у файлі main.tsx:

// src/main.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

Після цього потрібно обгорнути додаток в QueryClientProvider, передавши в нього створений клієнт. Це дасть змогу використовувати React Query в усіх компонентах додатка.

// main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<QueryClientProvider client={queryClient}>
<App />
</QueryClientProvider>
);

QueryClientProvider надає всі можливості React Query для компонентів всередині нього, дозволяючи працювати з асинхронними запитами, кешем і відслідковувати їхній стан.

## Налаштування DevTools

React Query Devtools – це потужний інструмент для моніторингу і налагодження запитів та кешування в реальному часі. Він дозволяє переглядати запити, їхні стани, дані, помилки та багато іншого прямо в браузері.

Щоб додати DevTools, спершу потрібно його встановити:

npm install @tanstack/react-query-devtools

Після цього імпортуємо і налаштовуємо ReactQueryDevtools:

// main.tsx

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<QueryClientProvider client={queryClient}>
<App />
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
);

ReactQueryDevtools дозволяє вам взаємодіяти з усіма запитами та відслідковувати їхнє виконання в браузері. Ви можете активувати DevTools, натиснувши на іконку, що з'являється в правому нижньому кутку.

# Хук useQuery

При роботі з асинхронними запитами в React зазвичай використовують хук useEffect для виконання запиту на сервер при монтуванні компонента або при зміні залежностей. Однак React Query пропонує значно зручніший спосіб завдяки хуку useQuery, який виконує асинхронні запити та автоматично керує станами завантаження, помилок та збереженням даних, значно спрощуючи роботу з API.

const myQuery = useQuery({
queryKey: ['myQueryKey'], // ключ запиту
queryFn: myQueryFunction // функція запиту
});

- queryKey – унікальний ключ запиту, який використовується для кешування та оновлення даних. Це може бути простий рядок, масив або об'єкт, який унікально ідентифікує запит.
- queryFn – асинхронна функція, що виконує запит до API або іншого джерела даних. Ця функція повинна повертати проміс із даними. Вона автоматично викликається для запиту.

Хук useQuery повертає об’єкт з корисною інформацією про запит:

const { data, error, isLoading, isError, isSuccess } = useQuery({
queryKey: ['myQueryKey'],
queryFn: myQueryFunction  
});

- data – дані, які були успішно отримані в результаті запиту.
- error – якщо запит завершився помилкою, ця властивість містить інформацію про помилку.
- isLoading – якщо запит ще виконується, значення буде true.
- isError – якщо запит не вдалося виконати (наприклад, через мережеві помилки), значення буде true.
- isSuccess – якщо запит успішно виконався і дані отримано, значення буде true.

Хук useQuery призначений тільки для виконання GET-запитів, тобто отримання даних з API, але не використовується для створення, оновлення чи видалення ресурсів. Для інших типів запитів ми будемо використовувати хук useMutation.

Приклад використання useQuery для виконання запиту при монтуванні компонента:

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPerson = async () => {
const response = await axios.get(`https://swapi.info/api/people/1`);
return response.data;
};

export default function App() {
const { data, error, isLoading, isError } = useQuery({
queryKey: ['person'],  
 queryFn: fetchPerson,  
 });

return (
<>
{isLoading && <p>Loading...</p>}
{isError && <p>An error occurred: {error.message}</p>}
{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
</>
);
}

- queryKey: ['person'] – унікальний ключ для запиту. Це масив, що дозволяє React Query ідентифікувати цей запит серед інших. Використання масиву дозволяє додавати до ключа додаткові параметри, якщо це потрібно.
- queryFn: fetchPerson – функція запиту, яка викликається для отримання даних. React Query виконає цю функцію автоматично, коли компонент буде монтуватися або коли буде необхідно оновити запит.
- isLoading, isError – ці стани дозволяють відстежувати, чи є проблема з отриманням даних, чи вони ще завантажуються.

# Ключі запиту

В основі React Query лежить управління кешуванням запитів, яке здійснюється на основі ключів запитів. Якщо ключ запиту змінюється, React Query розуміє, що це новий запит, і виконує його знову. Це дуже корисно, коли ви хочете, щоб запит повторювався, наприклад, при зміні значення в інтерфейсі.

Зміна ключа запиту зазвичай використовується, коли потрібно виконати новий запит після зміни стану або пропсів у компоненті.

Розглянемо приклад, коли ви хочете отримати нові дані при зміні значення лічильника. Наприклад, при кожному кліку на кнопку лічильник збільшується, і ви робите запит на сервер для отримання нового персонажа з API (Star Wars API).

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPerson = async (id: number) => {
const response = await axios.get(`https://swapi.info/api/people/${id}`);
return response.data;
};

export default function App() {
const [count, setCount] = useState(1);

const { data, error, isLoading, isError } = useQuery({
queryKey: ['person', count], // змінюємо ключ запиту залежно від count
queryFn: () => fetchPerson(count),
});

return (
<>
<button onClick={() => setCount(count + 1)}>Get next character</button>
{isLoading && <p>Loading...</p>}
{isError && <p>Error: {error?.message}</p>}
{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
</>
);
}

- queryKey: ['person', count] – унікальний ключ для запиту, який містить масив. Важливо, що ми додаємо змінну count до цього ключа. Коли count змінюється, React Query буде вважати це новим запитом і автоматично виконає його знову.
- queryFn: () => fetchPerson(count) – функція запиту, яка приймає count як параметр. Це дозволяє кожного разу запитувати нові дані для персонажа залежно від значення лічильника.

🧠 Кожного разу, коли змінюється count, зміна ключа запиту гарантує, що запит буде повторно виконаний з новими даними. Цей запит виконується при монтуванні компонента і після кожного оновлення стану count.

# Залежні запити

Залежні запити (Dependent Queries) – це запити, які залежать від результату інших запитів або стану компонента. В React Query ви можете використовувати властивість enabled для відкладеного виконання useQuery.

Якщо хук useQuery не містить властивості enabled, запит виконується автоматично при монтуванні компонента. Ви можете використовувати enabled, щоб умовно активувати запит залежно від певних значень або подій. Наприклад, запит на отримання даних не буде виконуватись до того, як користувач введе дані в форму чи вибере параметри в інтерфейсі.

const myQuery = useQuery({
queryKey: ['myKey'],
queryFn: myQueryFn,
enabled: false
});

- enabled: true – запит виконується одразу або після зміни залежностей.
- enabled: false – запит не виконується, навіть якщо компоненти монтуються чи залежності змінюються.

Уявіть, що у вас є форма, де користувач вводить ключ для пошуку. Запит на сервер має виконуватись тільки після того, як користувач натисне кнопку для підтвердження введених даних. Для цього ми можемо використати enabled.

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCharacter = async (id: string) => {
const response = await axios.get(`https://swapi.info/api/people/${id}`);
return response.data;
};

export default function App() {
const [characterId, setCharacterId] = useState('');

const { data, isLoading, isError, error } = useQuery({
queryKey: ['character', characterId],
queryFn: () => fetchCharacter(characterId),
enabled: characterId !== '',
});

const handleSearch = (formData: FormData) => {
const id = formData.get('id') as string;
setCharacterId(id);
};

return (
<>

<form action={handleSearch}>
<input type="text" name="id" placeholder="Enter character ID" />
<button type="submit">Search</button>
</form>
{isLoading && <p>Loading data, please wait...</p>}
{isError && <p>Whoops, something went wrong! {error?.message}</p>}
{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
</>
);
}

Завдяки enabled: characterId !== "" – запит буде виконуватись тільки тоді, коли в поле пошуку введено значення. Якщо characterId порожнє, запит не буде виконуватись.

🧠 Властивість enabled корисна для відкладених GET-запитів, коли запит має виконуватись лише після того, як зміниться стан або користувач виконає певну дію (наприклад, введе дані в форму або вибере опцію).

# Пагінація запитів

Пагінація – це техніка розбиття великого об'єму даних на малі частини (сторінки) для зменшення навантаження на сервер. З React Query пагінація стає значно простішою, оскільки бібліотека автоматично обробляє кешування та повторні запити.

Ось приклад реалізації пагінації для пошуку статей. Задача – зберігати номер поточної сторінки та змінювати його, наприклад, при натисканні кнопки. Далі ми пройдемось основними моментами та детально розберемо всі нюанси на лекціях.

Основні моменти

Спочатку створюємо стан для зберігання номера сторінки:

const [currentPage, setCurrentPage] = useState(1);

Для кожної сторінки потрібно використовувати унікальний ключ (queryKey), щоб React Query правильно кешував та оновлював дані:

const queryData = useQuery({
queryKey: ["articles", topic, currentPage],
});

Використання різних ключів для кожної сторінки дозволяє правильно кешувати дані і уникнути дублювання запитів.

Функція запиту має приймати номер сторінки і використовувати його для отримання відповідних даних:

const queryData = useQuery({
queryKey: ["articles", topic, currentPage],
queryFn: () => fetchArticles(topic, currentPage),
});

Використовуємо властивість enabled, щоб запит виконувався тільки після того, як користувач введе значення для пошуку:

const queryData = useQuery({
queryKey: ["articles", topic, currentPage],
queryFn: () => fetchArticles(topic, currentPage),
enabled: topic !== "",
});

Щоб між запитами не було "блимань" екрану, додаємо властивість placeholderData, яка дозволяє на час завантаження нових даних показувати попередні або тимчасові дані. Також використовуємо keepPreviousData (імпорт з React Query) для збереження попереднього запиту, поки не прийдуть нові дані:

const queryData = useQuery({
queryKey: ["articles", topic, currentPage],
queryFn: () => fetchArticles(topic, currentPage),
enabled: topic !== "",
placeholderData: keepPreviousData,
});

# Бібліотека React Paginate

Для створення зручного користувачу інтерфейсу пагінації використаємо бібліотеку React Pagiante яка надає готовий компонент із необхідною логікою.

Додаємо бібліотеку:

npm i react-paginate

Імпортуємо компонент:

import ReactPaginate from 'react-paginate';

💡 Подивіться приклад у редакторі – він демонструє, як усе працює разом

Ось пояснення пропсів для компонента ReactPaginate:

<ReactPaginate
pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setCurrentPage(selected + 1)}
forcePage={currentPage - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
/>

1. pageCount:

Вказує загальну кількість сторінок. Це потрібно для того, щоб компонент знав, скільки сторінок потрібно відобразити.
В нашому випадку це має бути кількість сторінок, яку ви отримуєте від сервера або підраховуєте на основі загальної кількості елементів та кількості елементів на сторінці.

2. pageRangeDisplayed:

Визначає, скільки сторінок відображатиметься у навігаційній панелі пагінації. Наприклад, якщо встановити pageRangeDisplayed={5}, компонент відобразить 5 сторінок навігації одночасно.

3. marginPagesDisplayed:

Вказує кількість сторінок, які будуть відображатися на початку і в кінці пагінації. Наприклад, якщо ви встановите marginPagesDisplayed={1}, це означає, що будуть показані перша і остання сторінки, незалежно від того, яка поточна сторінка.

4. onPageChange:

Це колбек, який викликається при зміні сторінки. Він отримує об'єкт, в якому є значення selected – індекс вибраної сторінки (починаючи з 0). Ви використовуєте це значення для оновлення стану, наприклад, щоб змінити поточну сторінку.
В цьому прикладі onPageChange={({ selected }) => setCurrentPage(selected + 1)} означає, що кожного разу, коли сторінка змінюється, викликається функція, яка оновлює currentPage (пам'ятаємо, що selected починається з 0, а сторінки у додатку можуть починатися з 1).

5. forcePage:

Цей пропс дозволяє вручну контролювати поточну сторінку. Якщо ви хочете, щоб пагінація відображала певну сторінку незалежно від того, скільки разів користувач клікав на кнопки переходу, треба передати цей пропс.

6. containerClassName:

Визначає клас для контейнера пагінації. Це дозволяє стилізувати пагінацію за допомогою CSS. У даному прикладі це css.pagination, що буде застосовувати стилі, визначені в файлі CSS.

7. activeClassName:

Визначає клас для активної сторінки. Тобто, коли користувач знаходиться на певній сторінці, цей клас буде застосований до її кнопки. Це дозволяє стилізувати активну сторінку. Наприклад, css.active може бути стилем для виділення поточної сторінки.

8. nextLabel:

Визначає текст або символ, який буде відображатися на кнопці "Наступна сторінка". У цьому випадку "→".

9. previousLabel:

Визначає текст або символ для кнопки "Попередня сторінка". У цьому випадку "←".
Пагінація – це техніка розбиття великого об'єму даних на малі частини (сторінки) для зменшення навантаження на сервер. З React Query пагінація стає значно простішою, оскільки бібліотека автоматично обробляє кешування та повторні запити.

# Бібліотека Formik

"Створюйте форми в React без сліз" – саме так себе позиціонує Formik, одна з найпопулярніших бібліотек для роботи з формами у React та React Native.

Створення форм у React зазвичай пов’язане з рутинним кодом:

Обробка даних кожного поля
Додавання обробників подій
Ручна валідація
Виведення помилок

Formik автоматизує всю рутину: відстеження значень, помилок, статусу полів, валідації та відправки форми. Це дозволяє вам зосередитись на логіці, а не на технічних дрібницях.

Щоб додати бібліотеку до проєкту:

npm install formik

Код бібліотеки написан на TypeScript тому не потрібно встановлювати додаткові типи, вони вже вбудовані у саму бібліотеку.

## Елементи форми

Formik надає набір готових компонентів, які полегшують створення форм у React. Він бере на себе управління станом полів, валідацію, обробку сабміту тощо.

## Компонент Formik

Починаємо побудову форми з компонента-контейнера Formik, який керує всією логікою форми.

import { Formik } from "formik";

export default function OrderForm() {
return (
<Formik initialValues={{}} onSubmit={() => {}}>
{/_ Далі йдуть елементи форми _/}
</Formik>
);
}

Обов’язкові пропси:

initialValues – об’єкт початкових значень полів.
onSubmit – функція, яка викликається при сабміті форми.

Будемо заповнювати значення цих пропсів поступово з додаванням елементів форми.

## Компонент Form

Formik надає компонент Form, який рендериться у HTML як <form> і автоматично підключає обробник сабміту.

import { Formik, Form } from "formik";

export default function OrderForm() {
return (
<Formik initialValues={{}} onSubmit={() => {}}>

<Form>
{/_ Поля _/}
<button type="submit">Place order</button>
</Form>
</Formik>
);
}

## Компонент Field

Компонент Field – це обгортка над input, textarea або select. Він автоматично слідкує за значенням поля та відстежує дії користувача. Кожному полю обов'язково потрібно вказати type та name.

import { Formik, Form, Field } from "formik";

export default function OrderForm() {
return (
<Formik initialValues={{}} onSubmit={() => {}}>

<Form>
<Field type="text" name="username" />
<Field type="email" name="email" />
<button type="submit">Place order</button>
</Form>
</Formik>
);
}

Обов’язково вказуйте name, інакше Formik не зможе відстежити це поле. Компонент Field пов'язує поля форми і внутрішню логіку бібліотеки, яка зберігається в компоненті Formik.

## Розмітка форми

Formik не має компонентів label, fieldset, legend, тож використовуємо звичайні HTML-теги. Щоб пов’язати label із полем – додаємо атрибут htmlFor та id. Для цього зручно використати useId.

import { useId } from "react";
import { Formik, Form, Field } from "formik";

export default function OrderForm() {
const fieldId = useId();

return (
<Formik initialValues={{}} onSubmit={() => {}}>

<Form>
<fieldset>
<legend>Client Info</legend>

          <label htmlFor={`${fieldId}-username`}>Name</label>
          <Field type="text" name="username" id={`${fieldId}-username`} />

          <label htmlFor={`${fieldId}-email`}>Email</label>
          <Field type="email" name="email" id={`${fieldId}-email`} />
        </fieldset>

        <button type="submit">Place order</button>
      </Form>
    </Formik>

);
}

## Стилізація

Formik-компоненти, які рендерять HTML-елементи (Form, Field) – можна стилізувати напряму через className. Formik як компонент – не рендерить жодного HTML-елемента, тому стилізація його не стосується.

import { useId } from "react";
import { Formik, Form, Field } from "formik";
import css from "./OrderForm.module.css";

export default function OrderForm() {
const fieldId = useId();

return (
<Formik initialValues={{}} onSubmit={() => {}}>

<Form className={css.form}>
<fieldset className={css.fieldset}>
<legend className={css.legend}>Client Info</legend>

          <label className={css.label} htmlFor={`${fieldId}-username`}>Name</label>
          <Field className={css.field} type="text" name="username" id={`${fieldId}-username`} />

          <label className={css.label} htmlFor={`${fieldId}-email`}>Email</label>
          <Field className={css.field} type="email" name="email" id={`${fieldId}-email`} />
        </fieldset>

        <button className={css.btn} type="submit">Place order</button>
      </Form>
    </Formik>

);
}

## Початкові значення полів

Formik автоматично керує значеннями полів, зберігаючи їх у своєму внутрішньому стані – достатньо правильно передати initialValues.

Значення пропса initialValues – це об'єкт, у якому кожен ключ – це назва поля (name), а кожне значення – початкове значення цього поля. Ключі в initialValues мають точно відповідати значенням атрибутів name у відповідних Field.

import { Formik, Form, Field } from "formik";

export default function OrderForm() {
return (
<Formik
initialValues={{
        username: "",
        email: ""
      }}
onSubmit={() => {}} >

<Form>
<Field type="text" name="username" />
<Field type="email" name="email" />
<button type="submit">Place order</button>
</Form>
</Formik>
);
}

Спробуйте змінити значення initialValues та перезавантажити сторінку – побачите, що поля автоматично заповняться новими значеннями.

## Типізація початкових значень

Щоб уникнути помилок і отримати підказки в редакторі, важливо типізувати початкові значення форми.

Спочатку створюємо інтерфейс, який описує об’єкт початкових значень:

interface OrderFormValues {
username: string;
email: string;
}

Виносимо об’єкт початкових значень у зовнішню змінну і типізуємо.

import { Formik, Form, Field } from "formik";

interface OrderFormValues {
username: string;
email: string;
}

const initialValues: OrderFormValues = {
username: "",
email: "",
};

export default function OrderForm() {
return (
<Formik initialValues={initialValues} onSubmit={() => {}}>

<Form>
<Field type="text" name="username" />
<Field type="email" name="email" />
<button type="submit">Place order</button>
</Form>
</Formik>
);
}

🧠 Formik сам "виведе" тип OrderFormValues з initialValues, тому додатковий generic не потрібен. Але якщо ви хочете, можете вказати тип явно – для кращої читабельності.

## Відправка форми

Formik самостійно обробляє відправку форми та збирає значення полів. При відправці форми викликається колбек-функція, яку ми передаємо пропсом onSubmit до компонента Formik. Найкраща практика – створити окрему іменовану функцію handleSubmit і передати її як значення пропса.

// Імпортуємо вбудований тип FormikHelpers
import { Formik, Form, Field, FormikHelpers } from "formik";

interface OrderFormValues {
username: string;
email: string;
}

const initialValues: OrderFormValues = {
username: "",
email: "",
};

export default function OrderForm() {
const handleSubmit = (
values: OrderFormValues,
actions: FormikHelpers<OrderFormValues>
) => {
console.log("Order data:", values);
actions.resetForm();
};

return (
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

<Form>
<Field type="text" name="username" />
<Field type="email" name="email" />
<button type="submit">Place order</button>
</Form>
</Formik>
);
}

Функція handleSubmit має два параметри:

- values – це об’єкт зі значеннями всіх полів форми, типізований як OrderFormValues.
- actions – набір методів, які надає Formik для керування формою. Один із найчастіше вживаних – resetForm, який скидає значення форми до початкових (initialValues). Тип FormikHelpers<T> вже включений у бібліотеку.

🧠 Як і у випадку з form action, Formik автоматично скасовує стандартну поведінку HTML-форми (перезавантаження сторінки) та збирає значення елементів. Ви отримуєте дані зручною структурою – у вигляді об'єкта values.

## Типи полів

За замовчуванням компонент Field рендерить звичайний тег <input>. Але іноді потрібно інший тип поля – наприклад, радіокнопки, чекбокси, селект чи багаторядкове текстове поле (textarea).

Щоб змінити HTML-елемент, потрібно передати проп as="назва_тега" компоненту Field.

### Селект

Щоб створити випадаючий список (select), використовується Field з пропом as="select". Опції вказуються звичайними HTML-тегами <option>.

import { useId } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";

interface OrderFormValues {
username: string;
email: string;
deliveryTime: string;
}

const initialValues: OrderFormValues = {
username: "",
email: "",
deliveryTime: "",
};

export default function OrderForm() {
const fieldId = useId();

const handleSubmit = (
values: OrderFormValues,
actions: FormikHelpers<OrderFormValues>
) => {
console.log(values);
actions.resetForm();
};

return (
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

<Form>
<Field type="text" name="username" />
<Field type="email" name="email" />

        <label htmlFor={`${fieldId}-deliveryTime`}>Preferred delivery time</label>
        <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </Field>

        <button type="submit">Place order</button>
      </Form>
    </Formik>

);
}

Ми додали поле deliveryTime, яке дозволяє вибрати час доставки:

- Використали Field as="select"
- Додали відповідний name
- Додали до initialValues значення за замовчуванням
- Не забули оновити тип

🧠 Початкове значення для deliveryTime в initialValues має відповідати одному з value в <option>.

### Радіокнопки

Щоб додати радіокнопки, використовуйте Field з однаковим name, але різними value.

- Всі кнопки в групі повинні мати однакове значення name.
- Кожна кнопка має свій value.
- Початкове значення задається через initialValues.

import { Formik, Form, Field } from "formik";

interface OrderFormValues {
delivery: string;
}

const initialValues: OrderFormValues = {
delivery: "pickup",
};

export default function OrderForm() {
const handleSubmit = (
values: OrderFormValues,
actions: FormikHelpers<OrderFormValues>
) => {
console.log(values);
actions.resetForm();
};

return (
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

<Form>
<label>
<Field type="radio" name="delivery" value="pickup" />
Pickup
</label>
<label>
<Field type="radio" name="delivery" value="courier" />
Courier
</label>
<label>
<Field type="radio" name="delivery" value="drone" />
Drone delivery
</label>

        <button type="submit">Place order</button>
      </Form>
    </Formik>

);
}

🧠 initialValues.delivery має відповідати одному з value, інакше жодна кнопка не буде вибрана.

### Чекбокси

Для декількох чекбоксів з одним ім’ям, Formik зберігає значення у масиві.

- Всі Field мають однакове ім’я name.
- Кожен Field має різний value.
- Початкове значення в initialValues – масив рядків.

import { Formik, Form, Field } from "formik";

interface OrderFormValues {
restrictions: string[];
}

const initialValues: OrderFormValues = {
restrictions: [],
};

export default function OrderForm() {
const handleSubmit = (
values: OrderFormValues,
actions: FormikHelpers<OrderFormValues>
) => {
console.log(values);
actions.resetForm();
};

return (
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

<Form>
<label>
<Field type="checkbox" name="restrictions" value="vegan" />
Vegan
</label>
<label>
<Field type="checkbox" name="restrictions" value="gluten-free" />
Gluten-free
</label>
<label>
<Field type="checkbox" name="restrictions" value="nut-free" />
Nut-free
</label>

        <button type="submit">Place order</button>
      </Form>
    </Formik>

);
}

🧠 Якщо вибрати кілька чекбоксів, Formik збере всі value в масив restrictions.

### Елемент textarea

Для довільного тексту (наприклад, коментар або опис) використовують поле textarea. Воно створюється через Field as="textarea".

import { Formik, Form, Field, FormikHelpers } from "formik";

interface OrderFormValues {
message: string;
}

const initialValues: OrderFormValues = {
message: "",
};

export default function OrderForm() {
const handleSubmit = (
values: OrderFormValues,
actions: FormikHelpers<OrderFormValues>
) => {
console.log(values);
actions.resetForm();
};

return (
<Formik initialValues={initialValues} onSubmit={handleSubmit}>

<Form>
<label htmlFor="message">Comment or instructions</label>
<Field as="textarea" name="message" id="message" rows={5} />

        <button type="submit">Place order</button>
      </Form>
    </Formik>

);
}

# Валідація з Yup

Валідація – це перевірка введених користувачем значень перед відправленням. Formik підтримує інтеграцію з Yup – потужною бібліотекою для побудови схем валідації.

- Покращує досвід користувача (не треба чекати відповіді з сервера)
- Захищає від некоректного введення
- Дає змогу показувати помилки прямо біля полів

Підключення Yup

Встановлюємо бібліотеку Yup:

npm install yup

Імпортуємо бібліотеку валідації в компонент форми:

import \* as Yup from "yup";

🧠 Formik підтримує Yup "з коробки". Щоб увімкнути валідацію – потрібно створити схему валідації і передати її в проп validationSchema компонента Formik.

## Як працює схема Yup

Yup використовує "схеми", що описують структуру об'єкта та правила перевірки. Наприклад:

const Schema = Yup.object().shape({
username: Yup.string().required("Username is required"),
});

Це означає:

- Об’єкт повинен мати властивість username
- Це має бути рядок (string)
- Він обов’язковий (required)
- Якщо його нема – показати повідомлення "Username is required"

🧠 Кожен ключ в об’єкті повинен відповідати полю в initialValues.

Створимо схему валідації блоку "Client Info" з полями username та email.

const OrderFormSchema = Yup.object().shape({
username: Yup.string()
.min(2, "Name must be at least 2 characters")
.max(30, "Name is too long")
.required("Name is required"),
email: Yup.string()
.email("Invalid email format")
.required("Email is required"),
});

Функції Yup.string(), Yup.min(), Yup.max(), Yup.required() і інші – це функції-валідатори, які дозволяють додати певний критерій валідації. Кожен валідатор може приймати від нуля до двох параметрів.

- перший – це критерій валідації, наприклад, довжина рядка чи значення числа
- другий – це рядок, який буде використаний як помилка у разі валідації.

🧠 Не у всіх валідаторів є критерії або повідомлення про помилку, щоб це дізнатися, необхідно дивитися в документацію Yup.

Підключаємо схему до Formik через пропс validationSchema, в який треба передати схему валідації Yup.

<Formik
initialValues={initialValues}
validationSchema={OrderFormSchema}
onSubmit={handleSubmit}

> {/_ форма _/}
> </Formik>

Після додавання валідації, ми не зможемо відправити форму, якщо в одному з полів буде введено не валідне значення.

Formik проводить валідацію автоматично:

- Після виходу з поля.
- Після кожної зміни.
- Перед сабмітом.

🧠 Formik відстежує, якщо користувач торкався поля. Це поле переходить в стан touched і лише тоді показується помилка.

### Відображення помилок

Formik надає компонент ErrorMessage, який можна розмістити під полем, щоб показувати текст помилки.

<Field type="text" name="username" />
<ErrorMessage name="username" component="span" className={css.error} />

Проп name має збігатися з іменем Field
component="span" вказує, що помилка виводиться у тезі span, що зручно для стилів.
