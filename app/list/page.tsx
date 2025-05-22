
import SearchContainer from "@/containers/layout-wrapper/search-container";


export default async function ListPage() {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h3 className="fw-bold text-center mb-3">List of Github Repositories</h3>
        <SearchContainer />

      </div>
    </div>
  );
}