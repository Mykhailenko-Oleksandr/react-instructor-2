- Отримання значень через FormData
  1. Form Actions
  2. Попереднє заповнення форм
  3. Форма як компонент
- HTTP-запити
  1. Форма пошуку
  2. Обробка запиту
  3. Обробка даних запиту
  4. Відображення даних
  5. Структура файлів
  6. Індикатор завантаження
  7. Обробка помилок
  8. Поділ відповідальності
- Змінні оточення
  1. Змінні оточення на Vercel
- Хук useId
  1. Атрибут htmlFor
- Елементи форми
  1. Радіокнопки
  2. Чекбокси
  3. Випадаючий список
- Побічні ефекти
  1. Хук useEffect
- Залежності ефекта
  1. Правила залежностей
- Синтаксис async/await
- Суворий режим
- Очищення ефектів
  1. Функція очищення
- Модальне вікно
  1. Компонент модального вікна
  2. Стилізація модального вікна
  3. Портали
  4. Кнопка закриття
  5. Закриття по кліку на фон
  6. Закриття по Escape
  7. Заборона прокрутки фону
  8. Повторне використання
- Робота з LocalStorage
  1. Запис у LocalStorage
  2. Зчитування з LocalStorage
- Декілька ефектів
  1. Що важливо знати про ефекти

# Отримання значень через FormData

React не має власного API для роботи з формами, тому використовуємо FormData, як і в звичайному JavaScript.

export default function App() {
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
const form = event.currentTarget;

    const formData = new FormData(form);
    const username = formData.get("username");
    console.log("Username:", username);

    form.reset();

};

return (

<form onSubmit={handleSubmit}>
<input type="text" name="username" />
<button type="submit">Submit</button>
</form>
);
}

- FormData(form) – створює об'єкт, який містить усі значення полів форми.
- formData.get("назва_поля") – отримує значення відповідного поля.
- form.reset() – очищає форму після відправки.

FormData – це вбудований клас JavaScript, який дозволяє легко зчитувати значення полів форми.

Коли ви створюєте new FormData(form), браузер автоматично:

бере всі поля (<input>, <textarea>, <select>) з цієї форми;
зчитує їх імена (name="...") і значення;
зберігає їх у вигляді пари ключ-значення (name: value), як об'єкт.

- FormData працює лише з тими елементами, які мають атрибут name. Без нього значення поля зчитано не буде.

## Form Actions

Кожен раз при відправці форми ми пишемо один і той самий шаблонний код:

Блокуємо стандартну поведінку браузера (event.preventDefault())
Створюємо об’єкт FormData, щоб дістати значення полів
Опрацьовуємо дані
Скидаємо форму (form.reset())

Це рутинний код, який можна автоматизувати завдяки Form Actions – спеціального способу обробки форм, який надає React.

Коли ви передаєте функцію в атрибут action форми, React автоматично викликає цю функцію після сабміту, передаючи їй знайому нам FormData – об'єкт, що містить усі значення полів форми.

export default function App() {
const handleSubmit = (formData: FormData) => {
console.log("Form submitted");
};

return (

<form action={handleSubmit}>
<input type="text" name="username" />
<button type="submit">Submit</button>
</form>
);
}

В такому випадку React:

- перехоплює і зупиняє подію submit
- формує об’єкт FormData
- викликає функцію handleSubmit(formData)
- formData – це не подія. Це об’єкт із готовими значеннями полів.

💡 Тип FormData – вбудований, тому нічого додатково імпортувати не треба.

Для отримання значень використовуємо метод formData.get("назва_поля"):

export default function App() {
const handleSubmit = (formData: FormData) => {
const username = formData.get("username") as string;
console.log("Name:", username);
};

return (

<form action={handleSubmit}>
<input type="text" name="username" />
<button type="submit">Submit</button>
</form>
);
}

🧠 formData.get() повертає значення типу FormDataEntryValue | null. У текстових полях це зазвичай рядок, але TypeScript цього не знає. Тому треба явно вказати тип значення за допомогою as тип.

## Попереднє заповнення форм

Іноді потрібно, щоб поля у формі вже мали якісь значення – наприклад, при редагуванні профілю або коли дані приходять з бекенду.

Коли потрібно, щоб поле у формі було вже заповнене при відкритті, в React використовують атрибут defaultValue. Він задає початкове значення інпута або текстової області.

Це зручно, наприклад:

- у формі редагування профілю
- для тестових демо з готовими даними
- при поверненні до попередньої форми

Для цього в React використовують атрибут defaultValue. Це аналог HTML-атрибута value, але лише для початкового значення, яке користувач може змінити перед сабмітом форми.

export default function App() {
const handleSubmit = (formData: FormData) => {
const username = formData.get("username") as string;  
 console.log("Name:", username);
};

return (

<form action={handleSubmit}>
<input type="text" name="username" defaultValue="John Doe" />
<button type="submit">Submit</button>
</form>
);
}

🧠 Значення defaultValue відображаються у полях одразу, але користувач може їх змінити перед відправкою. Після сабміту ці значення потрапляють у FormData.

## Форма як компонент

На практиці форма – це окремий компонент, який відповідає лише за збір значень своїх полів. А те, що потрібно зробити з цими значеннями – наприклад, відправити замовлення чи зареєструвати користувача – передається у вигляді пропса ззовні.

У багатьох випадках форма не вирішує, що робити з даними – вона їх просто збирає.

Зробимо форму замовлення OrderForm, яка приймає пропс onSubmit, викликає його при сабміті, і передає туди дані.

// src/components/OrderForm.tsx

interface OrderFormProps {
onSubmit: (value: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
const handleSubmit = (formData: FormData) => {
const username = formData.get("username") as string;
onSubmit(username);
};

return (

<form action={handleSubmit}>
<input type="text" name="username" />
<button type="submit">Place order</button>
</form>
);
}

💡 Назва пропса (onSubmit, onOrder, onSend) може бути будь-якою – головне, щоб було зрозуміло, що він означає. Це ваш власний пропс, а не атрибут елемента form.

У компоненті App ми використовуємо OrderForm і передаємо в неї пропс onSubmit, який є функцією для обробки замовлення.

// src/components/App.tsx

import OrderForm from "./OrderForm";

export default function App() {
const handleOrder = (data: string) => {
console.log("Order received from:", data);
// можна зберегти замовлення, викликати API, показати повідомлення тощо
};

return (
<>

<h1>Place your order</h1>
<OrderForm onSubmit={handleOrder} />
</>
);
}

Що тут важливо:

OrderForm не знає, що буде з даними – вона просто викликає onSubmit(data)
Компонент форми не залежить від того, як саме обробляються дані – це зовнішня відповідальність.
Код стає чистішим: форма не має логіки, яку вона не повинна знати.

# HTTP-запити

У React немає вбудованого інструмента для HTTP-запитів. Тому використовуємо сторонні бібліотеки, найпопулярніша з них – Axios.

npm install axios

Створимо додаток, в якому є:

- форма пошуку статей;
- HTTP-запит на API Hacker News;
- виведення результатів на сторінку;
- обробка станів завантаження та помилки.

## Форма пошуку

HTTP-запити можна виконувати за подією, наприклад, при кліку на елементі чи відправці форми. Компонент форми просто збирає значення з поля і передає їх наверх у пропсі onSubmit.

// src/components/SearchForm.tsx

interface SearchFormProps {
onSubmit: (topic: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
const handleSubmit = (formData: FormData) => {
const topic = formData.get("topic") as string;

    // Якщо текстове поле порожнє, виводимо повідомлення
    	// і припиняємо виконання функції.
    if (topic === "") {
      alert("Please enter search topic!");
      return;
    }

    // У протилежному випадку викликаємо пропс
    	// і передаємо йому значення поля
    onSubmit(topic);

};

return (

<form action={handleSubmit}>
<input type="text" name="topic" />
<button type="submit">Search</button>
</form>
);
}

## Обробка запиту

Запити виконуються не в компоненті форми, а в App, куди вона передає значення. Це дозволяє розділити відповідальність: форма – за інтерфейс, App – за логіку.

// src/components/App.tsx

import SearchForm from "./SearchForm";

export default function App() {

const handleSearch = async (topic: string) => {
// Тут будемо виконувати HTTP-запит
console.log(topic);
};

return (
<>
<SearchForm onSubmit={handleSearch} />
</>
);
}

Додамо код HTTP-запиту до Hacker News API всередину асинхронної функції handleSearch.

// src/components/App.tsx

import axios from "axios";
import SearchForm from "./SearchForm";

interface Article {
objectID: string;
title: string;
url: string;
}

interface ArticlesHttpResponse {
hits: Article[];
}

export default function App() {

const handleSearch = async (topic: string) => {
// Виконуємо HTTP-запит
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
console.log(response.data); // об'єкт з властивістю hits
};

return (
<>
<SearchForm onSubmit={handleSearch} />
</>
);
}

Обов’язково типізуємо відповідь від бекенду. Для цього створюємо два інтерфейси:

Article – описує один об’єкт статті. Не потрібно типізувати всі поля з бекенду – тільки ті, які ми реально використовуємо.
ArticlesHttpResponse - описує об’єкт відповіді від API (властивість response.data), в якому нас поки що цікавить тільки властивість hits, масив об’єктів типу Article.

Підсумок

- HTTP-запити виконуємо в батьківському компоненті, не в формі.
- Дані з форми передаються через callback-пропс.
- Дані відповіді типізуємо окремо, це дає підказки та захист від помилок.

## Обробка даних запиту

Щоб відобразити результат HTTP-запиту, його обов’язково потрібно зберегти в стані компонента. Інакше React не буде знати, що потрібно оновити інтерфейс.

Ми будемо зберігати масив статей, тому використовуємо хук useState<Article[]>. Початкове значення – порожній масив.

// src/components/App.tsx

/_ Решта коду файла _/

export default function App() {
// 1. Оголошуємо і типізуємо стан
const [articles, setArticles] = useState<Article[]>([]);

const handleSearch = async (topic: string) => {
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
// 2. Записуємо дані в стан після запиту
setArticles(response.data.hits);
};

return (
<>
<SearchForm onSubmit={handleSearch} />
</>
);
}

React повторно рендерить компонент, коли змінюється стан.
Якщо не зберегти у useState, інтерфейс не оновиться, навіть якщо запит успішний.

🧠 Завжди, коли хочете показати на екрані дані від бекенда, вам потрібно:

1. Отримати ці дані (наприклад, з API).
2. Зберегти їх у стані (useState)
3. Рендерити JSX на основі цього стану

## Відображення даних

Після того як ми зберегли дані запиту у стані, компонент автоматично оновиться, і ми можемо використати ці дані для рендеру JSX. Використаємо умовне відображення, щоб показувати список лише тоді, коли масив articles не порожній:

// src/components/App.tsx

/_ Решта коду файла _/

export default function App() {
const [articles, setArticles] = useState<Article[]>([]);

const handleSearch = async (topic: string) => {
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
setArticles(response.data.hits);
};

return (
<>
<SearchForm onSubmit={handleSearch} />
{articles.length > 0 && (

<ul>
{articles.map(({ objectID, url, title }) => (
<li key={objectID}>
<a href={url} target="_blank">{title}</a>
</li>
))}
</ul>
)}
</>
);
}

Ми застосували типову схему роботи з HTTP-запитами у React:

Запустили запит за подією (сабміт форми).
Типізували відповідь від бекенду (ArticlesHttpResponse).
Зберегли отримані дані у стан (useState).
Вивели JSX-розмітку на основі цього стану.

💡 Цей патерн – універсальний: він застосовується майже в усіх React-додатках, які взаємодіють з бекендом.

## Структура файлів

Щоб зробити код більш зрозумілим і масштабованим, ми винесемо частину логіки в окремі файли:

Оскільки список статей – це окрема частина інтерфейсу, винесемо його у компонент ArticleList.tsx. Компонент отримає масив статей через проп items і відобразить їх.
Створимо файл src/types/article.ts, щоб не дублювати тип Article у різних місцях.
У App залишиться логіка запиту, стан і умовний рендер ArticleList.

Рендеринг за умовою ({articles.length > 0 && ...}) відбувається у компоненті App. Сам компонент ArticleList завжди показує список, якщо його рендерять. Тобто логіка "показати чи ні" – це відповідальність App, а не ArticleList.

## Індикатор завантаження

Поки виконується HTTP-запит, у користувача на екрані – порожнє місце, що виглядає як помилка або зависання. Щоб цього уникнути, показують індикатор завантаження.

Індикатор – це реактивне значення, тобто його потрібно зберігати в стані компонента. Зазвичай це булевий прапорець:

true – запит виконується
false – запиту немає або він уже завершився

// src/components/App.tsx

/_ Решта коду файла _/

export default function App() {
const [articles, setArticles] = useState<Article[]>([]);
// 1. Додаємо стан індикатора завантаження
const [isLoading, setIsLoading] = useState(false);

const handleSearch = async (topic: string) => {
// 2. змінюємо індикатор на true перед запитом
setIsLoading(true);
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
// 3. Змінюємо індикатор на false після запиту
setIsLoading(false);
setArticles(response.data.hits);
};

return (
<>
<SearchForm onSubmit={handleSearch} />
{/_ 4. Відображаєм повідомлення про завантаження даних в JSX _/}
{isLoading && <p>Loading data, please wait...</p>}
{articles.length > 0 && <ArticleList items={articles} />}
</>
);
}

Індикатор завантаження може бути будь-чим: простим текстом, іконкою тощо. Одна з популярних бібліотек – React Loader Spinner, яка надає десятки готових компонентів із різним дизайном.

🧠 Завжди показуйте користувачеві, що дані завантажуються, навіть якщо це триває менше секунди – це покращує UX.

## Обробка помилок

HTTP-запити можуть завершуватися неуспішно – наприклад, через відсутність інтернету або помилку на сервері. Тому завжди потрібно відображати повідомлення про помилку, щоб користувач розумів, що сталося.

Для цього:

- Додаємо стан isError для відстеження помилки.
- Обгортаємо запит у try...catch, щоб перехопити можливу помилку.
- Виводимо повідомлення, якщо значення isError це true.

// src/components/App.tsx

/_ Решта коду _/

export default function App() {
const [articles, setArticles] = useState<Article[]>([]);
const [isLoading, setIsLoading] = useState(false);
// 1. Оголошуємо стан
const [isError, setIsError] = useState(false);

const handleSearch = async (topic: string) => {
// 2. Додаємо блок try...catch
try {
setIsLoading(true);
// 3. Скидаємо стан помилки в false перед кожним запитом
setIsError(false);
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
setArticles(response.data.hits);
} catch {
// 4. Встановлюємо стан isError в true
setIsError(true);
} finally {
// 5. Встановлюємо стан isLoading в false
// після будь якого результату запиту
setIsLoading(false);
}
};

return (
<>
<SearchForm onSubmit={handleSearch} />
{isLoading && <p>Loading data, please wait...</p>}
{/_ 6. Використовуємо стан isError щоб показати помилку _/}
{isError && <p>Whoops, something went wrong! Please try again!</p>}
{articles.length > 0 && <ArticleList items={articles} />}
</>
);
}

## Поділ відповідальності

Тримати код HTTP-запитів прямо в компоненті – небажано. З часом компонент:

- буде мати зайву логіку не пов’язану з UI;
- стане важчим для читання і підтримки;

Рішення – винести код запиту в окремий файл, наприклад src/services/articleService.ts. Компоненти повинні тільки викликати функцію й отримувати дані, не турбуючись про адресу бекенду чи формат відповіді.

// src/services/articleService.ts

import axios from "axios";
import { Article } from "../types/article";

interface ArticlesHttpResponse {
hits: Article[];
}

// HTTP-функція запиту статей
export const fetchArticles = async (topic: string): Promise<Article[]> => {
const response = await axios.get<ArticlesHttpResponse>(
`https://hn.algolia.com/api/v1/search?query=${topic}`
);
return response.data.hits;
};

Функція fetchArticles(topic) повертає проміс масиву статей.
Типізація відповіді (ArticlesHttpResponse) локальна – її не потрібно експортувати.
Обробка помилки не входить у функцію – вона буде в компоненті.

Використовуємо функцію в компоненті App

// src/components/App.tsx

import { useState } from "react";
import SearchForm from "./SearchForm";
import ArticleList from "./ArticleList";
import { Article } from "../types/article";
// 1. Імпортуємо HTTP-функцію
import { fetchArticles } from "../services/articleService";

export default function App() {
const [articles, setArticles] = useState<Article[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);

const handleSearch = async (topic: string) => {
try {
setIsLoading(true);
setIsError(false);
// 2. Використовуємо HTTP-функцію
const data = await fetchArticles(topic);
setArticles(data);
} catch {
setIsError(true);
} finally {
setIsLoading(false);
}
};

return (
<>
<SearchForm onSubmit={handleSearch} />
{isLoading && <p>Loading data, please wait...</p>}
{isError && <p>Whoops, something went wrong! Please try again!</p>}
{articles.length > 0 && <ArticleList items={articles} />}
</>
);
}

Навіть в такому простому випадку ми приховали від компонента адресу запиту, типізацію та формат відповіді.

- Чистий компонент – працює лише з інтерфейсом і станом.
- Простота підтримки – HTTP-логіку можна змінювати окремо.
- Масштабованість – легко додати інші сервіси (напр. userService, authService).

Компонент просто передає topic і отримує готові articles. Він не знає, звідки вони взялися, і це добре – це і є правильний розподіл обов'язків.

# Змінні оточення

Змінні оточення (environment variables) – це конфігураційні значення, які зберігаються поза кодом, наприклад:

- API ключі
- Токени доступу
- Конфігурації

Чому не зберігати ключі в коді?

Якщо API-ключ або токен зберігати напряму в коді, він потрапляє в репозиторій.
Публічні репозиторії – це пастка для ботів, які сканують GitHub на наявність ключів.
Витік ключа може призвести до небажаних витрат, викрадення даних або блокування акаунту на стороні API.

Тому навіть для особистих проєктів, ключі зберігають в окремому .env файлі, який ігнорується Git'ом.

Створення .env файлу

У корені проєкту створіть файл .env. Саме в корені, а не в папці src.

Всередині можна оголошувати змінні у форматі КЛЮЧ=значення, які будуть доступні у вашому коді:

VITE_API_KEY=my-super-secret-api-key

У Vite змінні мають починатися з префіксу VITE\_, інакше вони не будуть доступні в коді. Назви змінних мають бути великими літерами.

Не додавайте файл .env у Git

Додайте .env файл до .gitignore, щоб не викладати його в репозиторій. Ось готовий .gitignore, скопіюйте його собі:

# Env vars

.env

# Logs

logs
_.log
npm-debug.log_
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
\*.local

# Editor directories and files

.vscode/_
!.vscode/extensions.json
.idea
.DS_Store
_.suo
_.ntvs_
_.njsproj
_.sln
\*.sw?

Як використовувати змінну у коді

Тепер у будь-якому JavaScript або TypeScript файлі можна отримати значення змінної на ім'я.

const myKey = import.meta.env.VITE_API_KEY;

import.meta.env – це спеціальний об’єкт, через який Vite дає доступ до змінних оточенн.

## Змінні оточення на Vercel

- Відкрийте ваш проєкт на Vercel
- Зайдіть у Settings → Environment Variables
- Додайте назви й значення змінних точно так само, як у .env

Наприклад:
Name: VITE_API_KEY
Value: my-super-secret-api-key

Vercel автоматично підставить ці значення під час білду – жоден секрет не потрапить до репозиторію.

# Хук useId

Хук useId використовується для генерації унікальних ідентифікаторів, які допомагають зв’язати label із відповідним полем форми через атрибут id.

Це корисно для доступності (a11y) – щоб користувачі з асистивними технологіями могли правильно взаємодіяти з формою.

import { useId } from 'react';

function MyComponent() {
const id = useId();
};

useId() не приймає жодних параметрів
Повертає унікальний рядок

⚠️ useId не підходить для списків як key. Він створений лише для ідентифікаторів в HTML-елементах.

## Атрибут htmlFor

HTML-атрибут for у <label> (в React – htmlFor) зв’язує мітку з полем за допомогою id, щоб фокус переходив на поле при кліку по мітці.

import { useId } from "react";

function MyComponent() {
const textId = useId();

return (

<form>
<label htmlFor={textId}>Text field label</label>
<input type="text" id={textId} />
</form>
);
};

Для кожного поля форми можна створити окремий id, щоб зв’язати його з відповідним label.

import { useId } from "react";

export default function OrderForm() {
const nameId = useId();
const emailId = useId();

return (

<form>
<label htmlFor={nameId}>Name</label>
<input type="text" name="username" id={nameId} />

      <label htmlFor={emailId}>Email</label>
      <input type="email" name="email" id={emailId} />

      <button type="submit">Place order</button>
    </form>

);
}

Навіщо це потрібно?

Уявімо, що компонент OrderForm може з’являтись декілька разів на сторінці – наприклад, у різних модальних вікнах або картках. Якщо ви напишете id="username" у кожній формі, отримаєте дублікати id:

HTML буде не валідним (повторення id)
Браузер може неправильно фокусувати поле при кліку на label

Хук useId генерує унікальний id для кожного виклику, тому навіть при багаторазовому рендері компонента всі поля залишаються валідними та пов’язаними з мітками. Використовуйте useId у кожному полі, де label прив’язаний до input, select, textarea тощо.

Один id для групи полів

Не обов’язково викликати useId() для кожного поля окремо. Ви можете створити один базовий id для форми й використовувати його з різними суфіксами у кожному полі.

import { useId } from "react";

export default function OrderForm() {
const fieldId = useId();

return (

<form>
<label htmlFor={`${fieldId}-username`}>Name</label>
<input type="text" name="username" id={`${fieldId}-username`} />

      <label htmlFor={`${fieldId}-email`}>Email</label>
      <input type="email" name="email" id={`${fieldId}-email`} />

      <button type="submit">Place order</button>
    </form>

);
}

Ми створили один унікальний fieldId за допомогою useId()
Додали до нього суфікси username і email для створення окремих ідентифікаторів для кожного поля
Це зменшує кількість викликів useId() і полегшує читання коду

🧠 Такий підхід зручний у формах із багатьма полями і зберігає зв’язок між полем і міткою через htmlFor.

# Елементи форми

## Радіокнопки

Радіокнопки – це варіант вибору одного значення з кількох можливих. Вони працюють у групі: користувач може вибрати тільки один варіант.

- Щоб кнопки працювали як група – у них має бути однаковий атрибут name.
- Кожна кнопка має своє значення в атрибуті value.

Для прикладу додамо вибір способу доставки через радіокнопки:

export default function OrderForm() {

const handleOrder = (formData: FormData) => {
const delivery = formData.get("delivery") as string;
console.log("Delivery:", delivery);
};

return (

<form action={handleOrder}>
<fieldset>
<legend>Delivery method:</legend>

        <label>
          <input type="radio" name="delivery" value="pickup" defaultChecked />
          Pickup
        </label>
        <label>
          <input type="radio" name="delivery" value="courier" />
          Courier
        </label>
        <label>
          <input type="radio" name="delivery" value="drone" />
          Drone delivery
        </label>
      </fieldset>

      <button type="submit">Place order</button>
    </form>

);
}

- Усі три радіокнопки мають одне ім’я name="delivery" – це робить їх групою, де можна обрати лише один варіант.
- Атрибут value визначає, яке значення отримає поле.
- defaultChecked на першій кнопці означає, що вона вибрана за замовчуванням.
- При сабміті значення зчитується через formData.get("delivery").

🧠 У JSX булеві атрибути, як-от defaultChecked, defaultValue, disabled, required тощо, не мають значення true/false, просто їх наявність означає true.
Наприклад: <input defaultChecked /> – це те саме, що <input defaultChecked={true} />.

## Чекбокси

На відміну від радіокнопок, які дозволяють вибрати тільки один варіант, чекбокси дозволяють вибрати одразу кілька варіантів.

- Усі чекбокси можуть мати однаковий атрибут name – це дозволяє зібрати значення в масив.
- Кожен чекбокс має власне значення через атрибут value.
- Якщо чекбокс вибрано, його значення буде в FormData.

Додамо у форму замовлення групу чекбоксів для вибору дієтичних обмежень:

export default function OrderForm() {

const handleOrder = (formData: FormData) => {
const restrictions = formData.getAll("restrictions") as string[];
console.log("Dietary restrictions:", restrictions);
};

return (

<form action={handleOrder}>
<fieldset>
<legend>Dietary restrictions:</legend>
<label>
<input type="checkbox" name="restrictions" value="vegan" />
Vegan
</label>
<label>
<input type="checkbox" name="restrictions" value="gluten-free" />
Gluten-free
</label>
<label>
<input type="checkbox" name="restrictions" value="nut-free" />
Nut-free
</label>
</fieldset>

      <button type="submit">Submit</button>
    </form>

);
}

- Усі чекбокси мають однаковий name="restrictions", тому, під час відправки форми, браузер передає масив обраних значень.
- Щоб отримати всі ці значення, ми використовуємо formData.getAll("restrictions") – цей метод завжди повертає масив.
- Тип результату – string[], тому додаємо кастинг типу: as string[].
- Якщо користувач не обрав жоден чекбокс – getAll() поверне порожній масив, а не null.

🧠 Метод formData.get() повертає лише перше значення, тому не підходить для чекбоксів. Використовуйте formData.getAll(), коли у поля може бути кілька значень – як у випадку з чекбоксами.

## Випадаючий список

У React елемент <select> використовується так само, як у звичайному HTML. Він дозволяє користувачу вибрати одне значення з кількох.

Кожне значення задається через тег <option value="...">, а при відправці форми значення поля зчитується за атрибутом value.

import { useId } from "react";

export default function OrderForm() {
const selectId = useId();

const handleOrder = (formData: FormData) => {
const deliveryTime = formData.get("deliveryTime") as string;
console.log("Preferred delivery time:", deliveryTime);
};

return (

<form action={handleOrder}>
<label htmlFor={selectId}>Preferred delivery time</label>
<select name="deliveryTime" id={selectId} defaultValue="">
<option value="">-- Choose delivery time --</option>
<option value="morning">Morning (8:00–12:00)</option>
<option value="afternoon">Afternoon (12:00–16:00)</option>
<option value="evening">Evening (16:00–20:00)</option>
</select>

      <button type="submit">Place order</button>
    </form>

);
}

Перша опція з value="" – це placeholder: вона змушує користувача вибрати варіант вручну. Якщо нічого не вибрано, formData.get("deliveryTime") поверне порожній рядок ("").

🧠 Це поширений UX-патерн, який запобігає випадковим виборам і підвищує якість даних у формі.

# Заняття 6. Побічні ефекти

React-компоненти проходять три основні етапи у своєму житті:

- Монтування (Mounting) – це перший рендер, коли компонент вперше з’являється на сторінці.
- Оновлення (Updating) – компонент оновлюється кожного разу, коли змінюються стан або пропси та React виконує повторний рендер.
- Розмонтування (Unmounting) – компонент видаляється зі сторінки, наприклад коли використовується умовний рендер.

Ми вже розуміємо як виконати й обробити HTTP запит при події, наприклад при сабміті форми. А як зробити запит коли компонент тільки завантажився і користувач ще не виконав ніяких дій?

Спробуємо наступний код. Не будемо поки що додавати типи, щоб не ускладнювати:

import { useState } from 'react';
import axios from 'axios';

export default function App() {
const [person, setPerson] = useState(null);

axios
.get('https://swapi.info/api/people/1')
.then((response) => setPerson(response.data));

return (
<>

<pre>{JSON.stringify(person, null, 2)}</pre>

</>
);
}

- При монтуванні компонента App відбувається HTTP-запит
- Результат запиту зберігається в стан person
- Після зміни стану person відбувається рендер компонента й оновлення JSX

На перший погляд може здатися, що все працює добре, але у нас є велика проблема, яку можна побачити якщо додати логування якогось сповіщення в консоль (або якщо подивитись на вкладку Network).

import { useState } from 'react';
import axios from 'axios';

export default function App() {
const [person, setPerson] = useState(null);

console.log('App rendred!');

axios
.get('https://swapi.info/api/people/1')
.then((response) => setPerson(response.data));

return (
<>

<pre>{JSON.stringify(person, null, 2)}</pre>

</>
);
}

Тепер якщо запустити цей код (спробуйте у себе в редакторі), то побачимо в консолі нескінченне логування рядка із console.log.

Проблема в тому, що компоненти оновлюються кожен раз коли змінюються їх пропси або стан. Отже, кожен раз коли змінюється стан person компонент App рендериться заново, тобто викликається функція App і виконується весь код всередині – логування, запит і зміна стану, що призводить до нескінченного циклу оновлень!

Для того, щоб розв'язати цю проблему, нам потрібен побічний ефект (side effect) – це будь-який код, який взаємодіє з зовнішньою системою при монтуванні або оновленні компонента: локальне сховище, звернення до сервера, пряма робота з браузером тощо.

## Хук useEffect

Для того, щоб оголосити побічний ефект використовується вбудований хук useEffect.

useEffect(() => {
// код ефекту
}, [])

- Перший аргумент (обов’язковий) це анонімна функція, всередині якої виконується вся логіка ефекту. Наприклад, запити на сервер, запис у локальне сховище і т.п.
- Другий аргумент (необов’язковий) це масив залежностей ефекту. Якщо не передати його, ефект буде викликаний при кожному оновленні компонента, тому ми завжди передаємо масив залежностей.

🧠 Хук useEffect не повертає жодного значення як результат своєї роботи, а лише запускає виконання функції. Іншими словами, неможливо виконати в середині функції обчислення і повернути їх у зовнішній код. Ефекти не призначені для обчислень!

Ось як буде виглядати наш код з useEffect:

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
const [person, setPerson] = useState(null);

useEffect(() => {
console.log('Effect ran!');
axios
.get('https://swapi.info/api/people/1')
.then((response) => setPerson(response.data));
}, []);

console.log('App rendred!');

return (
<>

<pre>{JSON.stringify(person, null, 2)}</pre>

</>
);
}

Поки що використовуємо метод then, замість більш сучасного синтаксису async/await, тому що є деякі особливості, які обов’язково розберемо далі.

При запуску коду побачимо наступну послідовність логів:

Покроково розберемо що саме відбулося:

- Компонент App завантажився (був змонтований), ініціалізував стан та намалював розмітку
- Після цього виконалась функція ефекта та запустився HTTP-запит
- Після запиту було запущено оновлення стану person
- Після оновлення стану функція App була викликана, оновився інтерфейс, але ефект повторно не виконався й у нас більше немає нескінченного циклу оновлень.

Завдяки порожньому масиву залежностей такий ефект виконується тільки один раз – при завантаженні компонента в якому він оголошений.

🧠 Будь-який код усередині функції ефекту гарантовано буде виконано лише після того, як React змонтує елементи в DOM – іншими словами, після того, як JSX компонента буде "намальовано" на сторінці.

# Залежності ефекта

Додамо у компонент стан count для зберігання значення лічильника.

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
const [count, setCount] = useState(1);
const [person, setPerson] = useState(null);

useEffect(() => {
console.log('Effect ran!');
axios
.get('https://swapi.info/api/people/1')
.then((response) => setPerson(response.data));
}, []); // Порожній масив залежностей

console.log('App rendered!');

return (
<>
<button onClick={() => setCount(count + 1)}>The count is {count}</button>

<pre>{JSON.stringify(person, null, 2)}</pre>

</>
);
}

Кожен раз при оновленні стану count ми побачимо в консолі тільки повідомлення App rendered, тому що ефект не реагує на оновлення компонента – його масив залежностей порожній.

🧠 Якщо другим аргументом useEffect передати порожній масив, то такий ефект виконується лише один раз – при першому рендері компонента (монтуванні), і більше ніколи. Такі ефекти використовуються для виконання коду без очікування дій користувача: запити за початковими даними, додавання слухачів на документ, запуск таймерів тощо.

Якщо ми додамо стан count як залежність ефекта, він спрацює при першому рендері App, а потім при кожному оновленні count. Поки що приберемо HTTP-запит і сфокусуємось на ефекті.

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
const [count, setCount] = useState(1);
const [person, setPerson] = useState(null);

useEffect(() => {
console.log('Effect ran!');
}, [count]);

console.log('App rendered!');

return (
<>
<button onClick={() => setCount(count + 1)}>The count is {count}</button>

<pre>{JSON.stringify(person, null, 2)}</pre>

</>
);
}

🧠 Залежності ефекта – це масив значень, за якими React стежить між рендерами. Якщо будь-яке з цих значень зміниться між двома рендерами, React зрозуміє, що потрібно знову виконати функцію ефекта.
Це можуть бути: стан, пропси або будь-які локальні змінні з компонента.

Розуміючи як працюють залежності ефекта, зробимо так щоб при оновленні count виконувався новий запит.

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
const [count, setCount] = useState(1);
const [person, setPerson] = useState(null);

useEffect(() => {
console.log('Effect ran!');
axios
// 1. Використовуємо count в ефекті
.get(`https://swapi.info/api/people/${count}`)
.then((response) => setPerson(response.data));
}, [count]); // 2. Додаємо count в залежності ефекта

console.log('App rendered!');

return (
<>

<h2>The count is {count}</h2>
<button onClick={() => setCount(count + 1)}>Get next character</button>
<pre>{JSON.stringify(person, null, 2)}</pre>
</>
);
}

Тепер ефект виконується при монтуванні компонента, а потім кожен раз при оновленні стану count. Так ми виконуємо HTTP-запит за інформацією про нового персонажа та рендеримо її в браузер, але уникаємо нескінченного циклу оновлень, тому що ефект не реагує на зміну стану person.

🧠 Побічний ефект (side effect) – це будь який код який взаємодіє із стороннею системою при завантаженні або оновленні компонента: локальне сховище, звернення до сервера, пряма робота з браузером тощо.

## Правила залежностей

Коли ви використовуєте useEffect, React повинен знати, від чого залежить цей ефект – які змінні мають викликати повторне виконання callback, якщо вони зміняться.

🧠 Якщо всередині ефекту ви використовуєте: стан, пропси або будь-які локальні змінні з тіла компонента – обов’язково додавайте їх у масив залежностей.

useEffect(() => {
// використовуємо clicks — отже додаємо його в залежності
console.log("Clicks updated:", clicks);
}, [clicks]); // ✅

Якщо ви забудете вказати змінну в залежностях, ефект:

виконається лише один раз (при першому рендері)
не буде реагувати на зміну цієї змінної
може працювати неправильно або непередбачувано

// ❌ Неправильно: використовуємо clicks, але не вказали його у залежностях
useEffect(() => {
console.log("Clicks updated:", clicks);
}, []); // ⚠️ Лінтер видасть попередження

У проєкті створеному за допомогою Vite налаштований лінтер ESLint із правилом react-hooks/exhaustive-deps, яке попереджає про будь-які помилки в масиві залежностей.

Якщо лінтер вказує на проблеми зі списком залежностей – ваш ефект гарантовано працює нестабільно і непередбачувано. Додайте усі необхідні залежності ефекту.

🧠 Не потрібно додавати у залежності змінні, які не використовуються в useEffect – це призведе до зайвих викликів ефекту.

# Синтаксис async/await

При використанні синтаксису async/await в ефектах є одна особливість – колбек-функція, яку ми передаємо useEffect, не може бути асинхронною.

// ❌ Так робити не можна!
useEffect(async () => {
const response = await axios.get(`https://swapi.info/api/people/${count}`);
setPerson(response.data);
}, [count]);

При такому коді лінтер в редакторі підкреслить код ефекту, і при наведенні ми побачимо наступне повідомлення з поясненням та прикладом того, як робити правильно.

Отже, всередині колбек-функції необхідно оголосити ще одну функцію, яка буде асинхронною, і викликати її одразу після оголошення. HTTP-запити слід виконувати всередині цієї функції.

useEffect(() => {
// 1. Оголошуємо асинхронну функцію
async function fetchData() {
// Тут будемо виконувати HTTP-запит
}

    // 2. Викликаємо її одразу після оголошення

fetchData();
}, []);

Виконаємо рефакторинг коду нашого прикладу:

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
const [count, setCount] = useState(1);
const [person, setPerson] = useState(null);

useEffect(() => {
// 1. Оголошуємо асинхронну функцію
async function fetchCharacter() {
const response = await axios.get(`https://swapi.info/api/people/${count}`);
setPerson(response.data);
}
// 2. Викликаємо її одразу після оголошення
fetchCharacter();
}, [count]);

return (
<>

<h2>The count is {count}</h2>
<button onClick={() => setCount(count + 1)}>Get next character</button>
<pre>{JSON.stringify(person, null, 2)}</pre>
</>
);
}

🧠 За необхідності блок try...catch додаємо всередину асинхронної функції. Там же оновлюємо стан індикатора завантаження і помилки, тут нічого нового.

# Суворий режим

У наступному прикладі робимо логування рядка в ефекті з порожнім масивом залежностей.

import { useState, useEffect } from "react";

export default function App() {
const [clicks, setClicks] = useState(0);

useEffect(() => {
console.log("You can see me only once!");
}, []);

return (
<button onClick={() => setClicks(clicks + 1)}>
You clicked {clicks} times
</button>
);
};

Після монтування компонента ви побачите в консолі одне й те ж повідомлення двічі, а не один раз, і це нормально. Розберімося чому.

Це пов'язано з компонентом StrictMode, який в режимі розробки виконує ряд перевірок нашого коду.

// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
<StrictMode>
<App />
</StrictMode>
);

Окрім перевірок, суворий режим виконує подвійне монтування кожного компонента в додатку, щоб гарантувати стресостійкість нашого коду, особливо тієї його частини, де ми працюємо зі станом і його оновленням.

Отже, в режимі розробки будь-який компонент монтується двічі. Покроково запишемо цей алгоритм дій для нашого компонента App:

- Компонент App монтується вперше.
- Виконується ефект, і в консоль виводиться повідомлення.
- Компонент App розмонтується і видаляється з DOM.
- Компонент App монтується в DOM вдруге.
- Виконується ефект, і в консоль виводиться повідомлення.
- Компонент залишається в DOM і готовий до оновлень.

Саме тому ми бачимо повідомлення двічі. Це абсолютно нормально і в більшості випадків ніяк не впливає. Але є ситуації, коли подвійне монтування буквально допомагає виявити баги. Цим і займемося далі.

# Очищення ефектів

Отже, суворий режим (компонент StrictMode) в режимі розробки змушує кожний компонент монтуватися двічі (монтування > розмонтування > монтування).

Створимо компонент Timer який при монтуванні буде запускати інтервал для виведення повідомлення на екран і в консоль кожну секунду.

// src/Timer.tsx

import { useEffect, useState } from 'react';

export default function Timer() {
const [time, setTime] = useState(new Date());

useEffect(() => {
setInterval(() => {
setTime(new Date());
console.log(`Interval - ${Date.now()}`);
}, 1000);
}, []);

return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}

І використаємо його в компоненті App.

import Timer from './Timer';

export default function App() {
return (
<>
<Timer />
</>
);
}

На перший погляд, все буде працювати добре, але якщо подивитись в консоль, ми побачимо, що будуть запущені два інтервали замість одного:

- Компонент Timer монтується в DOM вперше.
- Виконується ефект і запускається інтервал.
- Компонент Timer розмонтується і видаляється з DOM.
- Компонент Timer монтується в DOM вдруге.
- Виконується ефект і запускається інтервал.
- Компонент залишається в DOM і готовий до оновлень.

Може здатися, що StrictMode заважає і, навпаки, руйнує нашу логіку, і ви будете праві. StrictMode говорить нам, що в разі розмонтування компонента ми не зупиняємо інтервал, що при повторних монтуваннях призводить до запуску все нових і нових інтервалів і, відповідно, витоку пам'яті.

Додамо в компонент App стан isOpen, який буде контролювати видимість компонента Timer.

// src/App.tsx

import { useState } from 'react';
import Timer from './Timer';

export default function App() {
const [isOpen, setIsOpen] = useState(false);

return (
<>
<button onClick={() => setIsOpen(!isOpen)}>
{isOpen ? 'Hide timer' : 'Show timer'}
</button>
{isOpen && <Timer />}
</>
);
}

Тепер ми побачимо що кожного разу при монтуванні таймера буде запускатися новий інтервал, і в консолі буде дуже багато повідомлень, а не одне кожну секунду. Це і є та сама проблема витоку пам'яті: ми не очищаємо інтервал при розмонтуванні компонента Timer.

💡 Подивіться приклад у редакторі – він демонструє, як усе працює разом.

## Функція очищення

Хук useEffect може оголошувати функцію очищення ефекту (cleanup), для цього з колбек-функції потрібно повернути ще одну функцію.

import { useEffect, useState } from 'react';

export default function App() {
const [count, setCount] = useState(0);

useEffect(() => {
console.log(`Effect ran for: ${count}`);

    	// Повертаємо функцію очищення ефекта
    return () => {
      console.log(`Clean up for ${count}`);
    };

}, [count]);

return (
<>
<button onClick={() => setCount(count + 1)}>Count is {count}</button>
</>
);
}

Якщо запустити цей код і переглянути консоль, то побачимо наступні повідомлення.

Суворий режим виконав подвійне монтування компонента:

- Монтування (ефект)
- Розмонтування (очищення)
- Монтування (ефект)

Далі при кожній зміні стану count ми побачимо те саме, але з оновленими значеннями:

Функція очищення запускається перед кожним наступним викликом ефекту і перед розмонтуванням компонента, тобто:

- Перший запуск ефекту.
- Очищення першого ефекту.
- Другий запуск ефекту.
- Очищення другого ефекту.
- Третій запуск ефекту.
- І так далі.

Тепер ми можемо виправити проблему з таймером, достатньо при розмонтуванні компонента очищати інтервал. Для цього зберігаємо ідентифікатор інтервалу в змінну і в функції очищення викликаємо clearInterval.

import { useEffect, useState } from 'react';

export default function Timer() {
const [time, setTime] = useState(new Date());

useEffect(() => {
// 1. Зберігаєм ідентифікатор інтервалу в змінну
const intervalId = setInterval(() => {
setTime(new Date());
console.log(`Interval - ${Date.now()}`);
}, 1000);

    return () => {
        // 2. Видаляємо інтервал за його id
      clearInterval(intervalId);
    };

}, []);

return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}

Ми ще не раз зустрінемось із необхідністю "почистити за собою", наприклад для того щоб зняти глобальні обробники подій для window або document.

# Модальне вікно

Модальне вікно (modal) – це елемент інтерфейсу, який накладається поверх усього контенту сторінки та вимагає взаємодії з ним, перш ніж користувач зможе повернутись до основного вмісту.

Приклади:

- Попап із зображенням.
- Підтвердження видалення.
- Форма зворотного зв’язку.
- Галерея зображень.

## Компонент модального вікна

Почнемо з простого компонента модалки. Спершу створимо сам компонент Modal.tsx, який відображатиме заголовок і текст:

// src/components/Modal.tsx
export default function Modal() {
return (

<div>
<h2>Modal Title</h2>
<p>This is some content inside the modal.</p>
</div>
);
}

Додаємо до App для перевірки. Ти побачиш модалку, але поки що вона виглядає як частина сторінки.

// src/components/App.tsx
import Modal from "./Modal";

export default function App() {
return (

<div>
<h1>Main content of the page</h1>
<Modal />
</div>
);
}

## Стилізація модального вікна

Тепер додамо стилі, які зроблять модалку схожою на справжнє вікно. Створимо файл стилів Modal.module.css:

/_ src/components/Modal.module.css _/

.backdrop {
position: fixed;
top: 0;
left: 0;
z-index: 9999;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
justify-content: center;
align-items: center;
}

.modal {
position: relative;
max-width: 90vw;
max-height: 90vh;
border-radius: 8px;
background-color: #fff;
padding: 24px;
}

backdrop – напівпрозорий фон, який затемнює основний вміст.
modal – власне вікно, яке зʼявляється по центру.

Оновимо компонент Modal.tsx, щоб використати ці стилі:

// src/components/Modal.tsx

import css from "./Modal.module.css";

export default function Modal() {
return (

<div className={css.backdrop}>
<div className={css.modal}>
<h2>Modal Title</h2>
<p>This is some content inside the modal.</p>
</div>
</div>
);
}

## Портали

Зараз ми вставляємо компонент прямо в DOM-дерево компонента App, але це може створити проблеми:

- Модалка може успадкувати стилі з батьківського компонента.
- Не буде ізольованості по верстці (наприклад, overflow: hidden у батька може обрізати модалку).
- Погана доступність.

Щоб уникнути цього, модалки в React майже завжди рендерять через Portal. Функція createPortal дозволяє рендерити компонент в інше місце DOM-дерева, зазвичай безпосередньо в <body>. Таким чином:

- Модалка не залежить від структури компонентів.
- Рендериться поверх усього.
- Гарантовано працює навіть в умовах вкладеності.

Оновимо Modal.tsx, щоб використати createPortal:

// src/components/Modal.tsx

import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export default function Modal() {
return createPortal(

<div className={css.backdrop}>
<div className={css.modal}>
<h2>Modal Title</h2>
<p>This is some content inside the modal.</p>
</div>
</div>,
document.body
);
}

Тепер незалежно від того, де в структурі компонентів ми використаємо <Modal /> – в HTML вона завжди зʼявиться в кінці body, поверх усього іншого.

## Кнопка закриття

Зазвичай у модальному вікні є кнопка закриття (хрестик у кутку). Ми передамо в компонент Modal функцію onClose, яку будемо викликати, коли користувач натисне кнопку.

// src/components/Modal.tsx

import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
return createPortal(

<div className={css.backdrop}>
<div className={css.modal}>
<button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
&times;
</button>

        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body

);
}

Додамо стилі кнопки до Modal.module.css:

/_ Modal.module.css _/

.closeButton {
position: absolute;
top: 8px;
right: 8px;
background: #fff;
border: none;
border-radius: 4px;
width: 32px;
height: 32px;
font-size: 20px;
line-height: 0;
color: #333;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
padding: 0;
}

.closeButton:hover {
background: #f2f2f2;
}

.closeButton:focus {
outline: 2px solid #007bff;
}

Оновимо код App і додамо логіку відображення модального вікна за допомогою стану.

import { useState } from 'react';
import Modal from './Modal';

export default function App() {
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);

const closeModal = () => setIsModalOpen(false);

return (

<div>
<h1>Main content of the page</h1>
<button onClick={openModal}>Open modal</button>
{isModalOpen && <Modal onClose={closeModal} />}
</div>
);
}

## Закриття по кліку на фон

Класичний UX-патерн: якщо користувач клацає за межами вікна – модалка закривається. Додаємо логіку кліку по бекдропу.

export default function Modal({ onClose }: ModalProps) {

const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
if (event.target === event.currentTarget) {
onClose();
}
};

return createPortal(

<div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
<div className={css.modal}>
<button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
&times;
</button>

        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body

);
}

Ми перевіряємо, чи користувач клацнув саме на фон (event.target === event.currentTarget), щоб випадково не закривати модалку при кліку всередині неї.

## Закриття по Escape

Ще один зручний спосіб закриття – клавіша Escape. Для цього нам потрібен ефект із прослуховуванням події keydown. Додаємо useEffect, а подію keydown підписуємо на document, тому що модалка вже відкрита і не обов’язково в фокусі.

export default function Modal({ onClose }: ModalProps) {
const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
if (event.target === event.currentTarget) {
onClose();
}
};

useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (e.key === "Escape") {
onClose();
}
};
document.addEventListener("keydown", handleKeyDown);
return () => {
document.removeEventListener("keydown", handleKeyDown);
};
}, [onClose]);

return createPortal(

<div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
<div className={css.modal}>
<button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
&times;
</button>

        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body

);
}

## Заборона прокрутки фону

Коли модалка відкрита, сторінка не повинна скролитись. Додаємо у useEffect код блоквання скролу при відкритті модалки та повертаємо його після закриття.

useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (e.key === "Escape") {
onClose();
}
};
document.addEventListener("keydown", handleKeyDown);
document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };

}, [onClose]);

## Повторне використання

Модальне вікно - це класичний приклад компонента, який може бути використаний повторно у різних частинах додатку. Замість того, щоб писати окрему модалку для кожної ситуації, ми можемо створити один компонент, який буде приймати різний внутрішній контент.

<Modal>
  <h2>Custom Modal Content</h2>
  <p>This JSX will be passed as children prop</p>
</Modal>

Будь який контент між відкриваючим та закриваючим тегом компонента буде передано як children - спеціальний службовий пропс, що дозволяє передавати дочірні елементи (компоненти або JSX) в компонент. Це дає змогу зробити компонент максимально гнучким.

Таким чином ми можемо створити один компонент модального вікна, яке буде відображати різний вміст в залежності від того, що ми передаємо в children.

Для типізації пропса children використовуємо стандартний тип React.ReactNode, який описує будь-який вміст, що може бути переданий в компонент: елементи, рядки, числа, масиви елементів або навіть інші компоненти.

interface ModalProps {
children: React.ReactNode;
}

Доповнимо компонент модального вікна так, щоб використовувати children для рендеру вмісту.

// src/components/Modal.tsx

import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
onClose: () => void;
// Додаємо пропс children і типізуємо його
children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
/_ Решта коду _/
return createPortal(

<div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
<div className={css.modal}>
<button className={css.closeButton} onClick={onClose} aria-label="Close modal">
&times;
</button>
{/_ Тут рендериться переданий вміст із пропса children _/}
{children}
</div>
</div>,
document.body
);
}

Тепер можемо використовувати компонент Modal в різних частинах додатку і передавати в нього різний контент, не створюючи новий компонент для кожної ситуації.

import { useState } from 'react';
import Modal from './Modal';

export default function App() {
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);

const closeModal = () => setIsModalOpen(false);

return (

<div>
<h1>Main content of the page</h1>
<button onClick={openModal}>Open modal</button>
{isModalOpen && (
<Modal onClose={closeModal}>
<h2>Custom Modal Content</h2>
<p>This is a reusable modal with dynamic content.</p>
</Modal>
)}
</div>
);
}

Тепер у нас повноцінне, доступне, реюзабельне, типізоване модальне вікно з підтримкою клавіатури та стилями.

# Робота з LocalStorage

У React-додатках часто потрібно зберігати дані між сесіями користувача: обрані фільтри, налаштування теми, останній пошук тощо. Для цього використовують localStorage – вбудоване сховище браузера.

Розглянемо приклад – кнопка, яка підраховує кліки. При перезавантаженні сторінки лічильник має зберігатися.

import { useState } from "react";

export default function App() {
const [clicks, setClicks] = useState(0);

return (

<div>
<button onClick={() => setClicks(clicks + 1)}>
You clicked {clicks} times
</button>
<button onClick={() => setClicks(0)}>Reset</button>
</div>
);
}

## Запис у LocalStorage

Кожного разу, коли значення clicks змінюється – ми можемо зберігати його в localStorage за допомогою useEffect.

import { useState, useEffect } from "react";

export default function App() {
const [clicks, setClicks] = useState(0);

useEffect(() => {
localStorage.setItem("saved-clicks", JSON.stringify(clicks));
}, [clicks]);

return (

<div>
<button onClick={() => setClicks(clicks + 1)}>
You clicked {clicks} times
</button>
<button onClick={() => setClicks(0)}>Reset</button>
</div>
);
}

🧠 Навіть якщо clicks – це число, ми все одно використовуємо JSON.stringify() для уніфікації підходу. Це допоможе уникнути плутанини в більш складних структурах.

## Зчитування з LocalStorage

Нам потрібно зчитати збережене значення при першому рендері компонента. Для цього використовуємо форму useState(() => {}), яка дозволяє виконати код перед ініціалізацією стану.

В цій функції можна виконати додатковий код, наприклад, читання з локального сховища!

const [clicks, setClicks] = useState(() => {
// Зчитуємо значення за ключем
const savedClicks = window.localStorage.getItem("saved-clicks");

    // Якщо там щось є, повертаємо це

// значення як початкове значення стану
if (savedClicks !== null) {
return JSON.parse(savedClicks);
}

    // У протилежному випадку повертаємо
    // яке-небудь значення за замовчуванням

return 0;
});

# Декілька ефектів

У компоненті можна використовувати скільки завгодно useEffect. Кожен useEffect спрацьовує окремо, залежно від своїх залежностей. Це дозволяє розділяти логіку за призначенням, і не писати все в один великий ефект.

Наприклад, додамо до компонента три ефекти які будуть запускатись відповідно до вказаних залежностей і незалежно від інших.

import { useState, useEffect } from "react";

export default function App() {
const [clicks, setClicks] = useState(0);

// 1. Тільки один раз після монтування
useEffect(() => {
console.log("You can see me only once!");
}, []);

// 2. Кожного разу, коли змінюється clicks
useEffect(() => {
console.log("Clicks updated:", clicks);
}, [clicks]);

// 3. При кожному рендері (бо без залежностей)
useEffect(() => {
document.title = `You clicked ${clicks} times`;
});

return (
<button onClick={() => setClicks(clicks + 1)}>
You clicked {clicks} times
</button>
);
}

Якщо в компоненті є кілька значень стану, ефекти можуть відстежувати кожне значення окремо або всі разом.

import { useState, useEffect } from "react";

export default function App() {
const [first, setFirst] = useState(0);
const [second, setSecond] = useState(0);

useEffect(() => {
console.log("First updated:", first);
}, [first]);

useEffect(() => {
console.log("Second updated:", second);
}, [second]);

useEffect(() => {
console.log("First or second updated:", first + second);
}, [first, second]);

return (
<>
<button onClick={() => setFirst(first + 1)}>First: {first}</button>
<button onClick={() => setSecond(second + 1)}>Second: {second}</button>
</>
);
}

## Що важливо знати про ефекти

- Кожен useEffect виконується після монтування компонента.
- Якщо ви вказали залежності – ефект також буде виконуватись при кожній зміні цих значень.
- Завжди вказуйте точні залежності – ESLint підкаже, якщо щось забудете.
- Ви можете використовувати декілька useEffect в одному компоненті – це навіть рекомендовано, якщо логіка ефектів різна.

🧠 Розділення ефектів за призначенням – це частина добре структурованого React-коду.
