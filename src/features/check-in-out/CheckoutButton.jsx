import { Link } from "react-router-dom";
import Button from "../../ui/Button";

import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      $sizes="small"
      $variations="primary"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}
export default CheckoutButton;
