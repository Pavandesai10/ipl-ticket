document.addEventListener("DOMContentLoaded", function () {

    const match = document.getElementById("match");
    const category = document.getElementById("category");
    const quantity = document.getElementById("quantity");

    const prices = {
        general: 2000,
        premium: 4000,
        vip: 7500,
    };

    function updateSummary() {
        const price = prices[category.value] || 0;
        const count = Number(quantity.value) || 0;

        document.getElementById("summaryMatch").textContent =
            match.options[match.selectedIndex].text;

        document.getElementById("summaryCategory").textContent =
            category.options[category.selectedIndex].text;

        document.getElementById("summaryPrice").textContent = "₹" + price;

        document.getElementById("summaryQuantity").textContent = count;

        document.getElementById("summaryTotal").textContent =
            "₹" + (price * count);
    }

    match.addEventListener("change", updateSummary);
    category.addEventListener("change", updateSummary);
    quantity.addEventListener("input", updateSummary);

    updateSummary();

});