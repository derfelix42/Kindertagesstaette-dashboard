CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quote` text NOT NULL,
  `author` varchar(255) NOT NULL DEFAULT "Anonymous",
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recipient` varchar(255),
  `emotion` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOAD DATA LOCAL INFILE '/data/quotes.csv' INTO TABLE `quotes` FIELDS TERMINATED BY ';' (`quote`, `author`, `recipient`, `emotion`) SET `recipient`= NULLIF(`recipient`, ''), `emotion`= NULLIF(`emotion`, ''),`author` = IFNULL(NULLIF(`author`, ''), 'Anonymous');