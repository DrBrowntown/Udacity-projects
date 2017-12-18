#Log analysis project.

A Udacity Full Stack developer project called "Log Analysis Project"

#Description

This a reporting tool built in python that prints out plain text reports based on data within a database. 

It reports on 3 questions:
    1. What are the most popular three articles of all time?
    2. Who are the most popular article authors of all time?
    3. On which days did more than 1% of requests lead to errors?

##Install

Please be sure to have Python 3 installed. 


###Views

Please create the following views within the database:

####View totals1

create view totals1
as select date_trunc('day' , time), count(*) as totals
from log
group by date_trunc('day', time)
order by totals desc;

####View errors1

create view errors1
as select date_trunc('day', time), count(*) as errors
from log
where status != '200 OK'
group by date_trunc('day', time)
order by errors desc;