import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results } = useSearchRestaurant(searchState, city);
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const setSearchOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
      selectedCuisines: [],
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  if (!results?.data || !city) return <span>No Results Found</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        <CuisinesFilter
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisines or Restaurant name"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSearchOption(value)}
          />
        </div>
        {results.data.map((restaurant, index) => (
          <SearchResultCard restaurant={restaurant} key={index} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
