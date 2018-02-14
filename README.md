
# Template Ionic 2


## Requisiti

`npm`, `ionic`, `cordova`, `typescript`,  `tslint`

## Sviluppo

Invece di lanciare il comando `ionic serve` si consiglia di utilizzare il comando `npm run serve:<env>` dove `<env>` rappresenta l'environment da utilizzare all'interno dell'app. Al momento sono disponibili tre environment: `dev`, `mocks` e `prod` (che è il default nel caso in cui non venga specificato). Gli environment sono configurabili attraverso i relativi file `/src/environments/environment.<env>.ts`.

Per creare un environment è sufficiente aggiungere il relativo file nella directory `src/environments` e un nuovo script nel `package.json`.

Ad esempio, per aggiungere l'environment test occorrerà creare il file `src/environments/environment.test.ts` definendone tutte le variabili e specificare il nuovo script `serve:test: "ENV=test ionic-app-scripts serve"` nel `package.json`. Ora lanciando il comando `npm run serve:test` si avvierà una nuova istanza del progetto con l'environment appena definito.

## Server Mocks

Attraverso il comando `npm run mocks-serve` è possibile lanciare un web server interno contattabile alla url `http://127.0.0.1:9001` e che punta alla disrectory `mocks` del progetto.

Il file mock di configurazione presente in `/mocks/config/config.json` sarà, ad esempio fruibile all'app, contattando la url `http://127.0.0.1:9001/config./config.json`.
