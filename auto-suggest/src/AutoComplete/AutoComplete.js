import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const AutoComplete = () => {
  const [data, setData] = useState([]);
  const [addressValues, setAddressValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const merged = useRef([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/backend/v1/config/queue-order"
      );
      console.log("response", response);
      if (response) {
        console.log("response", response);
        const result = await response?.data;
        console.log("result", result);
        const apiData = await result?.data;
        console.log("apiData", apiData);
        setData(apiData);
      }
      //   merge of api
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("data", data);

  const handleChange = (e) => {
    console.log("Hello");
    let suggestions = [];
    setInputValue(e.target.value);
    console.log("inputValue", inputValue);
    if (inputValue.length === 0) {
      setSuggestion([]);
    } else {
      const regex = new RegExp(`^${inputValue}`, `i`);
      console.log("addressValues inside elses", addressValues);
      suggestions = addressValues.sort().filter((v) => {
        console.log("v", v);
        return regex.test(v);
      });
      setSuggestion(suggestions);
      console.log("suggestion", suggestions);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // You cannot use state value right after setValue() b.c it is asynce
  // If you want to use the value , then you have to use useEffect and pass the value as a dependency

  useEffect(() => {
    const filterData = data.map((item) => {
      return item.orders.map((order) => {
        return order.address;
      });
    });
    merged.current = [].concat.apply([], filterData);
    console.log("mergeed", merged);
    setAddressValues(merged.current);
    console.log("addressValues", addressValues);
    console.log("inputValue", inputValue);
  }, [data]);

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
      <h3>AutoComplete 1</h3>
      <input type="text" onChange={handleChange} value={inputValue} />
      {renderSuggestions()}
    </div>
  );
};

export default AutoComplete;
