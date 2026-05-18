import sys

file_path = '/Users/joeladawahsani/Desktop/Wisdom Kwati Smart City PLC/src/styles/style.css'
with open(file_path, 'r') as f:
    balance = 0
    errors = []
    for i, line in enumerate(f, 1):
        for char in line:
            if char == '{':
                balance += 1
            elif char == '}':
                balance -= 1
        if balance < 0:
            errors.append(f"Extra closing brace at line {i}: {line.strip()}")
            balance = 0 # Reset balance to detect more
    if balance > 0:
        errors.append(f"Unclosed opening brace! Final balance: {balance}")
    
    for err in errors:
        print(err)
