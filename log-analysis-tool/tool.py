#! /usr/bin/env python

import psycopg2
from datetime import datetime


# Fetch results from database
def connect(query):
    try:
        # Database connection
        database = psycopg2.connect(database="news")
        # Results fetched and queries ran by curser
        cur = database.cursor()
        # Queries executed by cursor
        cur.execute(query)
        # Cursor results are fetched
        results = cur.fetchall()
        database.close()
        return results
    except BaseException:
        print("No results from database.")
# Results are printed by this function


def print_results(results):

    # Iterate over the rows and get results
    for i in results:
        print('"' + str(i[0]) + '"' + ' -- ' + str(i[1]))
    print '\n'
# Views are defined in the README file

# Defines what are the most popular three articles of all time.


def pop_articles():
    print " The Most Popular Articles "
    print '--'
    query1 = """
            select articles.title, count (*) as views
            from articles, log where articles.slug =
            (regexp_split_to_array(path, '/article/'))[2]
            and status = '200 OK'
            group by articles.title order by views desc limit 3;
            """
    popular_articles = connect(query1)
    print_results(popular_articles)

# Defines who are the most popular article authors of all time


def pop_authors():
    print " The Most Popular Authors "
    print '--'
    query2 = """
           select authors.name, count(log.path) as views
           from authors left join articles on authors.id = articles.author
           left join log on log.path like concat('%', articles.slug)
           group by authors.name order by views desc;
            """
    popular_authors = connect(query2)
    print_results(popular_authors)

# Defines on which days more than 1% of requests lead to errors.


def err_requests():
    print " Days in which more than 1% of requests lead to errors "
    print '--'
    query3 = """
            select errors1.date_trunc,
            cast(errors1.errors as float) / totals1.totals * 100
            as errorpercentage
            from errors1, totals1
            where errors1.date_trunc = totals1.date_trunc
            and cast(errors1.errors as float) /totals1.totals > 0.01;

            """
    error_request = connect(query3)
    for i in error_request:
        print(str(i[0]) + ' -- ' + str(i[1]))
    print '\n'


# Runs all 3 queries.
if __name__ == "__main__":
    pop_articles()
    pop_authors()
    err_requests()
