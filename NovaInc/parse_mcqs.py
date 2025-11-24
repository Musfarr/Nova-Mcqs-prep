import json
import re

def parse_mcqs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    mcqs = []
    lines = content.split('\n')
    
    current_question = None
    current_options = []
    question_number = 0
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines and "TEST" header
        if not line or line == "TEST" or line.isdigit():
            i += 1
            continue
        
        # Check if line starts with a number followed by a period (question)
        question_match = re.match(r'^(\d+)\.\s+(.+)', line)
        
        if question_match:
            # Save previous question if exists
            if current_question and current_options:
                # Generate random answer (A, B, C, or D)
                import random
                correct_answer = random.choice(['A', 'B', 'C', 'D'])
                
                mcqs.append({
                    'id': question_number,
                    'question': current_question,
                    'options': current_options,
                    'correctAnswer': correct_answer
                })
            
            # Start new question
            question_number = int(question_match.group(1))
            current_question = question_match.group(2).strip()
            current_options = []
            i += 1
            continue
        
        # Check if line is an option (A., B., C., D.)
        option_match = re.match(r'^([A-D])\.\s+(.+)', line)
        
        if option_match:
            option_letter = option_match.group(1)
            option_text = option_match.group(2).strip()
            
            # Check if option continues on next line (but not another option)
            j = i + 1
            while j < len(lines):
                next_line = lines[j].strip()
                # If next line doesn't start with a number or option letter, it's continuation
                if next_line and not re.match(r'^(\d+\.|[A-D]\.|TEST)', next_line) and not next_line.isdigit():
                    option_text += ' ' + next_line
                    j += 1
                else:
                    break
            
            current_options.append({
                'label': option_letter,
                'text': option_text
            })
            i = j
            continue
        
        # If line doesn't match any pattern but we have a current question, append to question
        if current_question and not option_match:
            current_question += ' ' + line
        
        i += 1
    
    # Don't forget the last question
    if current_question and current_options:
        import random
        correct_answer = random.choice(['A', 'B', 'C', 'D'])
        mcqs.append({
            'id': question_number,
            'question': current_question,
            'options': current_options,
            'correctAnswer': correct_answer
        })
    
    return mcqs

# Parse the file
mcqs_data = parse_mcqs('dadpops.txt')

# Create the final JSON structure
output = {
    'module1': mcqs_data,
    'module2': [],
    'module3': []
}

# Write to JSON file
with open('src/data/mcqs.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Successfully parsed {len(mcqs_data)} MCQs!")
print(f"Output saved to src/data/mcqs.json")
