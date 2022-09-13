import React, { useState } from "react";
import * as NS from "../../utils/nameService";
import * as Styles from "./styles";
import Success from "../Success";
import Error from "../Error";

function Search() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      searchDNS();
    }
  };

  const resetState = () => {
    error && setError("");
    success && setSuccess("");
  };

  const searchDNS = () => {
    // Reset any existing messages
    resetState();

    if (query) {
      let errorMessage: string = "";
      let successMessage: string = "";

      setLoading(true);

      NS.getAsset(query)
        .then((data) => {
          const nsRecord: NS.Record | boolean = NS.isRecord(data);

          // JSON file is linked in asset description, get its content
          if (typeof nsRecord !== "boolean" && nsRecord.protocol === "json") {
            return NS.getJSON(nsRecord.url);
          }

          return data;
        })
        .then((data) => {
          setLoading(false);

          const nsRecord: NS.Record | boolean = NS.isRecord(data);

          if (typeof nsRecord !== "boolean") {
            switch (nsRecord.protocol) {
              case "http":
              case "email":
                successMessage = nsRecord.url;
                break;
              case "custom":
                errorMessage = "This DNS record is not supported yet!";
                break;
              default:
                errorMessage = "This DNS record is not recognized!";
                break;
            }
          } else {
            if (data.error !== "Asset not found" && data !== "Network Error") {
              errorMessage = "No DNS associated with this asset. Please try again!";
            } else {
              errorMessage = data.error ?? data;
            }
          }

          if (successMessage) {
            setSuccess(successMessage);
          } else if (errorMessage) {
            setError(errorMessage);
          }
        });
    }
  };

  return (
    <>
      <Styles.Input
        className="App-input"
        type="text"
        name="query"
        placeholder="Type in a Bitcoin DNS Asset name"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={query}
        autoComplete="off"
      />
      {!loading && <Styles.Search className="App-search" onClick={searchDNS} />}
      {loading && <Styles.Spinner className="App-spinner" />}
      {success && <Success url={success} />}
      {error && <Error>{error}</Error>}
    </>
  );
}

export default Search;
