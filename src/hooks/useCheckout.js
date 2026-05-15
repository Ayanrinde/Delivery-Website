import { useState, useCallback } from 'react';
import { SAVED_ADDRESSES, COUPONS } from '@/data';
import { applyCoupon, calculateTotal } from '@/utils';

const STEPS = ['Cart', 'Address', 'Payment', 'Review'];

/**
 * Encapsulates all multi-step checkout state and logic.
 */
export function useCheckout(cartSubtotal, deliveryFee = 400) {
  const [stepIndex,   setStepIndex]   = useState(0);
  const [addressIdx,  setAddressIdx]  = useState(0);
  const [payMethod,   setPayMethod]   = useState('wallet');
  const [notes,       setNotes]       = useState('');
  const [couponCode,  setCouponCode]  = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError,   setCouponError]   = useState('');

  const selectedAddress = SAVED_ADDRESSES[addressIdx];
  const discountAmount  = applyCoupon(cartSubtotal, appliedCoupon);
  const orderTotal      = calculateTotal(cartSubtotal, deliveryFee, discountAmount);

  const goNext = useCallback(() =>
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1)), []);

  const goBack = useCallback(() =>
    setStepIndex((i) => Math.max(i - 1, 0)), []);

  const goToStep = useCallback((idx) => setStepIndex(idx), []);

  const applyCode = useCallback(() => {
    const found = COUPONS[couponCode.toUpperCase()];
    if (found) {
      setAppliedCoupon(found);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  }, [couponCode]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setAddressIdx(0);
    setPayMethod('wallet');
    setNotes('');
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponError('');
  }, []);

  return {
    // step navigation
    stepIndex,
    steps: STEPS,
    currentStep: STEPS[stepIndex],
    isFirstStep: stepIndex === 0,
    isLastStep:  stepIndex === STEPS.length - 1,
    goNext,
    goBack,
    goToStep,
    // address
    addressIdx,
    setAddressIdx,
    selectedAddress,
    notes,
    setNotes,
    // payment
    payMethod,
    setPayMethod,
    // coupon
    couponCode,
    setCouponCode,
    appliedCoupon,
    discountAmount,
    couponError,
    applyCode,
    // totals
    deliveryFee,
    orderTotal,
    // reset
    reset,
  };
}
