item = session.query(MenuItem).all()
for item in items:
    print item.name