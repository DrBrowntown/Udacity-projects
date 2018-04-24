# Chart caches previous calculations

chart = {}

def memofibo(n):
    # Check chart for value, return if found
    if n in chart:
        return chart[n]
    # If n is less than 3 it has a value of 1        
    if n < 3:
        value = 1
    # Assign recursively called functions to value    
    else:
        value = memofibo(n-1) + memofibo(n-2)
    # Cache values in chart        
    chart[n] = value
    # Return value
    return value
    
print memofibo(500)