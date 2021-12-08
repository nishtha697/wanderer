import React, { useEffect, useState } from "react";
import SearchResults from "../SearchResults";
import mapboxGl from "mapbox-gl";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import "./index.css";
import Map from "../Map";
import SearchComponent from "../SearchComponent";

const HomeScreen = () => {
  let [search, setSearch] = useState("");
  let [isSearched, setIsSearched] = useState(false);
  let [address, setAddress] = useState({});
  const [posts, setPosts] = useState([]);

  let [lat, setLat] = useState(null);
  let [lng, setLng] = useState(null);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const _suggestionSelect = (result, lat, lng, text) => {
    setSearch(result);
    const lt = Number(lat);
    const lang = Number(lng);
    setLat(lt);
    setLng(lang);

    setIsSearched(true);
  };

  // useEffect(() => {
  //   fetch(SEARCH_API)
  //     .then((res) => res.json())
  //     .then((p) => setPosts(p));
  // }, []);

  const handleSearchClick = () => {
    setIsSearched(true);
  };

  // if (isSearched) {
  //   return <SearchComponent lat={lat} lng={lng} />;
  // }

  return (
    <div>
      <MapboxAutocomplete
        publicKey="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
        inputClass="form-control search"
        onSuggestionSelect={_suggestionSelect}
        country="us"
        resetSearch={true}
      />

      <button
        onClick={handleSearchClick}
        className="btn btn-success ms-2 float-end"
      >
        Search
      </button>
    </div>
  );
};

export default HomeScreen;
