class CartDTO {
    constructor(cart) {
        this._id = cart._id;
        this.user = cart.user;  
        this.products = cart.products.map(item => ({
            product: new ProductDTO(item.product),
            quantity: item.quantity
        }));
    }
}

export default CartDTO;