#chart caches previous calculations

chart = {}

def memofibo(n):
    # Check chart for value, return if found
    if n in chart:
        return chart[n]
            
    if n < 3:
        value = 1
    else:
        value = memofibo(n-1) + memofibo(n-2)
            
    chart[n] = value
    return value
    
print memofibo(500)