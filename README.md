
## Features

* **Pomodoro Timer:** Fully functional focus timer with customizable sessions, short breaks, and long breaks to maintain optimal productivity.
* **Task Management (To-Do):** Integrated task list to keep track of daily goals alongside your active focus sessions.
* **Ambient Music Player:** Built-in audio player featuring relaxing background sounds (`Rain`, `Forest`, `Calm`) to help you get into the zone.
* **Statistics Tracking:** Visualizes your productivity data to help you analyze your focus habits over time.
* **Motivational Quotes:** Displays carefully curated quotes to keep you inspired during hard work sessions.
* **Authentication Flow:** Complete UI setup for Login, Registration, and Password Reset pages.

## Tech Stack & Architecture

* **Frontend:** HTML5, **Tailwind CSS** (for rapid, utility-first styling).
* **Logic:** Vanilla JavaScript (ES6+).
* **Bundler:** **Parcel** (for lightning-fast, zero-config application bundling).
* **Architecture:** Strict **MVC (Model-View-Controller)** pattern. The project cleanly separates business logic (`models`), user interface components (`views` like `TimerView`, `MusicPlayerView`, `ToDoView`), and application flow (`controllers`/`app.js`).

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:
   ```bash
   git clone [https://github.com/romannexus/Focus-Hub.git](https://github.com/romannexus/Focus-Hub.git)
   ```
2. Navigate to the project directory:
   ```bash
   cd Focus-Hub
   ```
3. Install dependencies (including Parcel and Tailwind):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   *(Note: This runs the Parcel bundler. If your package.json script is different, you can also run `npx parcel index.html`)*

## 🔮 Future Roadmap

**React Migration:** This Vanilla JS version serves as the foundational MVP. The next major phase for this project is a complete migration to **React**, implementing:
* `React Router` for seamless Single Page Application (SPA) navigation.
* `Context API` / `Redux` for robust global state management (especially for the timer and audio player).
* Custom Hooks (e.g., `useTimer`, `useAudio`) to encapsulate complex logic.

---
*Designed and built to make deep work accessible and enjoyable.*
