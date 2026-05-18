import sys

def check_braces(filename):
    try:
        with open(filename, 'r') as f:
            stack = []
            for line_no, line in enumerate(f, 1):
                # Simple check, ignoring strings/comments for now
                for char_no, char in enumerate(line, 1):
                    if char == '{':
                        stack.append((line_no, char_no))
                    elif char == '}':
                        if not stack:
                            print(f"Extra closing brace at {line_no}:{char_no}")
                            return
                        stack.pop()
            if stack:
                for ln, cn in stack:
                    print(f"Unclosed brace from {ln}:{cn}")
            else:
                print("All braces balanced")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_braces(sys.argv[1])
