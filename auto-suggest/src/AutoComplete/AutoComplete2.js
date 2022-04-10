import axios from "axios";
import React, { useEffect, useState } from "react";

const AutoComplete2 = () => {
  const [data, setData] = useState();
  const [addressValues, setAddressValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  let merged = [];
  const getData = async () => {
    axios
      .get("http://localhost:3005/api/backend/v1/config/queue-order")
      .then((res) => res.data)
      .then((result) => setData(result));

    console.log("data from api", data);
    if (data) {
      const filterData = data.map((item) => {
        return item.orders.map((order) => {
          return order.address;
        });
      });
      merged = [].concat.apply([], filterData);
      setAddressValues(merged);
    }
  };
  //   console.log("data", data);
  console.log("addressValues", addressValues);
  //   console.log("inputValue", inputValue);
  //   const handleChange = (e) => {
  //     let suggestions = [];
  //     setInputValue(e.target.value);
  //     if (inputValue.length === 0) {
  //       setSuggestion([]);
  //     } else {
  //       const regex = new RegExp(`^${inputValue}`, `i`);
  //       console.log("addressValues inside elses", addressValues);
  //       suggestions = addressValues.sort().filter((v) => {
  //         console.log("v", v);
  //         return regex.test(v);
  //       });
  //       setSuggestion(suggestions);
  //       //   console.log("suggestion", suggestions);
  //     }
  //   };

  useEffect(() => {
    getData();
  }, []);

  const renderSuggestions = () => {
    if (suggestion.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestion.map((address) => (
          <li>{address}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>AutoComplete 2</h3>
      <input type="text" value={inputValue} />
      {renderSuggestions()}
    </div>
  );
};

export default AutoComplete2;
