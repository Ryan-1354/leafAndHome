import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        setCartData(res.data.data.carts);
        console.log(res.data.data.carts);
      } catch (error) {}
    };
    fetchCartData();
  }, []);

  const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);
  const shipping = 120;
  const total = subtotal + shipping;

  return (
    <>
      <div className="container mb-5 ">
        <div className="row d-flex justify-content-between">
          <div className="col-9">
            <div className="cartSection border">
              <div className="head d-flex justify-content-between py-5 px-5 bg-secondary bg-opacity-25">
                <h3>購物車</h3>
                <button type="button">全部刪除</button>
              </div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                      全選
                    </th>

                    <th scope="col">單價</th>
                    <th scope="col">數量</th>
                    <th scope="col">總價</th>
                    <th scope="col">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <input type="checkbox" />
                          <img
                            src={item.product.imageUrl}
                            style={{ height: "100px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{item.product.price}</td>
                        <td>{item.qty}</td>
                        <td>{item.total}</td>
                        <td>
                          <button type="button">刪除</button>
                          <button type="button">加入收藏</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-3">
            <div className="card border px-5 py-5 position-sticky">
              <div className="card-head">
                <h3 className="card-title text-center">訂單內容</h3>
              </div>
              <div className="card-body">
                <div className="coupon">
                  <h5>優惠卷</h5>
                  <div>
                    <input type="text" placeholder="輸入優惠碼" />
                    <button type="submit btn-secondary">套用</button>
                  </div>
                </div>
                <div className="orderBreakDown">
                  <div className="productPrice d-flex justify-content-between">
                    <h5>商品總金額</h5>
                    <h5>${subtotal}</h5>
                  </div>
                  <div className="shipping d-flex justify-content-between">
                    <h5>運費總金額</h5>
                    <h5>${shipping}</h5>
                  </div>
                  <div className="orderPrice d-flex justify-content-between">
                    <h5>總付款金額</h5>
                    <h5>${total}</h5>
                  </div>
                </div>
                <button type="button">繼續結帳</button>
              </div>
              <p className="card-text">安心結帳</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
