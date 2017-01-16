# darkwallet-electron-ui

This is a UI that runs on top of [https://github.com/rojavacrypto/launderwallet](https://github.com/rojavacrypto/launderwallet)

It is a re-build of the original Dark Wallet chrome plug-in and borrows most of the CSS and some of the HTML.

It is an electron/react app based on [https://github.com/chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

To run it, clone the repo, cd to it, and run

> npm install

This should install all required node modules.

> npm run dev

You will need npm and a bunch of node modules.

You will need node v6 (v4 is the default version on Ubuntu)

## KNOWN ISSUES:

- None right now

## TO DO:

- Delete Pocket
- Confirm pocket deletes

## MAYBE LATER:

- QR codes https://www.npmjs.com/package/qrcode.react
- Fix / add icons?
- Start the daemon if it's not started
- Check for password matching as you type
- Better notification behavior

- Themes?

- Tests
- Move UI logic to dedicated containers and markup to components
- Break down big components, Reorganize components?
- Rename identities to wallets? Rename other classes for consistency?
