import React, {useRef, useEffect} from "react";

const SearchBar = props => {
  const inputRef = useRef(null);

  useEffect(()=>{
    inputRef.current.focus();
    if(props.clearBar)
    {
      inputRef.current.value="";
    }
  });

  const submitIfEnter = event => {
    if (typeof props.overrideFunction === 'undefined') {
      if(event.key === "Enter"){
        props.searchFunction(event.target.value);
      }
    }else{
      props.overrideFunction(event);
    }
  };
  return (
    <>
      <input
        ref={inputRef}
        id="ingredientSearchBox"
        className="w3-input w3-border"
        type="text"
        placeholder={props.placeholder || "search"}
        onKeyDown={event => submitIfEnter(event)}
      />
      <button
        onClick={() =>
          props.searchFunction(inputRef.current.value)
        }
        className="w3-button w3-green "
      >
        search
      </button>
    </>
  );
};

export default SearchBar;
