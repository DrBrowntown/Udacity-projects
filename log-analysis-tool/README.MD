# Log analysis project.

A Udacity Full Stack developer project called "Log Analysis Project"

# Description

This a reporting tool built in python that prints out plain text reports based on data within a fictional news PostgreSQL database. 

The data contained within the three tables of the database deal primarily with articles, authors, and server logging. 

It reports on 3 questions:
    1. What are the most popular three articles of all time?
    2. Who are the most popular article authors of all time?
    3. On which days did more than 1% of requests lead to errors?

## Install

Please be sure to have Python 2.7 installed. 

The database is in PostgreSQL.

The reporting tool imports psycopg2. 


### Setting up your virtual machine and database.

Tools used include Vagrant and Virtual box. 

User a terminal like Git Bash. Download at: https://www.git-scm.com

Install virtual box. Download at: https://www.virtualbox.org/wiki/Download_Old_Builds_5_1

 Install the platform package for your operating system. You do not need the extension pack or the SDK. You do not need to launch VirtualBox after installing it; Vagrant will do that.

Vagrant is the software that configures the VM and lets you share files between your host computer and the VM's filesystem. Download at: https://www.vagrantup.com/downloads.html

Download the VM configuration file here: https://d17h27t6h515a5.cloudfront.net/topher/2017/August/59822701_fsnd-virtual-machine/fsnd-virtual-machine.zip

Navigate to this folder within your terminal window and then into the directory inside it called vagrant. 

From your terminal, inside the vagrant subdirectory, run the command vagrant up. This will cause Vagrant to download the Linux operating system and install it. 

When vagrant up is finished running, you will get your shell prompt back. At this point, you can run vagrant ssh to log in .

To load the data from the SQL database, cd into the vagrant directory and use the command psql -d news -f newsdata.sql.

Please create the following views within the database:

#### View totals1

```sql
create view totals1
as select date_trunc('day' , time), count(*) as totals
from log
group by date_trunc('day', time)
order by totals desc;
```

#### View errors1

```sql
create view errors1
as select date_trunc('day', time), count(*) as errors
from log
where status != '200 OK'
group by date_trunc('day', time)
order by errors desc;
```

## Running the reporting tool

While within the vagrant database type in: python tool.py to run the script and view the report. 