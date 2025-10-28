document.addEventListener("DOMContentLoaded", () => {
    const addCartBtns = document.querySelectorAll(".add-cart");

    addCartBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            let cartId = localStorage.getItem("cartId");
            const productId = e.target.getAttribute("data-id");

            if (!cartId) {
                const res = await fetch("/api/carts", { method: "POST" });
                const newCart = await res.json();
                cartId = newCart._id;
                localStorage.setItem("cartId", cartId);
            }

            await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: "POST",
            });
        });
    });

    const cartLink = document.getElementById("cart-link");
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
        cartLink.href = `/carts/${cartId}`;
    }

});