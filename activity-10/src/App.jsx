import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase.js";

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
      <p>🏟️ {match.venue}</p>
      <p>🎟️ ₹{match.price}</p>

      <button onClick={onBook} disabled={isBooked}>
        {isBooked ? "Booked ✓" : "Book Ticket"}
      </button>
    </div>
  );
}

function App() {
  const [matches, setMatches] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: matchData, error: matchError } =
      await supabase.from("matches").select("*");

    const { data: bookingData, error: bookingError } =
      await supabase
        .from("bookings")
        .select("*")
        .eq("user_name", "Pavan Desai");

    if (matchError) {
      console.error("Error fetching matches:", matchError);
    } else {
      setMatches(matchData || []);
    }

    if (bookingError) {
      console.error("Error fetching bookings:", bookingError);
    } else {
      setMyBookings(bookingData || []);
    }

    setLoading(false);
  }

  async function handleBooking(match) {
    const alreadyBooked = myBookings.some(
      (booking) => booking.match_id === match.id
    );

    if (alreadyBooked) {
      alert("You have already booked this match!");
      return;
    }

    const matchName = `${match.team1} vs ${match.team2}`;

    const { error } = await supabase
      .from("bookings")
      .insert({
        match_id: match.id,
        user_name: "Pavan Desai",
        match_title: matchName,
        tickets: 1,
        total_price: match.price,
      });

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    await fetchData();
    alert("Booking confirmed!");
  }

  async function handleCancel(booking) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", booking.id);

    if (error) {
      alert("Cancellation failed: " + error.message);
      return;
    }

    await fetchData();
    alert("Booking cancelled successfully!");
  }

  const bookedMatchIds = myBookings.map(
    (booking) => booking.match_id
  );

  return (
    <>
      <Navbar />
      <Hero />

      <section className="matches" id="matches">
        <h1>Upcoming Matches</h1>

        <p className="booking-count">
          Tickets booked: {myBookings.length}
        </p>

        {loading ? (
          <p>Loading matches...</p>
        ) : (
          <div className="match-list">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isBooked={bookedMatchIds.includes(match.id)}
                onBook={() => handleBooking(match)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="bookings" id="bookings">
        <h2>My Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : myBookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="match-list">
            {myBookings.map((booking) => {
              const match = matches.find(
                (m) => m.id === booking.match_id
              );

              return (
                <div className="match-card" key={booking.id}>
                  <h2>
                    {match
                      ? `${match.team1} vs ${match.team2}`
                      : booking.match_title}
                  </h2>

                  {match && (
                    <>
                      <p>📅 {match.date}</p>
                      <p>🏟️ {match.venue}</p>
                    </>
                  )}

                  <p>🎟️ Tickets: {booking.tickets}</p>
                  <p>💰 Total: ₹{booking.total_price}</p>
                  <p>✓ Booking Confirmed</p>

                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(booking)}
                  >
                    Cancel Booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
