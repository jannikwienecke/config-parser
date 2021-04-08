# 🧰 config-parser

> This project allows to update and add new attributes of different config files (xml, plist..)

```ts
new ConfigParser(
  pathToFile,
  parsingFunc,
  buildingFunc,
  new AttributeManipulationClass(),
).start(attributesToUpdateOrInclude);
```

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

```

```
