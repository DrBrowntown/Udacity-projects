from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, relationship
from database_setup import Base, Restaurant, MenuItem
import os
import sys

# connect to db and create db session
engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

restaurants = session.query(Restaurant).all()
## To find out number of rows returned
print(len(restaurants))

## Loop Over Each Row to Print Name of Restaurant

for res in restaurants:
    print(res.name)