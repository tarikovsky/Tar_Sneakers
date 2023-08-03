import React from 'react'
import { CSSTransition } from "react-transition-group";
import ButtonAddRemoveSneaker from './ButtonAddRemoveSneaker';

function Card({ fullPrice, setFullPrice, sneakersInCart, id, name, photo, price, addCardinCart, deleteCardFromCart, addRemoveFavourite, favourite }) {
    let idInCart = -1;
    let count = 0;

    //Проверяем есть ли данная карта в массиве с кроссовками для корзины
    for (let i = 0; i < sneakersInCart.length; i++) {
        if (sneakersInCart[i].id === id) {
            idInCart = i;
            count = sneakersInCart[i].count;
            break;
        }
    }

    //Проверяем есть ли данная карта в массиве с лайкнутыми кроссовками
    const findInFavorite = () => {
        if (favourite.length === 0)
            return 0;
        else {
            if (favourite.find((obj) => obj.id === id))
                return 1;
            else
                return 0;
        }
    }
    return (
        <div className="card">
            <img className='mainPhoto' src={photo} alt="" />
            <CSSTransition in={idInCart !== -1} classNames='aletrOverlay' timeout={300}
                unmountOnExit>
                <div className='wrapperCardOverlay'>
                    <div className='cardOverlay'>

                    </div>
                    <p className='countAdd'>{idInCart !== -1 ? count : '1'}</p>
                </div>
            </CSSTransition>
            <h5>{name}</h5>
            <div className="cardBottom">
                <div className='leftCardBottom'>
                    <b>{price}р.</b>
                </div>
                <ButtonAddRemoveSneaker id={id} count={count} name={name} photo={photo} price={price} idInCart={idInCart} deleteCardFromCart={deleteCardFromCart} setFullPrice={setFullPrice} addCardinCart={addCardinCart} fullPrice={fullPrice} />
            </div>
        <img onClick={() => addRemoveFavourite(id)} className={`favorite ${findInFavorite() !== 0 ? "fAdded" : ''}`} width={20} src={`/img/like${findInFavorite() !== 0 ? 'd' : ''}${idInCart !== -1 ? "_white" : ''}.svg`} alt='like' />
        </div>
    );
}

export default Card;