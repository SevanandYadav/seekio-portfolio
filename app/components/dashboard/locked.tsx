import { Lock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { TestModeModal } from "./test-mode-modal";

interface LockedFeatureProps {
  data?: any;
}

export function LockedFeature({ data }: LockedFeatureProps) {
  const [showModal, setShowModal] = useState(true);

  // Reset modal to show every time component mounts
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="bg-white min-h-full relative">
      <div className="flex items-center justify-center min-h-96 p-4">
        <div className="text-center text-gray-500">
          This feature is locked in test mode.
        </div>
      </div>
      <TestModeModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={data}
      />
    </div>
  );
}