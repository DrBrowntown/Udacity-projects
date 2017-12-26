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

spinach = session.query(MenuItem).filter_by(name = 'Spinach Ice Cream').first()

print spinach.restaurant.name
session.delete(spinach)
session.commit()

