import { MainNav, Footer } from "../../components";
import { Outlet } from "react-router";

const RootPage = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootPage;
