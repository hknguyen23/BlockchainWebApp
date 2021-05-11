-- DROP DATABASE blockchainwebapp;
CREATE DATABASE blockchainwebapp;
USE blockchainwebapp;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE Users(
    ID VARCHAR(100) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Username VARCHAR(30),
    Password VARCHAR(1000),
    Email VARCHAR(100) NOT NULL,
    WalletID VARCHAR(100),
    PRIMARY KEY(ID)
);

DROP TABLE IF EXISTS `Transactions`;
CREATE TABLE Transactions(
    ID VARCHAR(100) NOT NULL,
    Amount FLOAT NOT NULL,
    Description VARCHAR(1000),
    DateAdded DATETIME,
    SenderID VARCHAR(100),
    ReceiverID VARCHAR(100),
    PRIMARY KEY(ID)
);

DROP TABLE IF EXISTS `Wallets`;
CREATE TABLE Wallets(
    ID VARCHAR(100) NOT NULL,
    TotalCount FLOAT,
    PRIMARY KEY(ID)
);

ALTER TABLE Transactions ADD CONSTRAINT FK_Transactions_Users_As_Sender FOREIGN KEY(SenderID) REFERENCES Users(ID);
ALTER TABLE Transactions ADD CONSTRAINT FK_Transactions_Users_As_Receiver FOREIGN KEY(ReceiverID) REFERENCES Users(ID);
ALTER TABLE Users ADD CONSTRAINT FK_Users_Wallets FOREIGN KEY(WalletID) REFERENCES Wallets(ID);

INSERT INTO `wallets` VALUES 
	('1', 100),
	('2', 100),
	('3', 100),
	('4', 100);
    
-- Password: 123456
INSERT INTO `users` VALUES 
	('1', 'Nguyễn Văn A', 'user1', '$2a$10$eOJ7p0X0Lva0KcqbB3im1usbd.zPFxSFIeuaeqVWlFgFZUuJ8h5Da', 'user1@gmail.com', '1'),
	('2', 'Nguyễn Văn B', 'user2', '$2a$10$eOJ7p0X0Lva0KcqbB3im1usbd.zPFxSFIeuaeqVWlFgFZUuJ8h5Da', 'user2@gmail.com', '2'),
	('3', 'Trần Thị C', 'user3', '$2a$10$eOJ7p0X0Lva0KcqbB3im1usbd.zPFxSFIeuaeqVWlFgFZUuJ8h5Da', 'user3@gmail.com', '3'),
	('4', 'Hồ Khánh Nguyên', 'hknguyen', '$2a$10$eOJ7p0X0Lva0KcqbB3im1usbd.zPFxSFIeuaeqVWlFgFZUuJ8h5Da', 'hokhanhnguyen@gmail.com', '4');
