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

Character App (MVP) es una app funcional que sigue la especificación y diseño provistos en el fichero PDF [Evaluación Técnica](prueba-tecnica-ioplogistica.pdf), aplicando Clean Architecture y principios SOLID.
Los componentes funcionales, incluso los que proveen animaciones se desarrollaron desde cero con `CSS` estándar. No se utilizó ninguna librería de componentes.
Al momento de desarrollar la integración con la `API` no fue posible generar la `API key` de `Marvel`, por lo que se utilizó la `API` alternativa de `Dragon Ball` que se indica en la [Evaluación Técnica](prueba-tecnica-ioplogistica.pdf). De todos modos, dado que los diseños son para el universo de `Marvel`, se mantuvo el logo de `Marvel` en el `Header` y el título `Comics` en la vista de detalles de un personaje para que sea fiel a los diseños en `Figma`.
Respecto a la `Accesibilidad` y `Buenas prácticas`, la `App` se auditó en `localhost` con la utilidad `Lighthouse` de `Chrome Devtools` en modos `Desktop` y `Mobile`. El resultado fue de `100%`.

El branch del repositorio es `main` y el tag `v1.0.2`.

La App se encuentra desplegada y accesible en Vercel en https://characters-marcos.vercel.app/

### Compatibility

Aunque el proyecto se probó usando `node version = 20` y `yarn`, debería funcionar con `npm`, `pnpm` u otros package managers. Simplemente reemplazar `yarn` por el administrador de su elección cuando ejecute los scripts.

### Future improvements

Si bien aún existe margen de mejora, debido a las limitaciones de tiempo, entiendo que el proyecto ya se encuentra en un estado decente para ser liberado como Demo. Quedo a la espera de sus comentarios. Hacedme saber en caso que os interese mayor detalle en el `README.md` o algo requiera clarificación.

## Architecture

Entre los beneficios de aplicar `Clean Architecture` se pueden destacar:

- Modularidad: Las responsabilidades están claramente separadas, lo que facilita el mantenimiento y la escalabilidad del proyecto.
- Testabilidad: Las diferentes capas están desacopladas, lo que facilita las pruebas unitarias y de integración.
- Reutilización: Los casos de uso (como `custom hooks` en `React`) y repositorios pueden ser reutilizados en diferentes partes de la aplicación, o incluso en diferentes proyectos.
- Flexibilidad: Se puede cambiar la implementación de la infraestructura (por ejemplo, cambiar la `API` o la `Base de Datos`) sin tener que modificar la lógica de negocio o la UI.

La aplicación de `Clean Architecture` se logra dividiendo el código en capas con responsabilidades bien definidas. A continuación, se muestra la estructura propuesta para este proyecto en particular utilizando `React` en el Frontend:

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

Aunque la estructura es clara y suficiente para el proyecto actual, si el mismo crece es conveniente continuar aplicando estrategias como las siguientes para mantener la organización, modularidad y escalabilidad del proyecto:

- si `infrastructure/` crece debido a múltiples servicios o fuentes de datos, agruparlas por `Bounded Contexts` (Contexto de Dominio). Organizarlas en subcarpetas basadas en contextos específicos del dominio con nombres descriptivos, por ejemplo `auth/`, etc.

- si `ui/components/` crece dividir por categorías, agrupar los componentes funcionales según su naturaleza o cuestiones especificas de Dominio (por ejemplo `character/`, `transformations/`) o por si son componentes genéricos reusables (por ejemplo `common/`).

- si `ui/pages/` crece agrupar las páginas en módulos o contextos, por ejemplo, separar los layouts en una nueva carpeta `layouts/`.

- si `application/hooks/`crece dividir los custom hooks en carpetas según el dominio o funcionalidad (por ejemplo `auth/`, `character/`, etc.), o separar aparte los hooks relacionados con `react-query`.

### application

El directorio `application/` se utiliza como una capa dedicada a coordinar la lógica funcional y las fuentes de datos que interactúan directamente con la interfaz de usuario, pero de manera modular y reutilizable.

Esta capa provee una abstracción liviana que centraliza la lógica de interacción con los componentes funcionales y el estado compartido en `hooks` reutilizables para evitar redundancias y mantener los componentes funcionales enfocados en la presentación. Simplifica el consumo de datos (mediante `hooks` con `react-query`) y el manejo del estado compartido de los Filtros de búsqueda o el listado de Favoritos, ambos implementados con `zustand` que son específicos del Frontend y sus acciones para actualizar dicho estado.

Se optó por no crear una carpeta `useCases` ya que los hooks en `React` son una forma natural y eficiente de implementar casos de uso en aplicaciones funcionales. Cada custom hook representa y encapsula un caso de uso en si mismo.

### domain

La carpeta `domain/` es la capa que define cómo se representan los datos internamente en la App, desacoplándolos de cómo llegan desde la `infrastructure`. Lo anterior evita dependencias directas de la infraestructura en la capa de `presentation`, facilitando las pruebas unitarias y minimizando los cambios requeridos en el código si, por ejemplo, la API cambia.
En esta capa se definen:

- la lógica de dominio, inexistente en este proyecto debido al alcance y la naturaleza simple del mismo;
- las entidades del dominio ubicados en `domain/model/`;
- los transformadores o mapppers en `domain/model/` que convierten los `DTOs` obtenidos de la infraestructura en las entidades.

### infrastructure

El directorio `infrastructure/` es la capa que contiene la implementación concreta de los repositorios, las dependencias externas, como la `API HTTP`, `localStorage`, etc. Esta carpeta contiene:

- el cliente de `react-query` que actúa como la infraestructura para administrar la cache de datos, implementa la lógica de reintentos, el tiempo de expiración de 24 horas;
- el repositorio `characterRepository` responsable de efectuar las peticiones `HTTP` a la `API`;
- las utilidades para persistir y recuperar información desde el `localstorage` del navegador.

### presentation (UI)

La carpeta `presentation/` es la capa que contiene la interfaz de usuario (`UI`), cuyo propósito principal es agrupar y organizar todas las partes relacionadas directamente con la presentación y navegación de la App. Este enfoque proporciona una estructura clara que separa las preocupaciones de la interfaz visual respecto a otras capas, como la lógica de negocio o acceso a datos.
La `UI` solo interactúa con los casos de uso en la capa de `application` a través de `hooks`. Los datos mostrados se obtienen a través de `hooks`, `stores` o, en menor medida, por props que provienen de la capa `application`. La `UI` no debe contener lógica de negocio ni realizar llamadas directas a servicios externos.

Esta carpeta contiene:

- `components/` con los componentes funcionales de `React` que son unidades reutilizables de la `UI`, independientes de la lógica de negocio.
- `pages/` con las páginas y layouts de la App que utilizan los componentes y que se relacionan con el enrutamiento.
- `routes/` que determinan qué páginas, layout y vistas se deben mostrar al usuario.

### tests

Este directorio contiene la capa de pruebas.

Para el desarrollo de las pruebas se utilizaron `react-testing-library`, `vitest` y por otra parte, `msw` para los mocks de las respuestas de la API.

## Stack

### React 18

Ofrece mejoras significativas en el rendimiento, la experiencia de usuario y la productividad a través del concurrent rendering, batch automático y nuevos hooks además de los ya conocidos. La versión 18 de `React` detecta automáticamente más errores durante el rendering, proporcionando mejor manejo de errores y aplicaciones más confiables.

### tanstack/react-query 5

La aplicación se integró con `react-query` en un esfuerzo por mejorar el rendimiento y la interacción entre la App y la API REST, por sólo mencionar uno de sus beneficios. Provee un potente conjunto de herramientas para administrar el estado del servidor, mejorar la eficiencia de la recuperación de datos y mejorar la experiencia general del usuario. `react-query` proporciona características como el almacenamiento en caché automático, la sincronización en segundo plano y el manejo robusto de errores. Se crea un `queryClient` donde se especifa la configuración necesaria para proveer por ejemplo, una cache por 24 hs de cada request cuya clave sea diferente y asi mejorar considerablemente la performance de la aplicación luego de la carga inicial.

### Browser Local Storage

Se proveen utilidades para persistir datos en el `localStorage` del navegador. Las mismas son utilizadas por la caché de estado de `react-query` y por el listado de favoritos de la store de `zustand`. Debido a esto, los datos se mantienen después de cerrar el navegador cuando se vuelve a acceder a la App desde el mismo navegador.
En el caso de `react-query` el almacenamiento local se sobreescribe cuando las consultas en caché de `react-query` se invalidan (después de 24 horas) para luego obtener datos actuales.
Para eliminar manualmente la caché persistente en `localstorage`, ir a `devtools` -> pestaña `Application` -> sección `Storage` y eliminar manualmente los pares clave-valor:

- `characters-cache`;
- `favourites`.

Si se desea validar que los llamados a la API se efectúan en tiempo y forma, en `src/infrastructure/react-query/reactQueryConstants.ts` actualizar `CACHE_TIME` de 24 horas a 1 minuto como se indica a continuación:

```javascript
// CACHE_TIME: 1000 * 60 * 60 * 24, // a whole day
CACHE_TIME: 1000 * 60, // just a minute
```

Luego del paso anterior, chequear que los API calls se repiten en el umbral de tiempo esperado con algunas de las siguientes alternativas:

#### a) Network tab

1. Ir a `devtools` -> pestaña `Network` -> filtrar por `Fetch/XHR`.

2. Cada un minuto se muestra una nueva entrada a la API call.

#### b) Local storage

1. Ir a `devtools` -> pestaña `Application` -> sección `Storage` -> `Local storage` -> click en `http://localhost:5173`.

2. Click en la key `characters-cache` y desplegar el objeto `queryKey: ["characters"]`.

3. Cada un minuto se deben actualizar las properties `state.dataUpdatedAt` y `state.dataUpdatedCount`.

#### c) Set a console.log before fetching

1. En `src/infrastructure/api/characterRepository.ts` agregar un console.log antes de la función `fetch`:

```javascript
const currentTime = new Date();
const hh = String(currentTime.getHours()).padStart(2, '0');
const mm = String(currentTime.getMinutes()).padStart(2, '0');
console.log(`getAll call: ${hh}:${mm}`);
```

2. Cada un minuto se debe observar el nuevo llamado a la API:

```
getAll call: 13:18
getAll call: 13:19
getAll call: 13:20
```

### zustand

Se utiliza para administrar los estados de las características de filtrado y favoritos. `zustand` es una biblioteca basada en hooks que provee una API mínima y simple para la gestión de estados exceso de código. Ofrece flexibilidad, ya que se puede utilizar tanto junto con otras soluciones de gestión de estado, como también por sí solo, pudiendo administrar por completo el estado de la aplicación. Proporciona actualizaciones de estado eficientes con re-renders mínimos que mejoran el rendimiento de la aplicación. Escala bien, permitiendo gestionar estados globales, compartidos y locales fácilmente.

### react-router-dom 6

Esta biblioteca agrega y mejora las posibilidades de enrutamiento de las aplicaciones `React` al ofrecer una solución de enrutamiento declarativa, flexible y robusta. Sus características como el enrutamiento dinámico y anidado, el manejo de parámetros de URL y la integración con los hooks de `React` lo convierten en una herramienta poderosa para administrar la navegación en aplicaciones `SPA` (apps de una página).

### msw

`Mock Service Worker` es una biblioteca de simulación de API muy versátil tanto para entornos de navegador en Frontend como para Backend con `Node.js`. Funciona interceptando las solicitudes HTTP a nivel de red, proporcionando una forma flexible y potente de simular las API durante el desarrollo y las pruebas.

### Vite

La herramienta de build central.

### CSS

La gestión de estilos se aplica con `CSS` estándar, siguiendo una estructura modular y escalable:

#### Variables globales

Se encuentran en el fichero `presentation/styles/variables.css` para mantener consistencia definiendo variables centralizadas y reutilizables de colores, tipografías y espaciados, etc. Aporta facilidad para la personalización y el mantenimiento.

#### Estilos globales

Se encuentran en `presentation/styles/global.css`, donde se normalizan estilos y se aplican configuraciones base para evitar duplicación de estilos en el resto de los `CSS` files de la App.

#### Estilos por componente

Cada functional component importa su propio fichero `.css` cuando se requiere personalización específica. Se utilizan nombres descriptivos para mantener la claridad. Si la aplicación crece sería conveniente aplicar `BEM` para mantener aún mayor consistencia de nombres como se muestra a continuación:

- Block (Bloque): El componente principal, por ejemplo:

```
.button {
  background: blue;
  color: white;
  padding: 10px;
}
```

- Element (Elemento): Parte dentro del bloque, por ejemplo:

```
.button__icon {
  margin-right: 5px;
}
```

- Modifier (Modificador): Variaciones del bloque o elemento, por ejemplo:

```
.button--secondary {
  background: white;
}
```

- Para luego usarlo de la siguiente forma:

```
<button className="button button--secondary">
  <span className="button__icon">😊</span>Click
</button>
```

#### Importación modular

Los estilos de cada componente se importan localmente dentro de su respectivo fichero `.tsx` para evitar conflicto global.

### PostCSS

Para manejar las transformaciones de `CSS`.

### Autoprefixer

Un complemento `PostCSS` para añadir prefijos de proveedor de navegador.

### CSS Minifier

`Vite` utiliza `esbuild` para integrar la minificación, pero permite configurar optimización `CSS` adicional si es necesario.

### Typescript

Aporta múltiples beneficios a una base de código de `Javascript`:

- Tipado estático: Evita errores antes de ejecutar el código;
- Autocompletado y sugerencias: Mejora la experiencia en el editor;
- Detecta errores en tiempo de desarrollo: Reduce bugs en `Producción`;
- Código más limpio y mantenible: Facilita la colaboración en equipos grandes;
- Compatibilidad con `JavaScript`: Se puede adoptar de forma progresiva;
- Interfaces y tipos personalizados: Define estructuras claras para objetos y funciones;
- Mejor refactorización: Permite renombrar variables o funciones sin romper el código;
- Mejora la seguridad del código: Reduce errores por valores inesperados;
- Gran comunidad y soporte.

## Local Deployment

Dado que se utiliza ninguna API key en los archivos `.env`, se agregaron al proyecto para facilitar su ejecución sin necesidad de agregar ninguna configuración.

### 1.a) Clonar el repositorio desde GitHub `git@github.com:maresqueta-code/characters-app.git`:

```bash
git clone https://github.com/maresqueta-code/characters-app.git
```

### 1.b) Alternativamente ir a https://github.com/maresqueta-code/characters-app, descargar el proyecto y descomprimirlo.

### 2. Una vez que se tiene el repositorio local, ubicarse dentro del directorio del proyecto:

```bash
cd characters-app
```

### 3. Instalar las dependencias del proyecto

De aquí en adelante, los scripts son provistos en el fichero `package.json`. Para instalar las dependencias ejecutar:

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

Para iniciar la App en localhost, abrir una nueva terminal y ejecutar:

```bash
yarn dev
```

o

```bash
yarn run dev
```

El servidor con la App debería iniciarse en (el puerto podría ser diferente si el 5173 ya está siendo utilizado):

#### http://localhost:5173/

## Tests

### 1. Ejecutar los tests una única vez

Los tests desarrollados para cubrir las funcionalidades de la App usan:

- `Vitest`, un framework de pruebas que se integra bien con `Vite`;
- `React Testing Library`, una API ligera para testear los componentes funcionales de `React`.

Para ejecutar las pruebas sólo una vez y obtener el informe de cobertura en la terminal, abrir un nuevo terminal y ejecutar:

```bash
yarn test
```

o

```bash
yarn run test
```

El informe de cobertura de tests actual del proyecto es ligeramente superior a un `96%`:

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

Para ejecutar las pruebas en modo `watch` y obtener el informe de cobertura en el terminal, ejecutar:

```bash
yarn test:watch
```

o

```bash
yarn run test:watch
```

### 3. Tests in Vitest UI

Para ejecutar las pruebas en modo `watch` e iniciar el servidor local con la interfaz de usuario de `Vitest` que permite:

- gestionar y navegar por las pruebas y su código fuente;
- obtener los detalles de la cobertura;
- y visualizar la salida de errores similar a como se ven desde la terminal.

Ejecutar:

```bash
yarn test:ui
```

o

```bash
yarn run test:ui
```

## Eslint and Prettier

### 1. ESLint

`ESLint` permite chequear los ficheros `.ts` y `.tsx` y que el proceso de linting falle si detecta algún problema y emite alguna advertencia. Para tal fin, ejecutar:

```bash
yarn lint
```

o

```bash
yarn run lint
```

### 2. Prettier

El siguiente script formatea todos los ficheros compatibles en el proyecto de acuerdo con las reglas de `Prettier`:

```bash
yarn format
```

o

```bash
yarn run format
```

### 3. All checks together

El siguiente script es una forma de ejecutar todos los chequeos de calidad de una sóla vez. Este script garantizará que su código esté formateado y que todas las pruebas desarrolladas pasen con éxito antes de continuar. Al combinar estas tareas en un solo comando, se facilita cumplir un estándar de calidad de código consistente en todo el proyecto:

#### Si su package manager es `yarn` entonces ejecutar:

```bash
yarn run checks
```

#### Si su package manager es `npm` entonces ejecutar:

```bash
yarn run checks:npm
```

## Build for Production & Serve

### 1. Build

Al ejecutar el siguiente script se crea una `SPA` basada en `Vite` para `Production`:

```bash
yarn build
```

o

```bash
yarn run build
```

El bundle listo para `Producción` se ubica por defecto en el directorio `dist`, incluida la minificación de `CSS` y el manejo de los prefijos de proveedor de navegador.

### 2. Serve

Una vez terminada la build, para servir los ficheros estáticos desde el directorio `dist` utilizando un servidor web local, ejecutar:

```bash
yarn serve
```

o

```bash
yarn run serve
```

Como resultado, se accede en el navegador a la App servida desde los ficheros estáticos en:

#### http://localhost:4173/

Este script sirve localmente los ficheros de la build para `Producción`. Esto es útil, por ejemplo, para testear la compilación final antes de implementarla realmente en un entorno de `Producción`.

## License

characters-app se distribuye tal cual es bajo la licencia [MIT License](LICENSE).
