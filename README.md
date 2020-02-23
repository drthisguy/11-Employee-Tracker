# 11-HR Express
CLI based content management system for HR departments.

# Abstract

This is a full featured CLI content management system application. HR Express is ideal for managing human resources operations such as storing, adding, removing, updating, searching, budgeting, cross-referencing and more from company employees, departments, job titles, etc. The UI is naturally fluid and easy to manage with colored text. This application interfaces best with your SQL databases and is perfect for small business everywhere. A schema script for your MySQL workbench is included along with a seeds.sql to load for testing.

# How To Use:
Node installation required. install dependencies by typing "npm install".
Run the included schema.sql file on MySQL server and set it up to accept the following connection: 

host: 'localhost',
port: 3306,
user: "root",
password:"YourRootPassword",
database: "tracker_DB"

Run the program with "npm start".

# file manifest:

app.js
package.json
depts.js
employeee.js
roles.js
sql.js
ui.js
schema.sql
seeds.sql
LICENSE 
README.md 



# GitHub Repo:

https://github.com/drthisguy/11-Employee-Tracker


# Screen Grabs:
https://user-images.githubusercontent.com/48693333/75101549-24e5d780-55ac-11ea-9834-df3bdd004c18.png

![image](https://user-images.githubusercontent.com/48693333/75101549-24e5d780-55ac-11ea-9834-df3bdd004c18.png)

https://user-images.githubusercontent.com/48693333/75101598-e270ca80-55ac-11ea-9af2-86dbed7b86ed.png

![image](https://user-images.githubusercontent.com/48693333/75101598-e270ca80-55ac-11ea-9af2-86dbed7b86ed.png)

# Sources, issues and contact:

Contact: page.c.tyler@gmail.com

known issues:
An error is frequently thrown when the seed.sql script is ran in MySQL workbench.  Unable to direct this back to the file itself. It'll usually work on the 2nd or third attempt. I believe the problem is on MySQL's end.  
While input validation has been implimented to the best of my ability within a deadline, there may be some issues when user input is not valid.  Feel free to email anything found. 

sources:

https://www.mysqltutorial.org/basic-mysql-tutorial.aspx
https://developer.mozilla.org, 
google.com 
npm docs
stackoverflow.com
bootswatch.com
https://validator.w3.org/nu


