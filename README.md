# Auth Website

A simple user statistics website, and using Eslint with Airbnb Style Guide to style the code.

Online Demo: https://authdemo.gavinwang.net/

* [Getting Started](#GettingStarted)

## Getting Started<a id="GettingStarted"></a>

**`using node v16.14.0 (npm v8.3.1) to develop.`**

1. Clone the repo:

```
git clone --depth 1 git@github.com:ambisign-gavin/auth0-demo.git
cd auth0-demo
```

2. Setting the environment variables:
  
```
cp .env.sample .env
```

| variables | description |
| --- | --- |
| NEXT_PUBLIC_API_URL | Your API URL. |
| NEXT_PUBLIC_LOGOUT_URL | Your Logout URL. |

3. Start the server on development mode:

```
npm run install
npm run dev
```

4. Run on production:

```
npm run start:prod
```