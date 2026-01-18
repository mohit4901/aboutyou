export default function PrimaryButton({ text, onClick }) {
    return (
      <button
        onClick={onClick}
        className="mt-6 w-full rounded-xl bg-black py-3 text-white text-base font-medium hover:opacity-90 transition"
      >
        {text}
      </button>
    );
  }
  