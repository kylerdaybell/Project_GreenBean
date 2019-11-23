import React from "react";

const SearchBar = props => {
  const submitIfEnter = event => {
    if (event.key === "Enter") {
      props.searchFunction(event.target.value);
    }
  };
  return (
    <>
      <input
        id="ingredientSearchBox"
        className="w3-input w3-border"
        type="text"
        placeholder={props.placeholder || "search"}
        onKeyDown={event => submitIfEnter(event)}
      />
      <button
        onClick={() =>
          props.searchFunction(
            document.getElementById("ingredientSearchBox").value
          )
        }
        className="w3-button w3-green "
      >
        search
      </button>
    </>
  );
};

export default SearchBar;
