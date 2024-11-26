import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export const buyCourse = async (user, dispatch, navigate, courses) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // initiate order
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {
      courses,
    });

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message);
    }

    // make options for creating paymnet modal in the frontend
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse?.data?.message?.currency,
      amount: `${orderResponse?.data?.message?.amount}`,
      order_id: orderResponse?.data?.message?.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course!",
      image: rzpLogo,
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.contactNumber,
      },
      handler: function (response) {
        // verify payment
        verifyPayment(
          {
            ...response,
            courses,
          },
          dispatch,
          navigate
        );
        // send payment successful mail
        sendPaymentSuccessEmail(response, orderResponse.data.message.amount);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, Payment Failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("BUY COURSE API ERROR...", error);
    toast.error("Could Not Make Payment");
  }
  toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    });
  } catch (error) {
    console.log("PAYMENT SUCCESSFUL EMAIL ERROR ...", error);
  }
}

async function verifyPayment(bodyData, dispatch, navigate) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData);

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("You are Added to the Course Successfully");
    toast.success("Payment Verified Successfully");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart()); //-> thinking
  } catch (error) {
    console.log("VERIFY PAYMENT ERROR...", error);
    toast.error("Could not verify the Payment");
  }
  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
}
