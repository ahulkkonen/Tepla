CREATE TABLE "users" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "user_name" varchar(16) NOT NULL,
  "user_email" varchar(255) DEFAULT NULL,
  "user_password" varchar(32) NOT NULL,
  "user_createdOn" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id_UNIQUE" ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO "tepla"."users"
(
  "user_name",
  "user_email",
  "user_password"
)
VALUES
(
  'Aleksi',
  'aleksi@bc.fi',
  '12345678910'
);

CREATE TABLE "topics" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "topic_name" varchar(128) NOT NULL,
  "topic_data" json DEFAULT NULL,
  "topic_modifiedOn" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "topic_createdOn" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "topic_visible" BOOLEAN DEFAULT 1,
  "topic_author" int(11) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id_UNIQUE" ("id"),
  KEY "topics_author_idx" ("topic_author"),
  CONSTRAINT "topics_author" FOREIGN KEY ("topic_author") REFERENCES "users" ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO "tepla"."topics"
(
  "topic_name",
  "topic_data"
)
VALUES
(
  "JSON",
  "needs encoded json string"
);
