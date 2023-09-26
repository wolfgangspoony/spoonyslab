"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// utils.ts
var import_fields = require("@keystone-6/core/fields");
var isAdmin = ({ session: session2 }) => {
  if (!session2 || !session2.data) {
    return false;
  }
  return session2.data.isAdmin;
};
var slugResolveInputHook = async ({
  resolvedData
}) => {
  if (resolvedData.name) {
    return resolvedData.name.toLowerCase().replace(/\s+/g, "-").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  }
};
var slugField = (0, import_fields.text)({
  isIndexed: true,
  ui: {
    itemView: {
      fieldMode: "hidden"
    },
    createView: {
      fieldMode: "hidden"
    }
  },
  hooks: {
    resolveInput: slugResolveInputHook
  }
});
var createdAtNowField = (0, import_fields.timestamp)({
  defaultValue: "1970-01-01T00:00:00.000Z",
  ui: {
    itemView: {
      fieldMode: "hidden"
    },
    createView: {
      fieldMode: "hidden"
    }
  },
  hooks: {
    resolveInput: async () => {
      return /* @__PURE__ */ new Date();
    }
  }
});

// schema.ts
var lists = {
  User: (0, import_core.list)({
    access: isAdmin,
    fields: {
      name: (0, import_fields2.text)({ validation: { isRequired: true } }),
      email: (0, import_fields2.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields2.password)({ validation: { isRequired: true } }),
      isAdmin: (0, import_fields2.checkbox)(),
      createdAt: createdAtNowField
    }
  }),
  Song: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    ui: {
      labelField: "title"
    },
    fields: {
      // sku: text({
      // 	validation: { isRequired: true },
      // 	isIndexed: "unique",
      // }),
      title: (0, import_fields2.text)({ validation: { isRequired: true } }),
      price: (0, import_fields2.float)({ validation: { isRequired: true } }),
      thumbnail: (0, import_fields2.image)({ storage: "images" }),
      songPreview: (0, import_fields2.file)({ storage: "songs" }),
      createdAt: createdAtNowField
    }
  }),
  HomePage: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    isSingleton: true,
    fields: {
      splash: (0, import_fields2.image)({ storage: "images" }),
      splashPortrait: (0, import_fields2.image)({ storage: "images" })
    }
  }),
  SongsPage: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    isSingleton: true,
    fields: {
      header: (0, import_fields2.text)(),
      featuredHeader: (0, import_fields2.text)(),
      featuredSongs: (0, import_fields2.relationship)({
        ref: "Song",
        many: true
      })
    }
  }),
  AboutPage: (0, import_core.list)({
    access: {
      operation: {
        query: import_access.allowAll,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    isSingleton: true,
    fields: {
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true
      })
    }
  })
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt isAdmin",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password", "isAdmin"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
import_dotenv.default.config();
var {
  // DATABASE_URL: databaseUrl = "",
  // S3_BUCKET_NAME: bucketName = "",
  // S3_REGION: region = "",
  // S3_ACCESS_KEY_ID: accessKeyId = "",
  // S3_SECRET_ACCESS_KEY: secretAccessKey = "",
  // S3_ENDPOINT: endpoint = "",
  // S3_CDN_URL: cdnUrl = "",
  FRONTEND_URL: frontendUrl = "http://localhost:5173",
  BACKEND_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./db/keystone.db"
      // provider: "mysql",
      // url: databaseUrl,
      // additionalPrismaDatasourceProperties: {
      // 	relationMode: "prisma",
      // },
    },
    server: {
      cors: {
        origin: frontendUrl
      }
    },
    lists,
    session,
    storage: {
      songs: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `${baseUrl}/mixtapes${path}`,
        serverRoute: {
          path: "/mixtapes"
        },
        storagePath: "public/songs"
      },
      images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
      // songs: defaultStorage,
      // images: { ...defaultStorage, type: "image" },
    }
  })
);
//# sourceMappingURL=config.js.map
