import qtyBoxBg from '../assets/qty-box-bg.svg';

export default function QuantityInput({
  quantity,
  onIncrease,
  onDecrease,
  variant = 'detail',
}) {
  if (variant === 'cart') {
    return (
      <div className="cart-qty-control">
        <button
          type="button"
          className="cart-qty-btn"
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
        <div className="cart-qty-value-box" data-node-id="5708:436">
          <img src={qtyBoxBg} alt="" className="cart-qty-bg-svg" />
          <span className="cart-qty-value-text">{quantity}</span>
        </div>
        <button
          type="button"
          className="cart-qty-btn"
          onClick={onDecrease}
          aria-label="Decrease quantity"
        >
          -
        </button>
      </div>
    );
  }

  return (
    <div className="detail-qty-control">
      <button
        type="button"
        className="detail-qty-btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
      <span className="detail-qty-value">{quantity}</span>
      <button
        type="button"
        className="detail-qty-btn"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        -
      </button>
    </div>
  );
}
