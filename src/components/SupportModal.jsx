export default function SupportModal({ onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="w-72 rounded-xl bg-white p-6">
          <h3 className="font-semibold">Support</h3>
          <p className="mt-2 text-sm text-gray-600">
            Our team will connect shortly.
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-black py-2 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  