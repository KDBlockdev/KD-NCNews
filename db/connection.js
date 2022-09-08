const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || 'development';

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
<<<<<<< HEAD
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config =
  ENV === 'production'
=======
  throw new Error("PGDATABASE or DATABASE_URL not set");
};

const config =
  ENV === "production"
>>>>>>> main
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

module.exports = new Pool(config);
<<<<<<< HEAD

=======
>>>>>>> main
