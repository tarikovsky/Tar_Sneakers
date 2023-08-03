
function Header({ onClickCart, fullPrice, cats, setCatsId, setPage,page, catsId, searchValue, setSearchValue}) {
  return (
    <div className={`headerWrapper`}>
      <header>
        <div onClick={()=>window.location.reload(false)} className="headerLeft">
          <img height={15} src="/img/logo2.png" alt="Logo" />
          <div className="headerInfo">
          </div>
        </div>
        <div className="cap">
          <ul className="selector">
            {cats.map((obj, index) => (
              <li onClick={() => {
                setCatsId(index);
                setPage(0)
              }}
                className={`goTopText ${catsId === index ? "active" : ""}`}
                key={obj}>
                {obj}
              </li>
            ))}
          </ul>
        </div>
        <div className="search-block">
            <input value={searchValue} onChange={(e) => {
              setSearchValue(e.target.value);
              page!==0 && setPage(0);
              }} 
              placeholder="Поиск..." />
            <img height={20} src="/img/search.svg" alt="Search"></img>
          </div>
        <ul className="headerRight">
          <li>
            <img onClick={() => onClickCart(true)} className="littleButton" width={18} height={18} src="/img/cart.svg" alt="Cart" />
            {fullPrice > 0 && <p>{fullPrice} руб.</p>}
          </li>
          <li>
            <img className="littleButton" width={18} height={18} src="/img/user.svg" alt="User" />
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;