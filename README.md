# Simple testing of React, Redux with SocketIO and React-Vis

![StonkShot](chrome-capture.gif?raw=true "Stonks Screenshot")

POC Mostly.. very badly implemented, RNG Based. No data makes sense asides from Time

The CSS is terrible.

There are a lot more "features" I may or may not add. I may even fix things? Who knows?

Potential Todos:

- Better random data
- Dynamically add charts
- Finish building out Redux
- Add Express Endpoints to list all Socket Endpoints .. or on connect & update broadcast?
- Improve the CSS & candlesticks
- Cron job / node-Scheduler to add prev values to database for pulling on first start
- Dropdown menu to change display options
- Sleep? its 05:57

Client runs on :3000
Server runs on :4001

NOTE: yarn start defaults to HOST=0.0.0.0 for mobile testing
Change package.json if not wanted

Change ENDPOINT in src/components/Graph/Graph.js

## Default start (Requires Concurrently!)

```bash
    yarn start
```

## Start Express SockerIO Server

```bash
    yarn startserver
```

## Start Client

```bash
    yarn startclient
```
