import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCartQuantity,
  removeFromCart,
  toggleSelectCartItem,
  toggleSelectAllCart,
  submitOrderThunk,
  clearOrderStatus,
} from '../redux/slices/cartSlice';
import { fetchProfileThunk } from '../redux/slices/userSlice';
import QuantityInput from '../components/QuantityInput';
import shoeSample from '../assets/shoe-sample.png';
import cartsDivider from '../assets/carts-divider.svg';
import checkboxChecked from '../assets/checkbox-checked.svg';

export default function Carts() {
  const dispatch = useDispatch();
  const { items, orderLoading, orderError, orderSuccess } = useSelector(
    (state) => state.cart
  );
  const { userLogin, profile } = useSelector((state) => state.user);
  const [editingId, setEditingId] = useState(null);
  const [editQtyValue, setEditQtyValue] = useState(1);

  useEffect(() => {
    dispatch(clearOrderStatus());
    if (!profile) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch, profile]);

  const allChecked = items.length > 0 && items.every((item) => item.checked);
  const selectedItems = items.filter((item) => item.checked);

  const handleSelectAll = () => {
    dispatch(toggleSelectAllCart(!allChecked));
  };

  const handleStartEdit = (item) => {
    if (editingId === item.id) {
      dispatch(updateCartQuantity({ id: item.id, quantity: editQtyValue }));
      setEditingId(null);
    } else {
      setEditingId(item.id);
      setEditQtyValue(item.quantity);
    }
  };

  const handleSubmitOrder = () => {
    const email = profile?.email || userLogin?.email;
    if (!email) {
      return;
    }
    if (selectedItems.length === 0) {
      alert('Vui lòng tick chọn ít nhất 1 sản phẩm để đặt hàng.');
      return;
    }
    dispatch(submitOrderThunk({ items: selectedItems, email }));
  };

  return (
    <div className="carts-page" data-node-id="5704:859">
      <div className="container-1280 carts-inner">
        <h1 className="page-main-heading carts-heading" data-node-id="5705:364">
          Carts
        </h1>

        <div className="section-divider-wrap" data-node-id="5705:365">
          <img src={cartsDivider} alt="" />
        </div>

        {orderSuccess && (
          <div className="alert-banner success-banner">{orderSuccess}</div>
        )}

        {orderError && (
          <div className="alert-banner error-banner">{orderError}</div>
        )}

        <div className="carts-table-container" data-node-id="5708:470">
          <table className="carts-table">
            <thead>
              <tr className="carts-thead-row" data-node-id="5706:367">
                <th className="col-check">
                  <button
                    type="button"
                    className={`figma-checkbox-btn ${allChecked ? 'checked' : ''}`}
                    onClick={handleSelectAll}
                    aria-label="Select all items"
                    data-node-id="5707:390"
                  >
                    {allChecked ? (
                      <img src={checkboxChecked} alt="Checked" />
                    ) : (
                      <span className="figma-checkbox-empty" />
                    )}
                  </button>
                </th>
                <th className="col-id">id</th>
                <th className="col-img">img</th>
                <th className="col-name">name</th>
                <th className="col-price">price</th>
                <th className="col-qty">quantity</th>
                <th className="col-total">total</th>
                <th className="col-action">action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="carts-empty-cell">
                    Giỏ hàng của bạn đang trống. Hãy chọn thêm giày ở trang chủ nhé!
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="carts-tbody-row">
                    <td className="col-check">
                      <button
                        type="button"
                        className={`figma-checkbox-btn ${item.checked ? 'checked' : ''}`}
                        onClick={() => dispatch(toggleSelectCartItem(item.id))}
                        aria-label={`Select ${item.name}`}
                        data-node-id="5707:400"
                      >
                        {item.checked ? (
                          <img src={checkboxChecked} alt="Checked" />
                        ) : (
                          <span className="figma-checkbox-empty" />
                        )}
                      </button>
                    </td>
                    <td className="col-id">{item.id}</td>
                    <td className="col-img">
                      <img
                        src={item.image || shoeSample}
                        alt={item.name}
                        className="carts-row-img"
                      />
                    </td>
                    <td className="col-name">{item.name}</td>
                    <td className="col-price">{item.price}</td>
                    <td className="col-qty">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          min="1"
                          className="cart-qty-inline-input"
                          value={editQtyValue}
                          onChange={(e) => setEditQtyValue(Number(e.target.value))}
                        />
                      ) : (
                        <QuantityInput
                          variant="cart"
                          quantity={item.quantity}
                          onIncrease={() =>
                            dispatch(
                              updateCartQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          onDecrease={() =>
                            dispatch(
                              updateCartQuantity({
                                id: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="col-total">
                      {Number(item.price) * Number(item.quantity)}
                    </td>
                    <td className="col-action">
                      <div className="carts-action-btns">
                        <button
                          type="button"
                          className="cart-btn-edit"
                          onClick={() => handleStartEdit(item)}
                          data-node-id="5708:427"
                        >
                          {editingId === item.id ? 'SAVE' : 'EDIT'}
                        </button>
                        <button
                          type="button"
                          className="cart-btn-delete"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          data-node-id="5708:429"
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {items.length > 0 && (
            <div className="carts-submit-row">
              <button
                type="button"
                className="cart-btn-submit-order"
                onClick={handleSubmitOrder}
                disabled={orderLoading}
                data-node-id="5708:464"
              >
                {orderLoading ? 'SUBMITTING...' : 'SUBMIT ORDER'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
