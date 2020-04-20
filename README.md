# Instructions

## Contents

- [Start server](#start-server)
- [Start front end](#start-front-end)
- [Edit content](#edit-content)

## Start server

To ensure the server works correctly you will need to add service account key in the root directory.

### Service account key

Add a file in the `/api` directory named `.env`. Then follow these steps

1. Vist [google cloud platform landing page](https://console.cloud.google.com/)
2. Open the sidebar and then click `APIs & Services` > `Credentials`
3. Under `Service Accounts` click the row with the name of `Storage admin -bq`
4. Click `Create key`
5. Copy the private key and client email of this json file into the `.env` file you created earlier. Like so:

```
PRIVATE_KEY=[insert private key here]
CLIENT_EMAIL=[insert client email here]
```

Once this is done run the following commands from the `/api` directory to start the server:

```
$ npm i
$ npm run dev
```

It will start on port 3000 by default.

## Start front end

Once in the `observatory-front-end` directory run the following commands:

```
$ EXPORT GATSBY_API_URL="http://localhost:3000/api"
$ npm i
$ npm run start
```

### Edit content

All content can be found in the `observatory-front-end/content` folder. It is contained in markdown files.
