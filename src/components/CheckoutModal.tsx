import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert, Truck, MessageCircle, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, PAKISTAN_CITIES } from '../data/products';
import { formatPKR, generateOrderWhatsAppMessage, buildWhatsAppUrl, STORE_PHONE_DISPLAY } from '../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
  } = useShop();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(PAKISTAN_CITIES[0]);
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid phone or WhatsApp number (e.g., 0324 5772549).';
    }

    if (city === 'Other City / Town' && !customCity.trim()) {
      newErrors.city = 'Please specify your city or district.';
    }

    if (!address.trim() || address.trim().length < 10) {
      newErrors.address = 'Please enter complete street address, house/shop number, and nearby landmark.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finalCity = city === 'Other City / Town' ? customCity.trim() : city;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrderId = `SA-PK-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(newOrderId);
    setIsSubmitted(true);
  };

  const handleFinishAndReset = () => {
    clearCart();
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
  };

  const getOrderSummaryText = () => {
    return generateOrderWhatsAppMessage({
      orderId: confirmedOrderId,
      customerName,
      phone,
      city: finalCity,
      address,
      paymentMethod,
      items: cart.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        size: i.selectedSize,
        pricePKR: i.product.pricePKR,
      })),
      subtotal: cartTotal,
      deliveryNotes: deliveryNotes.trim() ? deliveryNotes : undefined,
    });
  };

  const handleWhatsAppConfirm = () => {
    const message = getOrderSummaryText();
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getOrderSummaryText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-zinc-200 text-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-lime-700">
              Sport Accessories · Pakistan
            </span>
            <h2 className="text-lg sm:text-xl font-black uppercase text-zinc-950 font-heading">
              {isSubmitted ? 'Order Confirmed' : 'Checkout & Delivery'}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-200"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[80vh] bg-white">
            
            {/* Delivery Terms Notice */}
            <div className="p-3.5 bg-lime-50 border border-lime-300 rounded-xl flex items-start gap-3 text-xs text-zinc-800">
              <Truck className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-zinc-950 uppercase text-[11px]">Nationwide Delivery Across Pakistan</p>
                <p className="mt-0.5 text-zinc-700">
                  Delivery charges and exact delivery schedule are not automated; they will be confirmed with you by the store team via call or WhatsApp prior to dispatch.
                </p>
              </div>
            </div>

            {/* Customer Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900 pb-1 border-b border-zinc-200">
                1. Customer & Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Full Name <span className="text-lime-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babar Azam"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full bg-zinc-50 border ${
                      errors.customerName ? 'border-red-500' : 'border-zinc-300'
                    } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium`}
                  />
                  {errors.customerName && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {errors.customerName}
                    </span>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Phone / WhatsApp Number <span className="text-lime-700">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0324 5772549"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-zinc-50 border ${
                      errors.phone ? 'border-red-500' : 'border-zinc-300'
                    } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-500 mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* City Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Destination City <span className="text-lime-700">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-lime-500 font-medium"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {city === 'Other City / Town' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Enter City / District Name <span className="text-lime-700">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chakwal, Khanewal, Mirpur"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      className={`w-full bg-zinc-50 border ${
                        errors.city ? 'border-red-500' : 'border-zinc-300'
                      } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium`}
                    />
                    {errors.city && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.city}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Full Street Address & Landmark <span className="text-lime-700">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House / Flat / Shop #, Street, Sector, Area, Near Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full bg-zinc-50 border ${
                    errors.address ? 'border-red-500' : 'border-zinc-300'
                  } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium`}
                />
                {errors.address && (
                  <span className="text-[11px] text-red-500 mt-1 block">{errors.address}</span>
                )}
              </div>

              {/* Delivery notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Special Notes or Bat Knocking-In Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please knock-in the bat / call before delivery"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900 pb-1 border-b border-zinc-200">
                2. Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Cash on Delivery */}
                <label
                  className={`relative flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-lime-50 border-lime-500 text-zinc-950 shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-lime-600 focus:ring-lime-500"
                  />
                  <div>
                    <span className="font-extrabold text-sm block text-zinc-950">Cash on Delivery (COD)</span>
                    <span className="text-xs text-zinc-600 mt-0.5 block">
                      Pay cash to the courier representative when the parcel arrives at your address.
                    </span>
                  </div>
                </label>

                {/* Online Payment */}
                <label
                  className={`relative flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'bg-lime-50 border-lime-500 text-zinc-950 shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mt-1 text-lime-600 focus:ring-lime-500"
                  />
                  <div>
                    <span className="font-extrabold text-sm block text-zinc-950">Online / Bank Transfer</span>
                    <span className="text-xs text-zinc-600 mt-0.5 block">
                      Direct bank transfer / EasyPaisa / JazzCash details provided by store.
                    </span>
                  </div>
                </label>
              </div>

              {/* Payment Status Notice */}
              {paymentMethod === 'online' && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5">
                      Online Payment Gateway Notice:
                    </strong>
                    <span>
                      Direct automated card processing is currently not integrated. No payment is charged online right now. You can place the order and pay via manual Bank Transfer / EasyPaisa / JazzCash (account details will be provided via WhatsApp/SMS), or switch to Cash on Delivery.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>Items in Cart ({cart.length})</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="text-lime-700 hover:underline font-bold"
                >
                  Edit Cart
                </button>
              </div>
              
              <div className="divide-y divide-zinc-200 text-xs">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="py-1.5 flex justify-between items-center">
                    <span className="text-zinc-800 line-clamp-1 pr-2 font-medium">
                      {item.quantity}x {item.product.name} ({item.selectedSize})
                    </span>
                    <span className="font-mono text-zinc-950 shrink-0 font-bold">
                      {formatPKR(item.product.pricePKR * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-zinc-700 uppercase">Subtotal (PKR):</span>
                <span className="text-lg font-black font-mono text-zinc-950 tabular-nums">
                  {formatPKR(cartTotal)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                * Delivery courier fee across Pakistan will be quoted and confirmed by the store team prior to dispatch.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950 bg-lime-400 hover:bg-lime-500 active:bg-lime-600 rounded-xl shadow-md border border-lime-500 cursor-pointer"
              >
                Place Order Now
              </button>
            </div>

          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center bg-white">
            <div className="w-16 h-16 mx-auto rounded-full bg-lime-100 border border-lime-400 flex items-center justify-center text-lime-700">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-lime-700 font-mono">
                Order #{confirmedOrderId}
              </span>
              <h3 className="text-2xl font-black uppercase text-zinc-950 font-heading mt-1">
                Order Received!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mt-2 font-medium">
                Thank you, <strong className="text-zinc-950">{customerName}</strong>. Your cricket gear order has been registered for delivery to <strong className="text-zinc-950">{finalCity}</strong>.
              </p>
            </div>

            {/* Delivery & Payment Confirmation Card */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Order Subtotal:</span>
                <span className="font-mono font-bold text-zinc-950 tabular-nums">{formatPKR(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Payment Selected:</span>
                <span className="font-bold text-zinc-900">
                  {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Transfer / Online Inquiry'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Delivery Location:</span>
                <span className="text-zinc-900 font-semibold text-right max-w-[240px] truncate">{address}, {finalCity}</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-500">
                ℹ️ Delivery courier charge and estimated arrival will be confirmed with you directly via call or WhatsApp.
              </div>
            </div>

            {/* Primary Action: Direct WhatsApp Order Confirmation */}
            <div className="space-y-3 max-w-md mx-auto pt-2">
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full py-3.5 px-4 bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md border border-lime-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-zinc-950" />
                <span>Confirm on WhatsApp ({STORE_PHONE_DISPLAY})</span>
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 text-xs font-bold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSummary ? 'Receipt Copied!' : 'Copy Order Receipt'}</span>
                </button>

                <button
                  onClick={handleFinishAndReset}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-300 rounded-xl"
                >
                  Done / Return to Store
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
