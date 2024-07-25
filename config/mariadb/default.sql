CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quote` text NOT NULL,
  `author` varchar(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `quotes` (`quote`, `author`) VALUES ('The only way to get rid of a temptation is to yield to it.', 'Oscar Wilde');