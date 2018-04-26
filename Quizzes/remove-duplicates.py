mylist = [1, 2, 3, 3, 4, 5, 5]
newlist = []

for i in mylist:
    if i not in newlist:
        newlist.append(i)

print (newlist)
