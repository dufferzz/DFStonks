# Simple testing of React, Redux with SocketIO and React-Vis

![StonkShot](chrome-capture.gif?raw=true "Stonks Screenshot")

POC Mostly.. very badly implemented, RNG Based. No data makes sense asides from Time

The CSS is terrible. Currently experimenting with styled-components and CSS Grid..

Dark theme is mandatory.

There are a lot more "features" I may or may not add. I may even fix things? Who knows?

Potential Todos:

- Better random data - make yLow, yHigh, yOpen, yClose related
- Fix dynamically added charts - only half(ish) working
- Finish moving state to Redux
- Add Express Endpoints to list all Socket Endpoints .. or on connect & update broadcast?
- Improve the CSS & candlesticks. Maybe migrate everything to styled-components
- Cron job / node-Scheduler to add prev values to database for default state init
- Dropdown menu to change display options

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
