import React, {useRef, useEffect} from "react";
import '../../css/main.css'
const SearchBar = props => {
  const inputRef = useRef(null);

  useEffect(()=>{
    if(props.focus){
      inputRef.current.focus();
    }
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
    <div className="searchBarLayout">
      <div className="searchBarForm"><input
        ref={inputRef}
        id="ingredientSearchBox"
        className="w3-input w3-border"
        type="text"
        placeholder={props.placeholder || "Search"}
        onKeyDown={event => submitIfEnter(event)}
      />
      </div>
      <div className="searchBarButton">
      <button
        onClick={() =>
          props.searchFunction(inputRef.current.value)
        }
        className="w3-green searchButton fa fa-search"
      > Search
      
      </button>
      </div>
      </div>
    </>
  );
};

export default SearchBar;
