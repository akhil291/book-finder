📚 Book Finder — Take-Home Challenge

Author: Pendyala Akhilananda
Framework: React
Styling: CSS
API Used: Open Library Search API

🧠 About the Project

Book Finder is a user-friendly web application that allows users to:

Search books by title using the Open Library API

See book details (title, authors, year, cover)

Add or remove books from a Favorites section (persisted in localStorage)

Visit the book’s page on Open Library

This project is built to fulfil the challenge by:

Interpreting the user need (Alex, college student, wants to search books)

Designing a clean, responsive UI

Implementing React functional components + hooks

Handling API calls, state management, pagination, error/loading states

🚀 Features

✔ Search by book title
✔ Paginated result loading (“Load more”)
✔ Favorites toggling, saved in localStorage
✔ Responsive layout for mobile and desktop
✔ Clear error and empty-state handling

🛠️ Tech Stack

React (functional components + hooks)

CSS3 (custom variables, grid/flex, gradients)

Open Library Search API

📦 Folder Structure
src/
├── components/
│   ├── BookCard.jsx  
│   ├── BookList.jsx  
│   └── SearchBar.jsx  
├── App.jsx  
├── index.jsx  
├── styles.css  
└── utils.js  

💡 How It Works

User enters a title in the search bar

App fetches https://openlibrary.org/search.json?title={bookTitle}

Displays results in card format with cover (if available)

User can click “Add to favourites” / “Unfavourite”

Favourites are stored with key bf_favs in localStorage

More results can be loaded via “Load more”

If no results or network error, user sees an appropriate message

🔗 Live Demo

🔗 Live App: https://n3zcmd.csb.app/


🧑‍💻 How to Run Locally
# Clone or download the project  
npm install  
npm start  


Then open: http://localhost:3000

🏁 Conclusion

Built by Pendyala Akhilananda to fulfil Levels 1, 2 & 3 of the challenge: AI-assisted design, working app, code sharing.