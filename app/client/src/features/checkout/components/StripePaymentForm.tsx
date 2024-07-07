import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

type StripePaymentFormProps = {
  setPaymentIntentId: (id: string | null) => void;
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ setPaymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // Update the paymentIntentId state in the CheckoutForm component
        setPaymentIntentId(paymentMethod.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

export default StripePaymentForm;
