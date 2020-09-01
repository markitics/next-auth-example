
import PaymentRow from '../PaymentRow/index';

const PaymentsList = ({ payments }) => {
  if (!payments) return <h3>Nothing here</h3>;
  return (
    <ul>
      {payments.map((pay) => (
        // <li key={pay.uid}>
        //   {pay.uid} {pay.comment}
        // </li>
        <PaymentRow pay={pay} key={pay.uid}/>
      ))}
    </ul>
  );
};

export default PaymentsList;
