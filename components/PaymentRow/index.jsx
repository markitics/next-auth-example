const PaymentRow = ({ pay }) => {
  return (
    <li>
      <strong>{pay.uid}</strong> WooHoo! {pay.comment}
    </li>
  );
};

export default PaymentRow;
