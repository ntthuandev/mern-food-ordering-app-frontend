import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const handleSeachSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-3xl font-bold tracking-tight text-orange-500">
          Tuck into takeway today
        </h1>
        <span className="text-xl">Food is just a click away</span>

        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSeachSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landingImage" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Download the Food App for faster ordering and personalised
            recommendation
          </span>
          <img src={appDownloadImage} alt="appDownloadImage" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
