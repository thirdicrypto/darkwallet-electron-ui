# darkwallet-electron-ui

This is a UI that runs on top of [https://github.com/rojavacrypto/launderwallet](https://github.com/rojavacrypto/launderwallet)

It is a re-build of the original Dark Wallet chrome plug-in

It is an electron/react app based on [https://github.com/chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

To run it, clone the repo, cd to it, and run 

> npm run dev

You will need npm and a bunch of node modules. If you install, please make a list of the dependencies so we can have them documented here, or better yet add them to package.json

## TO DO:

- Delete Pocket
- Restore
- Show backup button only for logged-in identity
- Settings

- Fix icons
- Start the daemon if it's not started
- Try to open the websocket if it's not open
- Show status of connection
- Handle empty form fields
- Confirm account and pocket deletes
- Don't close identities dropdown on account delete
- active indicators on main tabs

- Daemon status, reset, launch
- Daemon port

- Tests
- Move UI logic to dedicated containers and markup to components
- Break down big components, Reorganize components?
- Rename identities to wallets? Rename other classes for consistency?
