import ButtonAddRemoveSneaker from "./ButtonAddRemoveSneaker"
const CardInCart = ({ id, name, photo, price, count, idInCart, deleteCardFromCart, setFullPrice, addCardinCart, fullPrice }) => {
    return (
        <div className="cartItem">
            <img width={70} src={photo} alt="Sneakers" />
            <div className="textCart">
                <p>{name}</p>
                <b>{price} руб.</b>
            </div>
            <div className="right">

                <ButtonAddRemoveSneaker id={id} count={count} name={name}
                    photo={photo} price={price} idInCart={idInCart}
                    deleteCardFromCart={deleteCardFromCart}
                    setFullPrice={setFullPrice}
                    addCardinCart={addCardinCart}
                    fullPrice={fullPrice}
                    centerCount={1} />
            </div>
        </div>
    )
}

export default CardInCart