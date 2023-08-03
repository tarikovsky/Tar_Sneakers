import React from 'react'
// Кнопочки для добавления и удаления кроссовка из стейта с кроссовками для корзины
// Если мы нашли кроссовок в карзине (idInCart !== -1), то надо еще рендерить кнопку минуса
// Если (centerCount===1), то есть эта функция вызвана из корзины, то мы немного меняем ее внешний вид
// добаваляя класс buttonWithCenterCount
// При нажатии на минус удаляем кроссовок из массива с кроссовками для корзины и меняем полную стоимость
// При нажатии на плюс добавляем кроссовок в массив с кроссовками для корзины и меняем полную стоимость
function ButtonAddRemoveSneaker({id,count,name,photo,price,idInCart,deleteCardFromCart,setFullPrice,addCardinCart,fullPrice, centerCount}) {
    return (
        <button className={`button ${idInCart !== -1 ? "added" : ''} ${centerCount===1 && "buttonWithCenterCount"}`} >
            {idInCart !== -1 && <img width={32} height={32} src={`/img/button_minus_nice_white.svg`} alt="Minus" onClick={() => {
                deleteCardFromCart(id, count);
                setFullPrice(fullPrice - price);
            }} />}
            {centerCount===1 && <span className='centerCount'>{count}</span>}
            <img width={32} height={32} src={`/img/button_plus_nice${count>0 ? "_white" : ''}.svg`} alt="Plus" onClick={() => {
                if (count < 9) {
                    addCardinCart(id, count, name, photo, price);
                    setFullPrice(fullPrice + price);
                }
            }} />
        </button>
    )
}

export default ButtonAddRemoveSneaker