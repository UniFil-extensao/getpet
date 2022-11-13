CREATE DATABASE IF NOT EXISTS `getpet_dev`;
CREATE DATABASE IF NOT EXISTS `getpet_test`;

CREATE USER IF NOT EXISTS 'getpet'@'localhost' IDENTIFIED BY 'getpet';

GRANT ALL PRIVILEGES ON `getpet_dev`.* TO 'getpet'@'localhost';
GRANT ALL PRIVILEGES ON `getpet_test`.* TO 'getpet'@'localhost';

FLUSH PRIVILEGES;