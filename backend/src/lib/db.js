
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootdev',
  database: 'login_nodejs_tutorial',
  password: 'rootdevpass'
});
connection.connect();
module.exports = connection;


/*
MySQL

 




CREATE USER 'rootdev'@'localhost' IDENTIFIED BY 'rootdevpass'; 
GRANT CREATE,  ALTER, DROP, DELETE, INSERT, SELECT, UPDATE  ON login_nodejs_tutorial.* TO 'rootdev'@'localhost';



????gvenblog????
CREATE USER 'gvenblog'@'localhost' IDENTIFIED BY 'tG}A8)f76T4#9';
  //GRANT ALL PRIVILEGES ON * . * TO 'gvenblog'@'localhost';
  GRANT CREATE, DROP, ALTER, DELETE, INSERT, SELECT, UPDATE  ON * . * TO 'gvenblog'@'localhost';
????

????phpmyadmin????
create database phpmyadmin;
CREATE USER 'phpmyadmin'@'localhost' IDENTIFIED BY 'C08uu6!aD./';
  //GRANT ALL PRIVILEGES ON * . * TO 'gvenblog'@'localhost';
  GRANT CREATE,  ALTER, DROP, DELETE, INSERT, SELECT, UPDATE  ON phpmyadmin.* TO 'phpmyadmin'@'localhost';
????
[julius:176.78.139.181]
CREATE USER 'phpmyadmin'@'localhost' IDENTIFIED BY 'C08uu6!aD./';
GRANT CREATE,  ALTER, DROP, DELETE, INSERT, SELECT, UPDATE  ON phpmyadmin.* TO 'phpmyadmin'@'localhost';
????




*/
/********************************************* AWS - old configuration

Instance  identifier: gvenecosystem
endpoint: gvenecosystem.crbhyftm1lfy.eu-west-1.rds.amazonaws.com
port:     3306
Root Credntials:
	-username: gvenroot
	-pass:     G76u4(98*ytG}hV  (old: 76T4(98*ytG}Af)



????gvenblog????
CREATE USER 'gvenblog'@'172.31.2.222' IDENTIFIED BY 'tG}A8)f76T4#9';
  //GRANT ALL PRIVILEGES ON * . * TO 'gvenblog'@'172.31.2.222';
  GRANT CREATE, DROP, ALTER, DELETE, INSERT, SELECT, UPDATE  ON * . * TO 'gvenblog'@'172.31.2.222';
????

????phpmyadmin????
create database phpmyadmin;
CREATE USER 'phpmyadmin'@'172.31.2.222' IDENTIFIED BY 'C08uu6!aD./';
  //GRANT ALL PRIVILEGES ON * . * TO 'gvenblog'@'172.31.2.222';
  GRANT CREATE,  ALTER, DROP, DELETE, INSERT, SELECT, UPDATE  ON phpmyadmin.* TO 'phpmyadmin'@'172.31.2.222';
????
[julius:176.78.139.181]
CREATE USER 'phpmyadmin'@'176.78.139.181' IDENTIFIED BY 'C08uu6!aD./';
GRANT CREATE,  ALTER, DROP, DELETE, INSERT, SELECT, UPDATE  ON phpmyadmin.* TO 'phpmyadmin'@'176.78.139.181';
????
*************************************************************************************/
