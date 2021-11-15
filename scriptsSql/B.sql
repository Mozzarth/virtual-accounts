-- Contiene las alteraciones necesarias para docker


CREATE USER if not exists 'uPrueba'@'%' IDENTIFIED BY 'YOUR_PASS';
GRANT SELECT, INSERT, UPDATE ON StreamingPro.* TO 'uPrueba'@'%';
FLUSH PRIVILEGES;