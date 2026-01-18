import React, { useState, useEffect } from "react";
import {
  MapPin,
  Package,
  Phone,
  MessageCircle,
  Mail,
  Check,
} from "lucide-react";

const DeliveryAddressIssue = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const userData = {
    name: "Sarah Mitchell",
    phone: "+1 (555) 123-4567",
  };

  const [formData, setFormData] = useState({
    addressLine1: "742 Evergreen Terrace",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    pincode: "62701",
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const orderData = {
    orderId: "ORD-2024-8847",
    itemName: "Wireless Headphones Pro",
    itemImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    status: "Seller Preparing",
    deliveryDate: "Jan 22, 2026",
    canChangeAddress: true,
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (val) => val.trim() !== "",
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    if (isFormValid) {
      alert("Address updated successfully!");
      setShowEditForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div
          className={`text-center mb-8 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Delivery address issue
          </h1>
          <p className="text-gray-600 text-lg">
            Don't worry — we'll help you fix this if possible.
          </p>
        </div>

        {/* Order Context Card */}
        <div
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-start gap-4">
            <img
              src={orderData.itemImage}
              alt={orderData.itemName}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-medium text-gray-900">
                  {orderData.itemName}
                </h3>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {orderData.orderId}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-700">
                  {orderData.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Expected delivery: {orderData.deliveryDate}
              </p>
            </div>
          </div>
        </div>

        {/* Current Address Display */}
        {!showEditForm && (
          <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 transition-all duration-700 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-3">
                  Current delivery address
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-1">
                  <p>{userData.name}</p>
                  <p>{formData.addressLine1}</p>
                  {formData.addressLine2 && <p>{formData.addressLine2}</p>}
                  <p>
                    {formData.city}, {formData.state} {formData.pincode}
                  </p>
                  <p>{userData.phone}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEditForm(true)}
              className="w-full mt-4 bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
            >
              Edit address
            </button>
          </div>
        )}

        {/* Address Change Status Message */}
        <div
          className={`rounded-xl p-4 mb-6 transition-all duration-700 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${
            orderData.canChangeAddress
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-amber-50 border border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                orderData.canChangeAddress ? "bg-emerald-600" : "bg-amber-500"
              }`}
            >
              <Check className="w-3 h-3 text-white" />
            </div>
            <p
              className={`text-sm ${
                orderData.canChangeAddress
                  ? "text-emerald-900"
                  : "text-amber-900"
              }`}
            >
              {orderData.canChangeAddress
                ? "Good news! You can update your delivery address since the order hasn't shipped yet."
                : "Your order is in transit. Address changes may be limited, but we'll do our best to help."}
            </p>
          </div>
        </div>

        {/* Edit Address Form */}
        {showEditForm && (
          <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 transition-all duration-500 ease-out ${
              showEditForm
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-1">
                Update delivery address
              </h3>
              <p className="text-sm text-gray-600">
                for {userData.name} • {userData.phone}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address line 1
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address line 2 (optional)
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    handleInputChange("addressLine2", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={!isFormValid}
                className={`flex-1 font-medium py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] ${
                  isFormValid
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Save updated address
              </button>
            </div>
          </div>
        )}

        {/* Support & Help Section */}
        <div
          className={`transition-all duration-700 delay-400 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-center text-sm font-medium text-gray-900 mb-4">
            Need more help?
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Call</span>
            </button>

            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Chat</span>
            </button>

            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressIssue;
