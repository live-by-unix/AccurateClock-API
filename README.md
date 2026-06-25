## Welcome to AccurateClock API
A lightweight API for the glorious AccurateClock website. No auth, rate limits, and NO cors. 

![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white) ![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD--3--Clause-blue.svg) ![API](https://img.shields.io/badge/API-REST-green)

To visit, click [here](https://accurateclock.pages.dev) for the website (NON-API) and [here](https://accurateclockapi.pages.dev) for the API demo/documentation page.    

This README covers why AccurateClock API, usage, how to request, tech stack, and licensing.

## Why AccurateClock API?
1. If you loved AccurateClock, you'll love the API.
2. It's stable & production grade
3. It's NO-CORS
4. It's easy to request
5. No auth, No rate limit
6. It's accurate (synced up with Cloudflare NTP time servers)
7. It's lightweight
8. Multiple endpoints
9. Served via Cloudflare's fast & global CDN
10. It has a near zero learning curve
11. 100% HTTPS
12. Returns metadata
13. Returns server offset
14. And best of all, IT RETURNS THE TIME!


## Usage
There are multiple endpoints for the API.    
A table is below:

| Endpoint      | Description            |
|---------------|------------------------|
| `/api/time`   | Returns the time       |
| `/api/offset` | Returns the time without extra data (just the unix epoch) |
| `/api/meta`   | Returns metadata       |


The endpoint ```/api/time``` is to get the time without the fuss.    
The JSON it will return would look something like this:   
```json
{
  "epoch_ms": 1710000000000,
  "iso_utc": "2026-06-24T18:00:00.000Z",
  "latency_ms": 2.8,
  "region": "SFO",
  "version": "1"
}
``` 
To request this endpoint, do a ```GET``` request to ```https://accurateclock-api-public.live-by-unix.workers.dev/api/time```      

The endpoint ```/api/offset``` is to get just the unix epoch in ms.    
The JSON it would return would look something like this:   
```json
{
  "server_epoch_ms": 1710000000000
}
```
To request this endpoint, do a ```GET``` request to ```https://accurateclock-api-public.live-by-unix.workers.dev/api/offset```      

The endpoint ```/api/meta``` brings general metadata about the service and the region.
The JSON it will return would look something like this:
```json
{
  "service": "accurateclock",
  "api_version": "1",
  "runtime": "cloudflare-worker",
  "region": "SFO",
  "features": ["time", "offset", "meta"]
}
```
To request this endpoint, do a ```GET``` request to ```https://accurateclock-api-public.live-by-unix.workers.dev/api/meta```    

## How to request
To request the endpoint, here are some examples (using endpoint ```/api/time```, you can change):
For JavaScript:
```js

const r = await fetch(
  "https://accurateclock-api-public.live-by-unix.workers.dev/api/time" 
);
const d = await r.json();
console.log(d.epoch_ms);
```
For Python:
```python

import requests

d = requests.get(
    "https://accurateclock-api-public.live-by-unix.workers.dev/api/time" 
).json()

print(d["epoch_ms"])
```
For cURL:
```bash
curl https://accurateclock-api-public.live-by-unix.workers.dev/api/time 
```

## Tech Stack
The tech stack is
* HTML
* CSS
* JS
* Cloudflare pages (for the documentation/demo page)
* Cloudflare workers (for the API)

## License
This project is licensed under the [BSD-3-Clause License](https://opensource.org/license/bsd-3-clause) - see the [LICENSE](LICENSE) file for details.

And that's all for AccurateClock API!

 
