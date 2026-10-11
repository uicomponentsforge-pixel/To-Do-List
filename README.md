# Todo List Application

A lightweight, responsive, and accessible Todo List web application built with vanilla JavaScript, HTML5, and CSS3.

## Features

- **Task Management**: Add, complete (toggle), and delete tasks.
- **Filtering**: View tasks by category — `All`, `Active`, or `Completed`.
- **Bulk Actions**: Clear all completed tasks with a single click.
- **Persistence**: Tasks are automatically saved to browser local storage (`localStorage`).
- **Responsive Design**: Clean layout styled for mobile and desktop screens.
- **Dark Mode Support**: Adapts automatically based on the user's system color scheme preference (`prefers-color-scheme`).
- **Accessibility (a11y)**: Accessible keyboard focus states, semantic HTML markup, ARIA roles/attributes, and screen reader labels.

## Tech Stack

- **HTML5**: Semantic markup with ARIA roles and accessibility features.
- **CSS3**: CSS Custom Properties (variables), flexbox layout, dark mode media query.
- **JavaScript (ES6+)**: Modular IIFE structure, event delegation, and `localStorage` integration.

## Project Structure

```
.
├── index.html   # Main HTML page structure
├── style.css    # Styling, CSS variables, and responsive/dark mode rules
└── script.js    # Application state management, UI rendering, and event handlers
```

## Getting Started

No build tools or external dependencies are required.

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
