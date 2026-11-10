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