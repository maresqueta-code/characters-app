## Characters App v1.0.2

### Author: Marcos Luis Aresqueta

`git@github.com:maresqueta-code/characters-app.git`

## Idiomas

- [Spanish version](README.md)
- [English version](README.en.md)

## Table Content

- [Description](#description)
- [Architecture](#architecture)
- [Stack](#stack)
- [Local Deployment](#local-deployment)
- [Tests](#tests)
- [Build for Production & Serve](#build-for-production--serve)
- [License](#license)

## Description

Character App (MVP) is a functional app that follows the specification and design provided in the PDF file [Technical Evaluation] (prueba-tecnica-ioplogistica.pdf), applying Clean Architecture and SOLID principles.
The functional components, even those that provide animations were developed from scratch with standard `CSS`. No component library was used.
At the time of developing the integration with the `API` it was not possible to generate `Marvel`'s `API key`, so the alternative `Dragon Ball`'s `API` was used that is indicated in the [Technical Evaluation] (prueba-tecnica-ioplogistica.pdf). Anyway, since the UX design is intended for `Marvel`'s universe, the `Marvel` logo was kept in the `Header` and the title `Comics` in the detail view of a character so that it is faithful to `Figma`'s design. Regarding `Accessibility` and `Good practices`, the `App` was audited at `localhost` with `Chrome Devtools`'s `Lighthouse` utility both, in `Desktop` and `Mobile` modes. The result was `100%`.

The most up-to-date repository branch is `main` and the tag `v1.0.2`.

The App is deployed and accessible in `Vercel` at https://characters-marcos.vercel.app/

### Compatibility

Although the project was tested using `node version = 20` and `yarn`, it should work with `npm`, `pnpm` or other package managers. Simply replace `yarn` with the package manager of your choice when you run the scripts.

### Future improvements

Although there is still room for improvement, due to time constraints, I understand that the project is already in a decent state to be released as a Demo. I look forward to your comments. Let me know in case you are interested in more details in the `README.md` or something that requires clarification.

# Architecture

Among the benefits of applying `Clean Architecture` are:

- Modularity: The responsibilities are clearly separated, which facilitates the maintenance and scalability of the project.
- Testability: The different layers are decoupled, which facilitates unit and integration tests.
- Reuse: Use cases (such as `custom hooks` in `React`) and repositories can be reused in different parts of the application, or even in different projects.
- Flexibility: You can change the implementation of the infrastructure (for instance, change the `API` or the `Database`) without having to modify the business logic or The UI.

The application of `Clean Architecture` is achieved by dividing the code into layers with well-defined responsibilities. The following is the proposed structure for this particular project using `React` in the Frontend:

```
src/
├── __mocks__/                  # Mocked entities
├── __tests__/                  # Unit tests
├── assets/                     # Static assets (favicon, images)
├── application/                # Application-specific logic (custom hooks, stores)
│ ├── stores/                   # FE specific state managers (e.g. filterSore, favouritesStore)
│ └── hooks/                    # Custom hooks that orchestrate business logic, global state, etc.
├── domain/                     # Domain-specific logic
│ ├── mappers/                  # Data transformers from DTOs to model entities
│ └── models/                   # App's internal types (could be even normalized)
├── infrastructure/             # External services (API calls, cache management, local storage setup)
│ ├── api/                      # Fetch logic for external APIs (e.g. characterRepository)
│ ├── react-query/              # React-query configuration (e.g. QueryClient)
│ └── persistence/              # Utilities to manage persistence (e.g. browser's localStorage)
├── presentation/               # React components, pages, routing
│ ├── components/               # Presentational reusable UI components (functional components)
│ ├── hooks/                    # Custom hooks which manages UI logic, local state
│ ├── pages/                    # Pages, Layouts and main Views
| ├── locales/                  # Translations used only in the UI
| ├── styles/                   # CSS styles
| └── routes/                   # App routes
├── App.tsx                     # Main UI functional component
└── main.tsx                    # Entry point

```

Although the structure is clear and sufficient for the current project, if it grows it is convenient to continue applying strategies such as the following to maintain the organization, modularity and scalability of the project:

- if `infrastructure/` grows due to multiple services or data sources, group them by `Bounded Contexts`. Organize them in subfolders based on specific domain contexts with descriptive names, for example `auth/`, etc.

- if `ui/components/` grows then divide it by categories, group the functional components according to their nature or specific Domain issues (for instance `character/`, `transformations/`) or if they are reusable generic components (for example `common/`).

- if `ui/pages/` grows then group the pages into modules or contexts, for instance, separate the layouts in a new `layouts/` folder.

- if `application/hooks/` grows then divide the custom hooks into folders according to the domain or their functionality (for instance `auth/`, `character/`, etc.), or separate the hooks related to `react-query`.

### application

The `application/` directory is used as a dedicated layer to coordinate functional logic and data sources that interact directly with the user interface, but in a modular and reusable way.

This layer provides a lightweight abstraction that centralizes the interaction logic with the functional components and the shared state in reusable `hooks` to avoid redundancies and keep the functional components focused on the presentation. Simplifies data consumption (through `hooks` with `react-query`) and the shared state management of the Search Filters or the Favorites list, both implemented with `zustand` that are specific to the Frontend and its actions to update that state.

It was decided not to create a `useCases` folder since the hooks in `React` are a natural and efficient way to implement use cases in functional applications. Each custom hook represents and encapsulates a use case in itself.

### domain

The `domain/` folder is the layer that defines how the data is represented internally in the App, decoupling them from how they arrive from the `infrastructure`. The above avoids direct dependencies of the infrastructure in the `presentation` layer, facilitating unit tests and minimizing the changes required in the code if, for instance, the API changes. In this layer are defined:

- the Domain logic, non-existent in this project due to the scope and simple nature of it;
- the Domain entities located in the `domain/model/` folder;
- the mapppers or transformers in the `domain/model/` folder that convert the `DTOs` obtained from the infrastructure into the entities.

### infrastructure

The `infrastructure/` directory is the layer that contains the concrete implementation of the repositories, external dependencies, such as the `HTTP API`, `localStorage`, etc. This folder contains:

- the `react-query` client that acts as the infrastructure to manage the data cache, implements the retry logic, the 24-hour expiration time;
- the `characterRepository` repository responsible for making the `HTTP` requests to the `API`;
- the utilities to persist and retrieve information from browser `localstorage`.

### presentation (UI)

The `presentation/` folder is the layer that contains the user interface (`UI`), whose main purpose is to group and organize all the parts directly related to the presentation and navigation of the App. This approach provides a clear structure that separates the concerns of the visual interface from other layers, such as business logic or data access.

The `UI` only interacts with the use cases in the `application` layer through `hooks`. The data shown is obtained through `hooks`, `stores` or, to a lesser extent, by props that come from the `application` layer. The `UI` must not contain business logic or make direct calls to external services.

This folder contains:

- `components/` with the functional components of `React` that are reusable units of the `UI`, independent of the business logic.
- `pages/` with the pages and layouts of the App that the components use and that relate to the routing.
- `routes/` that determine which pages, layout and views should be shown to the user.

### tests

`__tests__` directory contains the test layer. For tests development, `react-testing-library`, `vitest` and on the other hand, `msw` were used to mock the API responses.

## Stack

### React 18

It offers significant enhancements in performance, user experience, and developer productivity through concurrent rendering, automatic batching, and new hooks to the already known ones. The version 18 of `React` automatically catches more errors during rendering, providing better error boundaries and more resilient applications.

### @tanstack/react-query 5

The App was integrated to `react-query` in an effort to improve the performance and the interaction between the App and the REST API. It leverages a powerful set of tools for managing server state, improving data fetching efficiency, and enhancing the overall user experience. `react-query` provides features like automatic caching, background synchronization, and robust error handling. When defining the `queryClient` the necessary setup is provided to leverage a 24 hours cache for each request with a different key and thus considerably improve the performance of the application.

### Browser Local Storage

Utilities are provided to persist data in the `localStorage` of the browser. They are used by the `react-query` state cache and by the list of favorites of the `zustand` store. Because of this, the data is kept after closing the browser when the App is accessed again from the same browser. In the case of `react-query` the local storage is overwritten when the cached queries of `react-query` are invalidated (after 24 hours) to then obtain current data. To manually remove the persisted cache in `localstorage`, go to `devtools` -> `Application` tab -> `Storage` section and manually delete the key-value pairs:

- `characters-cache`;
- `favourites`.

If you want to validate that the API calls are made in a timely manner, in `src/infrastructure/react-query/reactQueryConstants.ts` update `CACHE_TIME` from 24 hours to 1 minute as indicated below:

```javascript
// CACHE_TIME: 1000 * 60 * 60 * 24, // a whole day
CACHE_TIME: 1000 * 60, // just a minute
```

After the previous step, check that the API calls are repeated in the expected time threshold with some of the following alternatives:

#### a) Network tab

1. Go to `devtools` -> `Network` tab -> filter by `Fetch/XHR`.

2. Every minute a new entry to the call API is displayed.

#### b) Local storage

1. Go to `devtools` -> `Application` tab -> `Storage` section -> `Local storage` -> click on `http://localhost:5173`.

2. Click on `characters-cache` key and unfold the object `queryKey: ["characters"]`.

3. Every minute the properties `state.dataUpdatedAt` and `state.dataUpdatedCount` should be updated.

#### c) Set a console.log before fetching

1. In `src/infrastructure/api/characterRepository.ts` add a console.log before the `fetch` function:

```javascript
const currentTime = new Date();
const hh = String(currentTime.getHours()).padStart(2, '0');
const mm = String(currentTime.getMinutes()).padStart(2, '0');
console.log(`getAll call: ${hh}:${mm}`);
```

2. Every minute the new call to the API should be observed as follows:

```
getAll call: 13:18
getAll call: 13:19
getAll call: 13:20
```

### zustand

It was used to manage the states to provide the filtering feature. `zustand` is a library based on hooks that provides a minimal and straightforward API for state management with no boilerplate. It offers flexibility since it can be used alongside other state management solutions or on its own, offering in managing application state. It provides efficient state updates with minimal re-renders which improves app performance. It scales well with application size, allowing you to manage global, shared, and local states effortlessly.

### react-router-dom 6

This library adds and enhances the routing capabilities of React apps by offering a declarative, flexible, and robust routing solution. Its features like dynamic and nested routing, URL parameter handling, and seamless integration with React hooks make it a powerful tool for managing navigation in `SPA`s (Single Page Apps).

### msw

`Mock Service Worker` is a very versatile API simulation library for both Frontend and Backend browser environments with `Node.js`. It works by intercepting HTTP requests at the network level, providing a flexible and powerful way to simulate APIs during development and testing.

### Vite

The core build tool.

### CSS

Style management is applied with standard `CSS`, following a modular and scalable structure:

#### Global variables

Located in the file `presentation/styles/variables.css` to maintain consistency by defining centralized and reusable variables of colors, fonts, and spacing, etc. It provides ease for customization and maintenance.

#### Global styles

They are found in `presentation/styles/global.css`, where styles are normalized and base configurations are applied to avoid style duplication in the rest of the App's `CSS` files.

#### Styles by component

Each functional component imports its own `.css` file when specific customization is required. Descriptive names are used to keep clarity. If the application grows it would be convenient to apply `BEM` to maintain even greater consistency of names as shown below:

- Block: The main component, e.g.:

```
.button {
  background: blue;
  color: white;
  padding: 10px;
}
```

- Element: A part inside the block, for instance:

```
.button__icon {
  margin-right: 5px;
}
```

- Modifier: Block or Element variants, for example:

```
.button--secondary {
  background: white;
}
```

- To then use it as follows:

```
<button className="button button--secondary">
  <span className="button__icon">😊</span>Click
</button>
```

#### Modular import

Each component styles are imported locally within its respective `.tsx` file to avoid global conflict.

### PostCSS

For handling CSS transformations.

### Autoprefixer

A `PostCSS` plugin to add browser vendor prefixes.

### CSS Minifier

`Vite` uses `esbuild` for minification out of the box, but you can configure additional CSS optimization if needed.

### Typescript

It provides multiple benefits to a `Javascript` code base:

- Static typing: Avoids errors before executing the code;
- Autocomplete and suggestions: Improves the experience in the editor;
- Detects errors in development time: Reduces bugs in `Production`;
- Cleaner and more maintainable code: Facilitates collaboration in large teams;
- Compatibility with `JavaScript`: It can be adopted progressively;
- Interfaces and custom types: Defines clear structures for objects and functions;
- Better refactoring: Allows you to rename variables or functions without breaking the code;
- Improves code security: Reduces errors due to unexpected values;
- Great community and support.

## Local Deployment

Since there's no API key in .env files, they were commited to the project to make easier to run it without adding any setup.

### 1.a) Clone the repository from GitHub `git@github.com:maresqueta-code/characters-app.git`:

```bash
git clone https://github.com/maresqueta-code/characters-app.git
```

### 1.b) Otherwise go to https://github.com/maresqueta-code/haracters-app.git , download and unzip it.

### 2. Once you have the repository, move into the project folder:

```bash
cd characters-app
```

### 3. Install the project dependencies

From now on, the scripts are provided in `package.json` to continue. To install the libs and their dependencies run:

```bash
yarn install
```

o

```
npm install
```

o

```
pnpm install
```

### 4. Start the App

To start the App at localhost, open a new terminal and run:

```bash
yarn dev
```

or

```bash
yarn run dev
```

The server with the App should be started at (the port could be different if 5173 already being used):

#### http://localhost:5173/

## Tests

### 1. Run the tests once

The tests developed to add coverage to the App use:

- `Vitest`, a testing framework that integrates well with `Vite`;
- `React Testing Library`, a light-weight API to test `React` functional components.

To execute the tests just once and get the coverage report in the terminal, open a new terminal and run:

```bash
yarn test
```

or

```bash
yarn run test
```

The current coverage report for the project is the following:

```
-----------------------------------------------------|---------|----------|---------|---------|-------------------
File                                                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                            |   96.27 |     74.5 |   86.66 |   96.27 |
 __mocks__                                           |     100 |      100 |     100 |     100 |
  characterDTO.ts                                    |     100 |      100 |     100 |     100 |
  characters.ts                                      |     100 |      100 |     100 |     100 |
  transformationDTO.ts                               |     100 |      100 |     100 |     100 |
  transformations.ts                                 |     100 |      100 |     100 |     100 |
  translations.ts                                    |     100 |      100 |     100 |     100 |
 application/hooks                                   |   87.87 |    66.66 |     100 |   87.87 |
  useGetCharacter.ts                                 |   88.23 |    66.66 |     100 |   88.23 | 14-15
  useGetCharacterList.ts                             |    87.5 |    66.66 |     100 |    87.5 | 13-14
 application/stores                                  |   76.19 |      100 |       0 |   76.19 |
  favouritesStore.ts                                 |      68 |      100 |       0 |      68 | 16-23
  filterStore.ts                                     |   88.23 |      100 |       0 |   88.23 | 14-15
 domain/mappers                                      |     100 |      100 |     100 |     100 |
  characterMapper.ts                                 |     100 |      100 |     100 |     100 |
  transformationMapper.ts                            |     100 |      100 |     100 |     100 |
 infrastructure/api                                  |   93.93 |       40 |     100 |   93.93 |
  apiConstants.ts                                    |     100 |        0 |     100 |     100 | 1
  characterRepository.ts                             |   92.85 |       50 |     100 |   92.85 | 11,23
 infrastructure/persistence                          |   82.05 |       75 |     100 |   82.05 |
  localStorage.ts                                    |      80 |       75 |     100 |      80 | 15-16,24-26,33-34
  localStorageKeys.ts                                |     100 |      100 |     100 |     100 |
 presentation/components/common/Animate              |   97.72 |    33.33 |     100 |   97.72 |
  Animate.tsx                                        |   97.72 |    33.33 |     100 |   97.72 | 31
 presentation/components/common/FavouriteCounter     |     100 |      100 |     100 |     100 |
  FavouriteCounter.tsx                               |     100 |      100 |     100 |     100 |
 presentation/components/common/FilterInput          |     100 |    66.66 |     100 |     100 |
  FilterInput.tsx                                    |     100 |    66.66 |     100 |     100 | 34
 presentation/components/common/IconInput            |     100 |      100 |     100 |     100 |
  IconInput.tsx                                      |     100 |      100 |     100 |     100 |
 presentation/components/common/ImageLink            |     100 |      100 |     100 |     100 |
  ImageLink.tsx                                      |     100 |      100 |     100 |     100 |
 presentation/components/common/ToggleButton         |     100 |      100 |     100 |     100 |
  ToggleButton.tsx                                   |     100 |      100 |     100 |     100 |
 presentation/components/common/icons-factory        |     100 |      100 |     100 |     100 |
  Heart.tsx                                          |     100 |      100 |     100 |     100 |
  MagnifyingGlass.tsx                                |     100 |      100 |     100 |     100 |
  WireHeart.tsx                                      |     100 |      100 |     100 |     100 |
  index.ts                                           |     100 |      100 |     100 |     100 |
 presentation/components/detail-content/Carousel     |     100 |      100 |     100 |     100 |
  Carousel.tsx                                       |     100 |      100 |     100 |     100 |
 presentation/components/main-content/CharacterCount |     100 |      100 |     100 |     100 |
  CharacterCount.tsx                                 |     100 |      100 |     100 |     100 |
 presentation/components/main-content/CharacterList  |     100 |      100 |     100 |     100 |
  CharacterList.tsx                                  |     100 |      100 |     100 |     100 |
 presentation/components/main-content/ImageFooter    |     100 |       50 |      50 |     100 |
  ImageFooter.tsx                                    |     100 |       50 |      50 |     100 | 15
 presentation/hooks                                  |   95.23 |       75 |     100 |   95.23 |
  useFilterInput.ts                                  |   92.85 |      100 |     100 |   92.85 | 8
  useLang.ts                                         |     100 |       50 |     100 |     100 | 3
 presentation/locales                                |     100 |      100 |     100 |     100 |
  en.ts                                              |     100 |      100 |     100 |     100 |
-----------------------------------------------------|---------|----------|---------|---------|-------------------
```

### 2. Tests in watch mode

To execute the tests in `watch` mode and get the coverage report in the terminal, run:

```bash
yarn test:watch
```

or

```bash
yarn run test:watch
```

### 3. Tests in Vitest UI

To execute the tests in `watch` mode, and start the local server with `Vitest` UI that allows to:

- manage and navigate through the tests and the source code;
- get the coverage details;
- see the error stack output as it is shown in the terminal.

Run:

```bash
yarn test:ui
```

or

```bash
yarn run test:ui
```

## Eslint and Prettier

### 1. ESLint

`ESLint` allows to check the `.ts` and `.tsx` files so that the linting process fails if there are any warnings. To do so run:

```bash
yarn lint
```

or

```bash
yarn run lint
```

### 2. Prettier

The following script formats all supported files in your project according to `Prettier`'s rules:

```bash
yarn format
```

or

```bash
yarn run format
```

### 3. All checks together

The following script is a way to run all your quality checks in a go. This script will ensure that your code is linted, formatted, and all the developed tests pass before proceeding. By combining these tasks into a single command, you can enforce a consistent code quality standard across the project:

#### If your package manager is `yarn` then run:

```bash
yarn run checks
```

#### If your package manager is `npm` then run:

```bash
yarn run checks:npm
```

## Build for Production & Serve

### 1. Build

Running the following script builds a `Vite`-based `SPA` for `Production`:

```bash
yarn build
```

or

```bash
yarn run build
```

The `production`-ready bundle by default is located in the `dist` directory including `CSS` minification and browser vendor-prefix handling.

### 2. Serve

Once the build is done, in order to serve the static files from the `dist` directory using a local web server run:

```bash
yarn serve
```

or

```bash
yarn run serve
```

As result, the App served from the static files will be accessible at:

#### http://localhost:4173/

This script serves the built `production` files locally. This is useful e.g. to test the final build before deploying it to a `Production` environment.

## License

characters-app is distributed as it is under the [MIT License](LICENSE).
