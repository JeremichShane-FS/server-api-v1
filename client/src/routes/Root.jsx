import { Outlet } from "react-router-dom";
import { Footer, Header } from "../layout";

export const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
