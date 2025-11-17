# GEO‑TRIVIA Games
<img width="1922" height="679" alt="Screenshot 2025-11-16 at 10 16 33 PM" src="https://github.com/user-attachments/assets/a0962377-7d73-4e15-ad63-b3e6134a36be" />


## Live Site
- Netlify: https://geo-trivia-game.netlify.app/
Map. Guess. Conquer. Arrange five cities by population (left most populated to right least populated) to conquer each continent and earn medals.
<img width="1918" height="796" alt="Screenshot 2025-11-16 at 10 17 02 PM" src="https://github.com/user-attachments/assets/b4e54273-03be-463e-9e8e-5f9513a67c5e" />




## Features
- 6 continents: North America, South America, Europe, Africa, Asia, Australia
- Drag‑and‑drop city cards
- Victory banner and medals
- Responsive layout, custom badges, and icons
<img width="1919" height="759" alt="Screenshot 2025-11-16 at 10 19 58 PM" src="https://github.com/user-attachments/assets/d4e47c82-5392-4214-9507-a5d38f2742d7" />

## Tech Stack
- React (often scaffolded with Vite)
- @dnd-kit for drag & drop
- JavaScript/TypeScript
- HTML & CSS

## Project Structure
geo-trivia-game
geo-trivia-game/public
geo-trivia-game/public/vite.svg
geo-trivia-game/src
geo-trivia-game/src/App.jsx
geo-trivia-game/src/CityCards.jsx
geo-trivia-game/src/Columns.jsx
geo-trivia-game/src/Nav.jsx
geo-trivia-game/src/Population.jsx
geo-trivia-game/src/assets
geo-trivia-game/src/columnsArray.js
geo-trivia-game/src/coordinates.js
geo-trivia-game/src/index.css
geo-trivia-game/src/main.jsx
geo-trivia-game/src/population.css
geo-trivia-game/vite.config.js


## Getting Started
1. Install dependencies
   bash
   npm install
 
2. Run locally
   bash
   npm run dev

3. Open

   http://localhost:5173


## Environment
Use HTTPS for any external APIs to avoid mixed‑content errors in production. For GeoNames:

VITE_GEONAMES_USER=your_username

fetch(`https://api.geonames.org/citiesJSON?north=${north}&south=${south}&east=${east}&west=${west}&lang=en&username=${import.meta.env.VITE_GEONAMES_USER}`) 


## Gameplay
1. Select a continent.
2. Arrange the five cities by population from left (most) to right (least).
3. When correct, the banner confirms conquest and a medal is awarded.

## Author

Victor Stanton
Software Engineer
Email: Victor.Stanton@gmail.com

## License

MIT License © 2025 Victor Stanton
