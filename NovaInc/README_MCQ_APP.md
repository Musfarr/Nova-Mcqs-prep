# MCQ Preparation Application

A minimalistic React-based MCQ (Multiple Choice Questions) preparation application with clean design and user-friendly interface.

## Features

### ✅ Completed Features

1. **Login Page**
   - Static authentication (username: `admin`, password: `admin`)
   - Clean, minimalistic design
   - Form validation

2. **Modules Dashboard**
   - 3 modules (Module 1 active, Module 2 & 3 coming soon)
   - Module 1 contains 261 MCQs
   - Visual indicators for available/unavailable modules

3. **MCQ Test Interface**
   - Pagination: 30 questions per page (9 pages total for Module 1)
   - Answer selection with visual feedback
   - Real-time answer validation
   - Score display (correct/wrong/total)
   - Navigation between pages
   - Answer persistence when navigating between pages
   - Visual indicators for validated pages

4. **Design**
   - Minimalistic and modern UI
   - Color scheme: Black (#1a1a1a), Dark Grey, White background
   - No unnecessary gradients
   - Bootstrap 5.3.2 for responsive layout
   - Clean typography and spacing

## File Structure

```
src/
├── components/
│   ├── Login.jsx          # Login page component
│   ├── Modules.jsx        # Modules dashboard
│   └── MCQTest.jsx        # MCQ test interface with pagination
├── data/
│   └── mcqs.json          # 261 MCQs in JSON format
├── App.jsx                # Main app with state management
└── App.css                # Global styles

parse_mcqs.py              # Python script to convert txt to JSON
dadpops.txt                # Original MCQ text file
```

## How to Run

Since PowerShell execution policy is preventing npm commands, you have two options:

### Option 1: Change Execution Policy (Recommended)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm run dev
```

### Option 2: Use CMD
Open Command Prompt (cmd) instead of PowerShell:
```cmd
npm run dev
```

The app will start on `http://localhost:5173`

## Usage

1. **Login**: Use credentials `admin` / `admin`
2. **Select Module**: Click on Module 1 card
3. **Answer Questions**: 
   - Click on options to select answers
   - Navigate between pages using Previous/Next buttons
   - Click "Validate Answers" to check your answers
4. **View Results**: See correct (green) and wrong (red) answers after validation
5. **Navigate**: Use page numbers at bottom to jump to any page

## Answer Key

Currently using **random answer keys** for demonstration. To update with correct answers:

1. Open `src/data/mcqs.json`
2. Update the `correctAnswer` field for each question (A, B, C, or D)
3. Save the file - changes will reflect immediately

## Features Breakdown

### Login Component
- Static authentication
- Error handling
- Clean form design

### Modules Component
- Module cards with hover effects
- Status indicators (available/coming soon)
- Question count badges
- Logout functionality

### MCQ Test Component
- 30 questions per page
- Answer selection with visual feedback
- Validation system
- Score tracking per page
- Page navigation with indicators
- Persistent answers across page navigation
- Sticky header with navigation

## Design Principles

Following the Claude article on frontend design:
- Clear visual hierarchy
- Consistent spacing and alignment
- Minimal color palette
- Readable typography
- Intuitive interactions
- No unnecessary decorations

## Next Steps

1. Add correct answer keys to `mcqs.json`
2. Add Module 2 and Module 3 MCQs
3. Optional: Add overall progress tracking
4. Optional: Add timer functionality
5. Optional: Export results feature
