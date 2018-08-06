/* Exercise 2: SQLITE and SQL Basics

Modified from UW CSE 414 assignment by Alvin Cheung

SQLite 3 Documentation: https://www.sqlite.org/
Commonly-used Sqlite commands: http://www.pantz.org/software/sqlite/sqlite_commands_and_general_usage.html
Formatting Output in Sqlite: http://www.sqlite.org/sqlite.html

Problems

1. First, create a simple table using the following steps:
    - Write a SQL statement to create a table Edges(Source, Destination) where both Source and Destination are integers.
    - Write a SQL statement to insert the tuples `(10,5)`, `(6,25)`, `(1,3)`, and `(4,4)`
    - Write a SQL statement that returns all tuples.
    - Write a SQL statement that returns only column Source for all tuples.
    - Write a SQL statement that returns all tuples where Source > Destination.
    - Now insert the tuple `('-1','2000')`. Do you get an error? Why?
*/

/*2. Next, you will create a table with attributes of types integer, varchar, date, and Boolean. 
However, SQLite does not have date and Boolean: you will use `varchar` and `int` instead. Some notes:
    - 0 (false) and 1 (true) are the values used to interpret Booleans.
    - Date strings in SQLite are in the form: 'YYYY-MM-DD'.  
		Examples of valid date strings include: `'1988-01-15'`, `'0000-12-31'`, and `'2011-03-28'`.  
		Examples of invalid date strings include: `'11-11-01'`, `'1900-1-20'`, `'2011-03-5'`, and `'2011-03-50'`.
    - Examples of date operations on date strings (feel free to try them):  
		`select date('2011-03-28')`;  
		`select date('now')`;  
		`select date('now', '-5 year')`;  
		`select date('now', '-5 year', '+24 hour')`;  
		`select case when date('now') < date('2011-12-09') then 'Taking classes' when date('now') < date('2011-12-16') then 'Exams' else 'Vacation' end;` What does this query do? (no need to turn in your answer)  
   Create a table called `MyRestaurants` with the following attributes (you can pick your own names for the attributes, just make sure it is clear which one is for which): 
    - Name of the restaurant: a `varchar` field
    - Type of food they make: a `varchar` field
    - Distance (in minutes) from your house: an `int`
    - Date of your last visit: a `varchar` field, interpreted as date
    - Whether you like it or not: an `int`, interpreted as a Boolean
*/

/*
3.
Insert at least five tuples using the SQL INSERT command five (or more) times. 
You should insert at least one restaurant you liked, at least one restaurant you did not like, 
and at least one restaurant where you leave the “I like” field `NULL`.
*/

/*
4.
Write a SQL query that returns only the name and distance of all restaurants within and 
including 20 minutes of your house. The query should list the restaurants in alphabetical order of names.
*/

/*
5.
Write a SQL query that returns all restaurants that you like, but have not visited 
since more than 3 months ago.
*/

/*
6.
Write a SQL query that returns all restaurants that are within and including 10 mins from your house.
*/