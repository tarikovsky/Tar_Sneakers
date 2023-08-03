import Card from "./components/Card.js";
import Header from "./components/Header.js";
import Drawer from "./components/Drawer.js";
import { useState, useEffect } from "react";
import CardSkeleton from "./components/CardSkeleton.js";
import Slide from "./components/Slide.js";
import { Nav } from "react-bootstrap";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
const cats = ["Все", "Женские", "Мужские", "Для бега", "Для похода в горы"]

function App() {
  const [catsId, setCatsId] = useState(0);//хранит id нынешней категории [0...4]
  const [page, setPage] = useState(0);//хранит id нынешней страницы
  const [isLoading, setIsLoading] = useState(false);//Загружается ли страница
  const [sneakers, setSneakers] = useState([]);//Массив со всеми кроссовками с бэкэнда
  const [searchValue, setSearchValue] = useState('');//Хранит значения поиска в inpute
  const [isOpenCart, setIsOpenCart] = useState(false);//Открыта ли сейчас корзина
  const [sneakersInCart, setSneakersInCart] = useLocalStorage([], 'cart');//Массив со всеми кроссовками для корзины. Берем из LovcalStorage
  const [favourite, setFavourite] = useLocalStorage([], 'favourite');//Массив со всеми лайкнутыми кроссовками. Берем из LovcalStorage
  const [fullPrice, setFullPrice] = useLocalStorage(0, 'fullprice');//Полная стоимость покупки. Берем из LovcalStorage

  //Обращаемся к бэкэнду (в данном случае mockapi.io, не лучший выбор, потому что там неудобная пагинация)
  //Заполняем массив с кроссовками в зависимости от выбранной страницы, категории и поиска 
  useEffect(() => {
    setIsLoading(true);
    const current_category = catsId !== 0 ? `category=${catsId}` : '';
    const url_search = searchValue !== '' ? `filter=${searchValue}` : '';
    fetch(`https://64b1e929062767bc4826b20a.mockapi.io/cneakers?page=${page + 1}&limit=9&${current_category}&${url_search}`)
      .then((res) => res.json())
      .then((json) => {
        setSneakers(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить данные о кроссаз');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [catsId, page, searchValue])
  const onClickCart = (val) => {
    setIsOpenCart(val);
  }
  //функция добавления кроссовка в корзину
  const addCardinCart = (_id, _count, _name, _photo, _price) => {
    console.log(_id);
    let newArr = Object.assign([], sneakersInCart);
    if (_count === 0) {//если кроссовка не было в массиве, то добавляем его
      newArr.push({
        id: _id,
        count: 1,
        name: _name,
        photo: _photo,
        price: _price
      });
    }
    else {//иначе ищем и увеличиваем количество на 1
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].id === _id) {
          newArr[i].count += 1;
          break;
        }
      }
    }
    setSneakersInCart(newArr)
  }
  console.log(sneakersInCart);
  //функция удаления кроссовка из корзины
  const deleteCardFromCart = (_id, _count) => {
    let newArr = Object.assign([], sneakersInCart);
    if (_count > 1) {//если колличество штук кроссовок больше 1, то ищем и уменьшаем количество
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].id === _id) {
          newArr[i].count -= 1;
          break;
        }
      }
    }
    else {//иначе (если остался последний кроссовок) - ищем и удаляем из массива
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].id === _id) {
          newArr.splice(i, 1);
          break;
        }
      }
    }
    setSneakersInCart(newArr)
  }


  //функция добавления и удаления понравившихся кроссовок
  const addRemoveFavourite = (_id) => {
    let newArr = Object.assign([], favourite);
    let find = false;
    if (newArr.length > 0) {//если массив с понравившимися кроссовками не пустой
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].id === _id) {//если там уже есть данный кроссовок то удаляем его
          newArr.splice(i, 1);
          find = true;
          break;
        }
      }
      if (!find) {//если кроссовок не был найден, то добавляем его
        newArr.push({
          id: _id
        })
      }
    }
    else {//если же массив вообще оказался пустой, то просто добавляем туда кроссовок
      newArr.push({
        id: _id
      })
    }
    setFavourite(newArr);
  }


  //этот массив хранит сколько кроссовок в каждой категории,
  //где 0-ой элемент - количество всех кроссовок

  //сделано это, потому что mockapi.io не может сам подсчитывать нужное количество кроссовок(
  //этот массив нужен для того, чтобы расчитывать какое количество страниц надо отображать для каждой категории
  const countSneakersCategory = [48, 12, 12, 18, 4]
  return (
    <div className={`main`}>
      {/* Хедер */}
      <Header fullPrice={fullPrice} onClickCart={onClickCart}
        cats={cats}
        setCatsId={setCatsId}
        setPage={setPage}
        page={page}
        catsId={catsId}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {/* Корзина */}
      <Drawer fullPrice={fullPrice}
        sneakersInCart={sneakersInCart}
        isOpenCart={isOpenCart}
        onClickCart={onClickCart}
        deleteCardFromCart={deleteCardFromCart}
        setFullPrice={setFullPrice}
        addCardinCart={addCardinCart}
        setSneakersInCart={setSneakersInCart} />

      {/* Блок с черным кентиком */}
      <Slide setCatsId={setCatsId} setPage={setPage} />


      <div className={`wrapper`}>
        <div className="content">
          <div id={`topText`}>
            <h2>
              --{">"} Новая коллекция --{">"} {cats[catsId]}
            </h2>
          </div>
          <div className="sneakers">
            {/* Если страница загружается, то ставим скелеты вместо карточек товара */}
            {isLoading ?
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
              // Если страница загрузилось и количество sneakers больше 0 то рендерим карточки
              : sneakers.length > 0 ? sneakers
                .map((obj, index) => (
                  <Card fullPrice={fullPrice}
                    setFullPrice={setFullPrice}
                    sneakersInCart={sneakersInCart}
                    setSneakersInCart={setSneakersInCart}
                    key={index}
                    {...obj}
                    addCardinCart={addCardinCart}
                    deleteCardFromCart={deleteCardFromCart}
                    addRemoveFavourite={addRemoveFavourite}
                    favourite={favourite} />
                )) : <h2>На данной странице кросовок не найдено</h2>}
          </div>


          {/* пагинация:
          mockapi.io не может работать со страницами как хотелось бы, поэтому приходится 
          самому высчитывать количество страниц для каждой категории */}
          <ul className="selector on">
            {countSneakersCategory[catsId] > 9 &&
              [...Array(Math.ceil(countSneakersCategory[catsId] / 9))].map((_, index) => (
                <li onClick={() => setPage(index)}
                  className={`goTopText ${page === index ? "active" : ""}`}
                  key={index}>
                  {index + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
