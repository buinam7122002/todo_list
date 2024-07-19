import { useState } from "react";
import { filterName, filterStatus } from "../../reducers";
const Search = () => {
    const [searchOption, setSearchOption] = useState<string>("todo");
    const [searchValue, setSearchValue] = useState<string>('');
    const handleSearch = () => {
        if (searchValue && searchOption === "todo") {
            filterName(searchValue)
        }
        else if (searchOption === "status") {
            filterStatus(searchValue)
        }
    };
    return (
        <div>
            <select style={{ padding: "8px 12px" }} value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                <option value="todo">Name</option>
                <option value="status">Status</option>
            </select>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search
