CREATE TABLE Products (
	pname varchar(30) PRIMARY KEY,
	price float,
	category varchar(30),
	manufacturer varchar(30)
);

INSERT INTO Products VALUES ("SingleTouch", 49.99, "photography", "Canon");
INSERT INTO Products VALUES ("MultiTouch", 199.99, "gadget", "Canon");
INSERT INTO Products VALUES ("Gizom", 50, "gadget", "GizmoWorks");
INSERT INTO Products VALUES ("SuperGizom", 250.00, "gadget", "GizmoWorks");
INSERT INTO Products VALUES ("AC", 300, "appliance", "Hitachi");
INSERT INTO Products VALUES ("Gadget", 200, "toy", "Canon");

CREATE TABLE Company (
	cname VARCHAR(30) PRIMARY KEY,
	country VARCHAR(30),
	no_employees int,
	for_profit int
);
INSERT INTO Company VALUES ("Canon", "Japan", 50000, 1);
INSERT INTO Company VALUES ("Hitachi", "Japan", 30000, 1);
INSERT INTO Company VALUES ("GizmoWorks", "USA", 10000, 1);