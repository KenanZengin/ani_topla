"use client"
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppContext } from '@/components/context';

const PaymentFail: React.FC = () => {


    const { setPlanModal, planModal } = useAppContext();
  
  return (
    <div className="payment-fail">
      <div className="payment-fail__container">
        <CancelIcon className="payment-fail__icon" />
        <h2 className="payment-fail__title">Ödeme Başarısız!</h2>
        <p className="payment-fail__message">Ödemeniz işlenemedi. Lütfen tekrar deneyin veya destek ile iletişime geçin.</p>
        <button className="payment-fail__button" onClick={() => setPlanModal(true)}>Tekrar Deneyin</button>
      </div>
    </div>
  );
}

export default PaymentFail;
