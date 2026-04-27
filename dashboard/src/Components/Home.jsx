
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

function Home() {
  return (
    <>
      <TopBar />
      <Dashboard className="col-span-4" />
    </>
  );
};

export default Home;