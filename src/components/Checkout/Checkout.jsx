import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/notificationsSlice';
import { addOrder } from '../../store/slices/ordersSlice';
import { CreditCard, Wallet, User, CheckCircle2, Landmark } from 'lucide-react';

// Parts
import CheckoutSteps from './Parts/CheckoutSteps';
import CheckoutDelivery from './Parts/CheckoutDelivery';
import CheckoutPayment from './Parts/CheckoutPayment';
import CheckoutVerification from './Parts/CheckoutVerification';
import CheckoutSummary from './Parts/CheckoutSummary';

const Checkout = ({ items, onBack, onConfirm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(user?.paymentMethods?.[0]?.id || null);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Casablanca',
    address: ''
  });

  const subtotal = (items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal >= 2000 ? 0 : 25;
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === 'ELITE20') setDiscount(20);
    else if (code === 'WELCOME10') setDiscount(10);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    const orderId = "TZ-" + Math.floor(Math.random() * 900000 + 100000);
    const orderData = {
      id: orderId,
      userId: user?.id || null,
      customerName: formData.name,
      email: user?.email || 'guest@techzone.ma',
      ...formData,
      items,
      finalTotal: total,
      amount: total,
      appliedDiscount: discount,
      paymentMethod,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'En Cours'
    };



    setTimeout(() => {
      dispatch(addNotification({
        type: 'order',
        title: 'Nouvelle Commande',
        message: `Commande de ${formData.name} d'un montant de ${total.toLocaleString()} DH`,
        link: '/admin/orders'
      }));

      dispatch(addOrder(orderData));


      onConfirm(orderData);
      setIsSubmitting(false);
    }, 2000);
  };

  const steps = [
    { id: 1, label: 'Coordonnées', icon: User },
    { id: 2, label: 'Paiement', icon: CreditCard },
    { id: 3, label: 'Confirmation', icon: CheckCircle2 }
  ];

  const paymentOptions = [
    { id: 'card', label: 'Carte Bancaire', icon: CreditCard, description: 'Visa / Mastercard / CMI' },
    { id: 'paypal', label: 'PayPal', icon: Landmark, description: 'Digital Wallet Transfer' },
    { id: 'cod', label: 'Paiement à la Livraison', icon: Wallet, description: 'Paiement à la réception' }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 animate-fade-up">
      <CheckoutSteps steps={steps} step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          {step === 1 && <CheckoutDelivery formData={formData} setFormData={setFormData} onNext={() => { window.scrollTo(0, 0); setStep(2); }} />}

          {step === 2 && (
            <CheckoutPayment
              paymentOptions={paymentOptions} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
              user={user} isAddingNewCard={isAddingNewCard} setIsAddingNewCard={setIsAddingNewCard}
              selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId}
              onPrev={() => setStep(1)} onNext={() => { window.scrollTo(0, 0); setStep(3); }}
              total={total}
            />
          )}

          {step === 3 && (
            <CheckoutVerification
              formData={formData} paymentMethod={paymentMethod} paymentOptions={paymentOptions}
              onPrev={() => setStep(2)} onConfirm={handleConfirm} isSubmitting={isSubmitting} setStep={setStep}
            />
          )}
        </div>

        <div className="lg:col-span-12 xl:col-span-5">
          <CheckoutSummary
            items={items} couponCode={couponCode} setCouponCode={setCouponCode} handleApplyCoupon={handleApplyCoupon}
            subtotal={subtotal} discount={discount} discountAmount={discountAmount} shipping={shipping} total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
