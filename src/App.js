import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = (id, qty) => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: qty}
      }
      return item
    })
    console.log(updatedList)
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = (id, qty) => {
    if (qty !== 0) {
      const {cartList} = this.state
      const updatedList = cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: qty}
        }
        return item
      })

      this.setState({cartList: updatedList})
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const currProduct = cartList.find(item => item.id === product.id)
    if (currProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const filteredList = cartList.filter(item => item.id !== currProduct.id)
      const updatedProduct = {
        ...currProduct,
        quantity: currProduct.quantity + product.quantity,
      }
      console.log(updatedProduct)
      this.setState({
        cartList: [...filteredList, updatedProduct],
      })
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(item => item.id !== id)
    this.setState({cartList: filteredList})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
