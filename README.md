# Auth Server

A simple user statistics server, and using Eslint with Airbnb Style Guide to style the code.

The project structure is based on my own boilerplate project [express-typescript-boilerplate](https://github.com/ambisign-gavin/express-typescript-boilerplate).

Online Demo: https://authdemo.gavinwang.net/

Online API document: https://authdemo.gavinwang.net/docs/api

* [Getting Started](#GettingStarted)
* [API Documentation](#APIDocumentation)
* [Setting Auth0 callback API](#auth0callback)

## Getting Started<a id="GettingStarted"></a>

**`using node v16.14.0 (npm v8.3.1) to develop.`**

1. Clone the repo:

```
git clone --depth 1 git@github.com:ambisign-gavin/auth0-demo.git
cd auth0-demo
```

2. Run the initial environment and database config command: 

```
npm run initenv
```

3. Setting the environment variables:
  
  * database config path: `src/db/config/`.

  * server env file path: `./.env`.

  | variables | description |
  | --- | --- |
  | PORT | The port number for the server. |
  | AUTH0_URL | Your Auth0 App URL. |
  | AUTH0_SECRET | Your Auth0 Client Secret. |
  | AUTH0_CLIENT_ID | Your Auth0 Client ID. |
  | AUTH0_API_TOKEN | Your Auth0 Management API token. |
  | LOGIN_URL | The App login URL. |
  | AUTH0_CB_TOKEN | The token for Auth0 callback API. |
  | BASE_URL | Your Auth App URL. |

4. Start the server on development mode:

```
npm run install
npm run dev
```

4. Run on production:

```
npm run start:prod
```

## API Documentation<a id='APIDocumentation'></a>

The dev API Documentation URL is http://localhost:3000/docs/api.

## Setting Auth0 callback API<a id='auth0callback'></a>

#### Setting the verification email redirected URL:

  1. Go to your Auth0 App Dashboard.
  2. Go to `Branding` -> `Email Templates` panel.
  3. Chose `Verification Email (using Link)` for the `Template` field.
  4. Enter your verification Email callback in the `Redirect To` field, ex: `https://{API_DOMAIN}/api/v1/users/verificationEmail/cb/`.

#### Setting the login callback:

  1. Go to your Auth0 App Dashboard.
  2. Go to `Actions` -> `Library` panel.
  3. Click the `Build Custom` button.
  4. Enter the action name, and chose `Login / Post Login` for the `Trigger` field.
  5. Enter the code:

      ```
      const axios = require("axios");

      exports.onExecutePostLogin = async (event, api) => {
        await axios.post(
          "https://{API_DOMAIN}/api/v1/auth0/login/cb", 
          { user: event.user },
          {
            headers: {
              'Authorization': '{AUTH0_CB_TOKEN}'
            }
          }
        );
      };
      ```
      * follow the [Add a dependency](https://auth0.com/docs/customize/actions/write-your-first-action#add-a-dependency) document to add Axios.
  6. Click `Deploy` button.
  7. Go to `Actions` -> `Flows` panel, then click the `Login`.
  8. Drag the custom action that you created in step 4 to the flow, and click `Apply`.
