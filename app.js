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