module.exports = {
  proxy: {
    prefix: "/graphql",
    url: "http://localhost:3000",
  },
  siteMetadata: {
    title: `analytics.service.gov.au`,
    description: `The Observatory’s goal is to measure how people interact with government services. It empowers and supports teams to provide better services and outcomes for everyone.`,
    author: `Digital Transformation Agency`,
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
    footerLinks: [
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Contact",
        link: "/contact",
      },
      {
        text: "Privacy",
        link: "/privacy",
      },
      {
        text: "Github for this site",
        link: "https://github.com/govau/ursa-major",
      },
      {
        text: "Github for our projects",
        link: "https://github.com/govau/galileo",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gov.au Analytics platform`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#61daff`,
        theme_color: `#61daff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-5MGT2T2",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
