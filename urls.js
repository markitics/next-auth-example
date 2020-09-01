export default {
  apiGetEncodedJWT: process.env.NEXT_PUBLIC_APP_DOMAIN + "/api/auth/token-json",
  payments: {
    djangoDirect: "/payments/from-django-direct",
  },
  api: {
    thisIsFor: "Django API endpoints",
    auth: process.env.NEXT_PUBLIC_API_ROOT + "/auth",
    paymentsDjango: process.env.NEXT_PUBLIC_API_ROOT + "/payments-with-auth",
  },
};
