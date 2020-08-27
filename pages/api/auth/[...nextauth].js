import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// Next two lines to add custom user fields like role and currency
// import Adapters from "next-auth/adapters";
// import Models from "../../../models/User";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "awesound-django",
      name: "Email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "name@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: 1342,
          email: "jsmith@fun.com",
          mood: "super",
          image:
            "https://pbs.twimg.com/profile_images/652992187232309248/Ab1kw5e5.jpg",
          name: "Beautiful listener",
          main_role_string: "listener",
          currency: "usd",
          username: "greatspeakertho",
          status: "a",
        };

        // NB: Only

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user); // only has email, 'name' isn't showing in jwt
          // return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
    // Providers.Apple({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/database
  //
  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/api/auth/signin',  // Displays signin buttons
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // signIn: async (user, account, profile) => { return Promise.resolve(true) },
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    // session: async (session, user) => { return Promise.resolve(session) },
    // jwt: async (token, user, account, profile, isNewUser) => { return Promise.resolve(token) }
    // Copying from https://next-auth.js.org/configuration/callbacks#jwt and https://github.com/nextauthjs/next-auth/issues/430#issuecomment-659303137
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        // By default, only name, email and image/picture are saved to jwt.
        // We need to manually specify if we want other
        token.auth_time = Math.floor(Date.now() / 1000);
        token.username = user.username;
        token.mood = user.mood;
        token.main_role_string = user.main_role_string;
        token.main_role_int = user.main_role_int;
        token.currency = user.currency;
        token.user_id = user.id;
        token.status = user.status;
      }
      return Promise.resolve(token);
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: true,

  // adapter: Adapters.TypeORM.Adapter(
  //   // The first argument should be a database connection string or TypeORM config object
  //   "postgres://username:password@databaseurl.aws.com:5432/databasename",
  //   // The second argument can be used to pass custom models and schemas
  //   {
  //     models: {
  //       User: Models.User,
  //     },
  //   }
  // ),
};

export default (req, res) => NextAuth(req, res, options);
