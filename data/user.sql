DROP TABLE user;
DROP TABLE userAdmin;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  client_id VARCHAR(255) NOT NULL,
  api_key VARCHAR(255) NOT NULL
);

INSERT INTO user VALUES(NULL,"Celio Pires Junior","celio.pires@account.com","$2b$10$CpyIVLGI27yeOmVwQWN2uuKOleBOJf9/sCFI2c6MRasrpZoU21eTe","eebc4bfaaca4ba1e04e3a2f16a3a22d97bff588f7062e8a709ffb26f278f39518ec89fc1614efdb632b3f824535b90283e98f5bf30b018d3f2c5d3e3f5e6daecb5295b1e7a5f8e21dcc2baf93ddca64d", "6e77056c49151b2e834acd1357d06809a38e5c5ae9ad42739cfa80375c58c1d60469c16abf4b594d835bb899e36b899a");

