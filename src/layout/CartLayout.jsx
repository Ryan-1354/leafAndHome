import { Outlet, NavLink } from "react-router-dom";
import Footer from "./Footer";
import mark from "/mark.svg";

function CartLayout() {
  return (
    <>
      <header>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex py-4 align-items-end">
            <NavLink to="/" className="h3 d-flex align-items-center">
              <img src={mark} alt="logo" className="me-2" />
              <span className="text-underline">觀葉森活</span>
            </NavLink>
            <h5>|購物車頁</h5>
          </div>
          <div className="border">結帳進度圖示</div>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
export default CartLayout;
