module.exports.protectedRoutes = [
  {
    path: "/api/user/update/:id",
    methods: ["PUT"],
    roles: ["admin", "user"],
  },
  {
    path: "/api/user/delete/:id",
    methods: ["DELETE"],
    roles: ["admin", "user"],
  },
  {
    path: "/api/user/get/:id",
    methods: ["GET"],
    roles: ["admin", "user"],
  },
  {
    path: "/api/user/get-all",
    methods: ["GET"],
    roles: ["admin"],
  },
];
