# Simple testing of React, Redux with SocketIO and React-Vis

![StonkShot](chrome-capture.gif?raw=true "Stonks Screenshot")

POC Mostly.. RNG Based. No data makes sense asides from Time

Needs a lot of 'tidying'

Dark theme is mandatory.

There are a lot more "features" I may or may not add. I may even fix things? Who knows?

Potential Todos:

- Better random data - make yLow, yHigh, yOpen, yClose related
- Dropdown menu to change display options on graphs
- Toggleable Graph types
- Seperate page to list transaction history (saved via localstorage for now)
- Error boundaties
- Fix duplicate socket connections when 2 same graphs are open
- Move ENDPOINT variable to a one-time modal which saves to localStorage

Client runs on :3000

Server runs on :4001

NOTE: yarn start defaults to HOST=0.0.0.0 for mobile testing - change start script in package.json if not wanted

## Before Running

Change ENDPOINT to current Host IP (or localhost) in src/components/Graph/Graph.js

## Default start (Requires Concurrently!)

```bash
    yarn install && cd server && yarn install && cd .. && yarn start

```

## Start Express SocketIO Server

```bash
    yarn startserver
```

## Start Client

```bash
    yarn startclient
```
