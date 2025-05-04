import { CheckCircle } from "@mui/icons-material";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  return (
    <div className="payment-success">
      <div className="payment-success__container">
        <CheckCircle className="payment-success__icon" />
        <h2 className="payment-success__title">Ödeme Başarılı!</h2>
        <p className="payment-success__message">
          Ödemeniz başarıyla tamamlandı. Dijital albümünüze göz atabilirsiniz.
        </p>
        <Link href={"/dashboard"} className="payment-success__button">
          Ana Sayfaya git
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
