import { COPY } from "../utils/copy";

export default function TrustCard() {
  return (
    <div className="mb-6 rounded-xl bg-blue-50 p-4">
      <p className="font-medium">{COPY.safe}</p>
      <p className="mt-1 text-sm text-gray-600">{COPY.safeDesc}</p>
    </div>
  );
}
