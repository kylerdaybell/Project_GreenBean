# Project_GreenBean Open-Source API Official Documentation #
## Using our open source api on your server ##
> Because our Api is open source it can be used on your very own server. This is a useful feature for those wishing to run the application independent of Project_GreenBeans own database.

## Steps for setting up the Api Server ##
1. install node.js
2. install mysql-server
3. create a database user and grant all privileges to that user. 
> sudo mysql

> CREATE USER 'username' IDENTIFIED BY 'password';

> GRANT ALL ON *.* TO 'username';

3.5. You may need to add the following line if your are using mysql in Docker.
> ALTER USER 'username'@'%' IDENTIFIED WITH mysql_native_password BY 'password'

> exit

4. Clone our code base
>git clone https://github.com/kylerdaybell/Project_GreenBean.git
5. Navigate to the Api Directory under the Project_GreenBean directory 

> cd Project_GreeBean/Api

5. copy the database.sql file contents
6. login to mysql-server as the user you created

>mysql -u username -p

7. paste the contents of the file and allow it to create the database.
8. run an npm install on the Api directory
9. create a file called .env with the following contents (change the values to match your environment)
```
NODE_ENV=development
PORT=80
DB_HOST=Localhost
DB_USER=your_database_username
DB_PASS=your_database_password
DB_DATA=greenbeans
```

9. Start the node server 
> node index.js
10. thats it your api should be up and running



