import React from "react";

import { ReactComponent as SearchIcon } from "assets/svgs/search.svg";
import styles from "./SearchInput.module.scss";


class SearchInput extends React.Component {
    render(){
        const {searchInputValue, onBlur, onKeyDown, onChange, placeholder} = this.props;
        return(
            <div className={styles.searchBox}>
                <SearchIcon className={styles.searchIcon}/>
                <input
                className={styles.searchInput}
                type="text"
                value={searchInputValue}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={placeholder || "Search post..."}
                />
            </div>
        )
    }
}
export default SearchInput;