import { useState } from "react";
import CardInCart from "./CardInCart";

import { CSSTransition } from "react-transition-group";

function Drawer({ fullPrice, sneakersInCart, onClickCart, deleteCardFromCart, setFullPrice, addCardinCart, isOpenCart, setSneakersInCart }) {
  const [buy, setBuy] = useState(false);
  return (
    <div className={`wrapperOverlay ${isOpenCart ? "eventYes" : ''}`}>
      <CSSTransition in={isOpenCart} classNames='alert' timeout={300}
        unmountOnExit>
        <div className="overlay">
          <div className="exitCart" onClick={() => {
            onClickCart(false);
            setTimeout(() => setBuy(false), 300);
          }}></div>
          <div className="drawer">
            {!buy ? <div className="mainDrawer">
              <h2>
                Корзина
                <img onClick={() => {
                  onClickCart(false);
                  setTimeout(() => setBuy(false), 300);
                }} className="remove" width={32} src="/img/btn-remove.svg" alt="Remove" />
              </h2>
              {fullPrice > 0 ?
                <>
                  <div className="items">
                    {sneakersInCart.map((obj, index) => (
                      <CardInCart key={index} {...obj} idInCart={1}
                        deleteCardFromCart={deleteCardFromCart}
                        setFullPrice={setFullPrice}
                        addCardinCart={addCardinCart}
                        fullPrice={fullPrice} />
                    ))}
                  </div>

                  <div className="cartTotalBlock">
                    <ul>
                      <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{Math.floor(fullPrice * 0.05)} руб.</b>
                      </li>
                      <li>
                        <span>Итого: </span>
                        <div></div>
                        <b>{fullPrice + Math.floor(fullPrice * 0.05)} руб.</b>
                      </li>
                    </ul>
                    <button onClick={() => {
                      setBuy(true);
                      setFullPrice(0);
                      setSneakersInCart([]);
                    }}
                      className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
                  </div>
                </>
                :
                <div className="emptyCart">
                  <img src="/img/empty-cart.jpg" alt="EmptyCart"></img>
                  <h3>{"Корзина пуста"}</h3>
                  <p>Это значит, что самое время что-то туда добавить!</p>
                  <button onClick={() => onClickCart(false)} className="greenButton">
                    Вернуться назад
                  </button>
                </div>
              }
            </div>
              :
              <div className="wrapperBought">
                <div className="bought">
                  <img src="/img/complete_order.png" alt="Complete Order"></img>
                  <h3>Спасибо за покупку</h3>
                  <button onClick={() => {
                    onClickCart(false);
                    setTimeout(() => setBuy(false), 300);
                  }} className="greenButton">
                    Вернуться назад
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Drawer;