import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Crypto() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR`
        );
        const sortedData = response.data.sort((a,b)=>{
            return sortOrder==="asc"?a.market_cap-b.market_cap: b.market_cap-a.market_cap;
          });
          setData(sortedData);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, sortOrder]);

  const handlePageChange=(pageNumber)=>{
    setCurrentPage(pageNumber);
  };

  const handleSort =()=>{
    setSortOrder(sortOrder==="asc"?"desc":"asc");
  };

  const LastCoin =currentPage*coinsPerPage;
  const FirstCoin =LastCoin-coinsPerPage;
  const currentCoins = data.slice(FirstCoin, LastCoin);

  return (
    <div className="App">
      
     
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {currentCoins.map((element,index) => (
            <tr key={index}>
              <td>
                <div className="crydiv">
                  <img className="cryimg" src={element.image} alt="" />
                  <div>
                    <h2>{element.symbol}</h2>
                    <p>{element.name}</p>
                  </div>
                </div>
              </td>
              <td>₹{element.current_price}</td>
              <td style={{color: element.price_change_percentage_24h>0? "green":"red",fontWeight:"bold"}}>
                {element.price_change_percentage_24h}%
              </td>
              <td>₹{element.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({length: Math.ceil(data.length/coinsPerPage)}, (_,i) =>i+1).map((pageNumber)=>(
          <button onClick={()=>handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}

       <select onChange={handleSort} name="sort" id="sort">
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
      </div>
    </div>
  );
}

export default Crypto;


