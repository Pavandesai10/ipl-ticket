import { useState } from "react";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>⚽ MatchBook</h2>
      <div>
        <a href="#home">Home</a>
        <a href="#matches">Matches</a>
        <a href="#bookings">My Bookings</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <h1>Book Your Matchday</h1>
      <p>Experience the excitement of live football.</p>
    </section>
  );
}

function MatchCard({ match, onBook, isBooked }) {
  return (
    <div className="match-card">
      <h2>{match.team1} vs {match.team2}</h2>
      <p>📅 {match.date}</p>
      <p>🏟️ {match.stadium}</p>
      <p>🎟️ ₹{match.price}</p>
      <button onClick={onBook}>
        {isBooked ? "Booked ✓" : "Book Ticket"}
      </button>
    </div>
  );
}

function App() {
  const [bookedMatches, setBookedMatches] = useState([]);

  const matches = [
    {
      team1: "Barcelona",
      team2: "Real Madrid",
      date: "28 November 2026",
      stadium: "Camp Nou",
      price: 2500,
    },
    {
      team1: "Manchester City",
      team2: "Arsenal",
      date: "30 November 2026",
      stadium: "Etihad Stadium",
      price: 1800,
    },
    {
      team1: "Liverpool",
      team2: "Chelsea",
      date: "2 December 2026",
      stadium: "Anfield",
      price: 2000,
    },
  ];

  const handleBooking = (matchName) => {
    setBookedMatches((prev) => [...prev, matchName]);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <section className="matches" id="matches">
        <h1>Upcoming Matches</h1>

        <p className="booking-count">
          Tickets booked: {bookedMatches.length}
        </p>

        <div className="match-list">
          {matches.map((match, index) => {
            const matchName = `${match.team1} vs ${match.team2}`;
            const isBooked = bookedMatches.includes(matchName);

            return (
              <MatchCard
                key={index}
                match={match}
                isBooked={isBooked}
                onBook={() => handleBooking(matchName)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;