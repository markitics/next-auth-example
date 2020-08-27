// // Copying from https://next-auth.js.org/tutorials/typeorm-custom-models
// // Want to add username, role and currency.

// import Adapters from "next-auth/adapters";

// // Extend the built-in models using class inheritance
// class User extends Adapters.TypeORM.Models.User.model {
//   // You can extend the options in a model but you should not remove the base
//   // properties or change the order of the built-in options on the constructor
//   constructor(name, email, image, emailVerified) {
//     super(name, email, image, emailVerified);
//   }
// }

// const UserSchema = {
//   name: "User",
//   target: User,
//   columns: {
//     ...Adapters.TypeORM.Models.User.schema.columns,
//     // Adds a phoneNumber to the User schema
//     // phoneNumber: {
//     //   type: "varchar",
//     //   nullable: true,
//     // },
//     username: {
//       type: "varchar", // e.g., 'velocast' or 'aman999arora'
//       nullable: true,
//     },
//     main_role_string: {
//       type: "varchar", // 'listener', 'podcaster', 'coursecreator', 'author'
//       nullable: true,
//     },
//     currency: {
//       type: "varchar", // e.g., 'gbp', 'usd', 'eur', 'cad', 'aud'
//       nullable: true,
//     },
//   },
// };

// export default {
//   User: {
//     model: User,
//     schema: UserSchema,
//   },
// };
