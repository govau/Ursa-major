# Ursa major 🚀

## Contents

- [Start server](#start-server)
- [Start front end](#start-front-end)
- [Edit content](#edit-content)
- [Creating new pages](#creating-new-pages)

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

### Redis

Redis is used to cache requests from google cloud storage. This helps retrieve data quicker and reduces the amount of requests made to google cloud storage. Download redis from the [doc site](https://redis.io/download). Mac users may run `brew install redis`.

First start the redis server on port 6379

`$ redis-server --port 6379`

**Optional:** once the server has started, you can use the redis-cli in another terminal window.

`$ redis-cli -p 6379`

Once this is done run the following commands from the `/api` directory to start the server:

```
$ npm i
$ npm run dev
```

It will start on port 3000 by default.

### Adjusting for custom project

The `api/gc-config.js` file contains paths to cloud storage locations of the buckets and files that are being referenced.
The `api/src/schema.js` file contains custom graphQL data structures for the queries.

## Start front end

Once in the `observatory-front-end` directory run the following commands:

```
$ export GATSBY_API_URL="http://localhost:3000/api"
$ npm i
$ npm run start
```

### Edit content

All content can be found in the `observatory-front-end/content` folder. It is contained in markdown files. View the [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for more information.

### Creating new pages

New pages can be with markdown files. For example to create a contact page, follow these steps:

1. In the `front-end/content` folder, create a new folder called `contact-us`.
2. In the `front-end/content/contact-us` folder, create a new file named contact.md
3. Add the following content to the page

```
---
path: /contact
title: Contact Us
createPage: true
---

# Contact the team

To get into contact with the team, please email at abc@example.com
```

The `path` attribute is the URL and the `title` attribute is for the [title](https://www.w3schools.com/tags/tag_title.asp) of the page.

#### Add page to main navigation/footer navivation

To add links to new pages in the main nav bar or the footer, follow these steps:

1. Open up the `front-end/gatsby-config.js` file.
2. Find the `menuLinks` key for main nav links and the `footerLinks` key for the footer items.
3. If you want to add a main nav link to the contact page we created above, add an object to the `menuLinks` key.

#### Before

```
 menuLinks: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About",
        link: "/about",
      },
    ]
```

#### After

```
menuLinks: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Contact",
        link: "/contact",
      },
    ],
```

The footer links can be updated in a similar way using the `footerLinks` key in the `front-end/gatsby-config.js` file.
