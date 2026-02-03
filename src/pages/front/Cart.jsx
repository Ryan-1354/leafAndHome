import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cartData, setCartData] = useState([]);

  //計算右側訂單內容
  const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);
  const shipping = 120;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        setCartData(res.data.data.carts);
        console.log(res.data.data.carts);
        console.log("res.data", res.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchCartData();
  }, []);

  //updateCart
  const updateCart = async (cartId, productId, qty = 1) => {
    const data = {
      product_id: productId,
      qty,
    };
    try {
      const res = await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
        { data },
      );
      const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res2.data.data.carts);
    } catch (error) {
      alert(error.message);
    }
  };

  //deletcart
  const deleteCart = async (cartId) => {
    try {
      const res = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
      );
      const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res2.data.data.carts);
    } catch (error) {
      alert(error.message);
    }
  };

  //deleteCarts
  const deleteCarts = async () => {
    try {
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res2.data.data.carts);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container mb-5 ">
        <div className="row d-flex justify-content-between">
          <div className="col-9">
            <div className="cartSection border mb-4">
              <div className="head d-flex justify-content-between py-5 px-5 bg-secondary bg-opacity-25">
                <h3>購物車</h3>
                <button
                  type="button"
                  onClick={(e) => {
                    deleteCarts();
                  }}
                >
                  全部刪除
                </button>
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
                        <td className="d-flex align-items-center gap-3">
                          <input type="checkbox" />
                          <img
                            src={item.product.imageUrl}
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="name">
                            <h5>{item.product.titleEn}</h5>
                            <h6>{item.product.titleZh}</h6>
                          </div>
                        </td>
                        <td className="align-middle">
                          NT$ {item.product.price}
                        </td>
                        <td className="p-0 align-middle">
                          <div className="d-flex align-items-center h-100 px-2">
                            <input
                              type="number"
                              className="form-control"
                              defaultValue={item.qty}
                              onChange={(e) => {
                                updateCart(
                                  item.id,
                                  item.product_id,
                                  Number(e.target.value),
                                );
                              }}
                            />
                          </div>
                        </td>
                        <td className="align-middle">NT$ {item.total}</td>
                        <td className="align-middle">
                          <button
                            type="button"
                            onClick={(e) => {
                              deleteCart(item.id);
                            }}
                          >
                            刪除
                          </button>
                          <button type="button">加入收藏</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="addOnSection border mb-4">
              <div className="head d-flex justiffy-contetn-start align-items-end mb-4">
                <h3>加購服務</h3>
                <h5>常一起選購的加購服務</h5>
              </div>
              <ul>
                <li>
                  <div className="content d-flex justify-content-start">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg"
                      alt=""
                      style={{ height: "100px" }}
                    />
                    <div className="content d-flex flex-column justify-content-start w-100">
                      <h5>到貨換盆</h5>
                      <h6>專業換盆服務</h6>
                      <div className="last d-flex justify-content-between w-100">
                        <input type="number" defaultValue={1} />
                        <div className="cta d-flex justify-content-end align-items-center">
                          <h4>NT$150</h4>
                          <button type="button">加入</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content d-flex justify-content-start">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg"
                      alt=""
                      style={{ height: "100px" }}
                    />
                    <div className="content d-flex flex-column justify-content-start w-100">
                      <h5>到貨換盆</h5>
                      <h6>專業換盆服務</h6>
                      <div className="last d-flex justify-content-between w-100">
                        <input type="number" defaultValue={1} />
                        <div className="cta d-flex justify-content-end align-items-center">
                          <h4>NT$150</h4>
                          <button type="button">加入</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content d-flex justify-content-start">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg"
                      alt=""
                      style={{ height: "100px" }}
                    />
                    <div className="content d-flex flex-column justify-content-start w-100">
                      <h5>到貨換盆</h5>
                      <h6>專業換盆服務</h6>
                      <div className="last d-flex justify-content-between w-100">
                        <input type="number" defaultValue={1} />
                        <div className="cta d-flex justify-content-end align-items-center">
                          <h4>NT$150</h4>
                          <button type="button">加入</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="saved border">
              <div className="head d-flex justiffy-contetn-start align-items-end mb-4">
                <h3>收藏清單</h3>
                <h5>那些您曾停下來看過的植物</h5>
              </div>
              <ul>
                <li>
                  <div className="content d-flex justify-content-start">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg"
                      alt=""
                      style={{ height: "100px" }}
                    />
                    <div className="content d-flex flex-column justify-content-start w-100">
                      <h5>吊蘭</h5>
                      <h6>Spider Plant</h6>
                      <div className="last d-flex justify-content-between w-100">
                        <input type="number" defaultValue={1} />
                        <div className="cta d-flex justify-content-end align-items-center">
                          <h4>NT$150</h4>
                          <button type="button">加入</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="content d-flex justify-content-start">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg"
                      alt=""
                      style={{ height: "100px" }}
                    />
                    <div className="content d-flex flex-column justify-content-start w-100">
                      <h5>波士頓蕨</h5>
                      <h6>Boston Fern</h6>
                      <div className="last d-flex justify-content-between w-100">
                        <input type="number" defaultValue={1} />
                        <div className="cta d-flex justify-content-end align-items-center">
                          <h4>NT$150</h4>
                          <button type="button">加入</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="card border px-5 py-5 position-sticky top-0">
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
