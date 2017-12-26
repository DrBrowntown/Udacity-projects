from sqlalchemy import create_engine, Column, ForeignKey, Integer, String
from sqlalchemy.orm import sessionmaker, relationship
from database_setup import Base, Restaurant, MenuItem

import os
import sys

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

engine = create_engine('sqlite:///restaurantmenu.db')

Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

UrbanVeggieBurger = session.query(MenuItem).filter_by(id = 2).one()

UrbanVeggieBurger.price = '$2.99'
session.add(UrbanVeggieBurger)
session.commit()

veggieBurgers = session.query(MenuItem).filter_by(name = 'Veggie Burger')


for veggieBurger in veggieBurgers:
    if veggieBurger.price != '$2.99':
        veggieBurger.price = '$2.99'
        session.add(veggieBurger)
        session.commit()

for veggieBurger in veggieBurgers:
    print veggieBurger.id
    print veggieBurger.price
    print veggieBurger.restaurant.name
    print "\n"