import { useEffect, useState } from "react";
import { APIAuthenticated } from "../../http";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
// after checkout khalti redirects to this UI in this we verify the payment whether its success,pending or rejected
const Khaltisuccess = () => {
  // way to takeout value from url
  const queryParams = new URLSearchParams(location.search);
  const pidx = queryParams.get("pidx");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const verifyPidx = async () => {
    setLoading(true);
    try {
      const response = await APIAuthenticated.post(`/payment/verifypidx`, {
        pidx,
      });
      if (response.status === 200) {
        dispatch(clearCart());
        window.location.href = "/";
      }
    } catch (error: unknown) {
      console.log("Failed to verify payment", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPidx();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center text-2xl font-normal">
      {loading ? <p>loading.... </p> : <p>Khalti payment success</p>}
    </div>
  );
};

export default Khaltisuccess;
