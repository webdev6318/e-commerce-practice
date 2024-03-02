import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let amount = 0

      cartList.map(item => {
        const totalPrice = item.price * item.quantity
        amount = amount + totalPrice
      })

      const len = cartList.length

      return (
        <div className="summary-container">
          <div className="summary-box">
            <h1 className="summary-heading">
              <span className="summary-text">Order Total:</span> Rs {amount}/-
            </h1>
            <p className="summary-para">{len} Items in cart</p>
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
