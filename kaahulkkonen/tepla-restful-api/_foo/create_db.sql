/*CREATE DATABASE `tepla` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */

/*
drop table `topics_history`;
drop table `topics`;

drop table `users`;
*/

CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(16) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(32) NOT NULL,
  `user_createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `topics` (
  `topic_id` int unsigned NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(128) NOT NULL,
  `topic_data` json DEFAULT NULL,
  `topic_visible` tinyint(4) DEFAULT '1',
  `topic_modifiedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `topic_createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `topic_author` int unsigned DEFAULT NULL,
  PRIMARY KEY (`topic_id`),
  UNIQUE KEY `topic_id_UNIQUE` (`topic_id`),
  KEY `topic_author_idx` (`topic_author`),
  CONSTRAINT `fk_topic_author` FOREIGN KEY (`topic_author`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `topics_history` (
  `topic_history_id` int unsigned NOT NULL AUTO_INCREMENT,
  `topic_history_name` varchar(128) NOT NULL,
  `topic_history_data` json DEFAULT NULL,
  `topic_history_modifiedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `topic_history_createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `topic_history_author` int(11) unsigned DEFAULT NULL,
  `topic_history_parent` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`topic_history_id`),
  UNIQUE KEY `id_UNIQUE` (`topic_history_id`),
  KEY `topic_history_author_idx` (`topic_history_author`),
  KEY `fk_topic_history_parent` (`topic_history_parent`),
  CONSTRAINT `fk_topic_history_author` FOREIGN KEY (`topic_history_author`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_topic_history_parent` FOREIGN KEY (`topic_history_parent`) REFERENCES `topics` (`topic_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tepla`.`users`
(
  `user_name`,
  `user_email`,
  `user_password`
)
VALUES
(
  'Aleksi',
  'aleksi@bc.fi',
  '12345678910'
);

INSERT INTO `tepla`.`topics`
(
  `topic_name`,
  `topic_data`
)
VALUES
(
  'JSON',
  '{}'
);

INSERT INTO `tepla`.`topics`
(
  `topic_name`,
  `topic_data`
)
VALUES
(
  'CLI',
  '{}'
);
