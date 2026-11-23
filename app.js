import{ supabase } from "./supabase.js"

async function testSupabaseMatches() {
    const { data, error } = await supabase
        .from("matches")
        .select("*");

    if (error) {
        console.error("Supabase error:", error);
        return;
    }

    console.log("Matches fetched from Supabase:", data);
}

testSupabaseMatches();
console.log("APP JS IS LOADED");
function showToast(message) {
    const toast = document.createElement("div");

    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #101b3f;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 16px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

window.scrollToBooking = function() {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Let's book your IPL tickets!");
};
showToast("Toast notification is working!");

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const matchId = Number(matchSelect.value);
    const matchTitle = matchSelect.options[matchSelect.selectedIndex].text;
    const userName = document.getElementById("name").value;
    const tickets = Number(quantityInput.value);
    const totalPrice = ticketPrices[categorySelect.value] * tickets;

    const { data, error } = await supabase
        .from("bookings")
        .insert([{
            match_id: matchId,
            user_name: userName,
            match_title: matchTitle,
            tickets: tickets,
            total_price: totalPrice
        }]);

    if (error) {
        console.error("Booking error:", error);
        showToast("Booking failed!");
        return;
    }

    showToast("Booking confirmed successfully!");
    bookingForm.reset();
    updateBookingSummary();
});



const matchSelect = document.getElementById("match");
const categorySelect = document.getElementById("category");
const quantityInput = document.getElementById("quantity");

const ticketPrices = {
    general: 1000,
    premium: 2500,
    vip: 5000
};

function updateBookingSummary() {
    const matchName = matchSelect.options[matchSelect.selectedIndex].text;
    const categoryName = categorySelect.options[categorySelect.selectedIndex].text;
    const categoryValue = categorySelect.value;
    const quantity = Number(quantityInput.value);

    const price = ticketPrices[categoryValue];
    const total = price * quantity;

    document.getElementById("summaryMatch").textContent = matchName;
    document.getElementById("summaryCategory").textContent = categoryName;
    document.getElementById("summaryPrice").textContent = "₹" + price;
    document.getElementById("summaryQuantity").textContent = quantity;
    document.getElementById("summaryTotal").textContent = "₹" + total;

    showToast("Booking summary updated!");
}

matchSelect.addEventListener("change", updateBookingSummary);
categorySelect.addEventListener("change", updateBookingSummary);
quantityInput.addEventListener("input", updateBookingSummary);

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

navMenu.style.setProperty("display", "none", "important");

menuToggle.onclick = function () {
    if (navMenu.style.display === "none") {
        navMenu.style.setProperty("display", "flex", "important");
    } else {
        navMenu.style.setProperty("display", "none", "important");
    }
};
