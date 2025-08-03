🚀 Issue Board

🌟 Features

    Three-Column Kanban Board: Backlog, In Progress, Done

    Role-Based Access Control: Separate permissions for admin/contributor

    Drag & Drop / Button Movement: Move issues easily between columns

    Optimistic UI & Undo: Async save simulation; undo available for 5 seconds

    Live Search & Filter: Find and filter by title, tags, assignee, or severity

    Priority Scoring: Custom score formula; automatic sorting

    Recently Accessed Issues: Sidebar tracks and displays recent activity (uses localStorage)

    Issue Detail View: Full detail page with "Mark as Resolved" action

    Dark/Light Theme: Theme toggle, persists user preference

    Polling / Real-Time: Polls issue list every 10 seconds, shows last sync

    Responsive Design: Mobile-first, works on all devices

    Modern Hooks/Context: Clean, maintainable state management

🛠 Tech Stack

    Framework: React 18

    Language: JavaScript

    Styling: CSS Modules / Tailwind / Custom styles (mention yours)

    State: useState, Context, and custom hooks

    Testing: Jest / React Testing Library (if implemented)

    Linting: ESLint (if included)

📁 Project Structure

text
src/
├── components/        # Reusable UI & logic components
│   ├── Board.jsx
│   ├── IssueCard.jsx
│   ├── Sidebar.jsx
│   ├── ThemeToggle.jsx
│   └── ...
├── context/           # Context providers for user/theme
│   ├── UserContext.jsx
│   └── ThemeContext.jsx
├── utils/             # Helpers & custom hooks
│   ├── api.js
│   ├── priority.js
│   └── useLocalStorage.js
├── data/              # Mock JSON data
│   └── issues.json
├── App.jsx            # Main application component
├── index.js           # Entry point
└── styles.css         # Global styles, themes
public/
└── index.html
package.json
README.md

🚀 Getting Started
Prerequisites

    Node.js 18+ (or whichever version)

    npm (or yarn/pnpm) installed

Install Dependencies

bash
npm install

Run the App

bash
npm run start

Visit http://localhost:3000 in your browser.
✨ Usage

    Move issues: Drag issue cards between columns (admin only) or use action buttons.

    Undo: After an update, a toast appears to undo within 5 seconds.

    Search/filter: Use the top bar for instant filtering.

    Switch user: Change between Alice (admin) and Bob (contributor) to test role-based access.

    Theme toggle: Switch between dark/light with the button in the navbar.

    Click issues: View full details, mark as resolved (admin only).

🗄 Data & Configuration

    Data: All issues are loaded from src/data/issues.json.

    localStorage: Used for recently accessed issues and theme persistence.

    No backend: All data is handled in-memory / via mock API functions.


🧪 Development

    Build: npm run build (if using Create React App, Next.js, or similar)

🔐 Security

    No sensitive data stored in repo.

    All credentials (if any) should go in .env.local (not committed).
