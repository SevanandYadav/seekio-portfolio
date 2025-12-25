import { Lock, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface TestModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export function TestModeModal({ isOpen, onClose, data }: TestModeModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isGoingLive, setIsGoingLive] = useState(false);

  const handleGoLive = () => {
    setIsGoingLive(true);
    
    setTimeout(() => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('dashboard-data');
      window.location.href = '/signup';
    }, 3000);
  };

  if (!isOpen) return null;

  if (isGoingLive) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-sm text-gray-600 mb-4">
            You have successfully gone live - wait till we log you out
          </p>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
            <Lock className="text-orange-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{data?.testModeModal?.title || "You are on Test Mode"}</h2>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="mb-2">
                {data?.testModeModal?.description || "You are currently using the platform in Test Mode. The content you see here is dummy data added to help you explore and understand the basic functionalities."}
              </p>
              <p className="mb-2">
                {data?.testModeModal?.warning || "Please note that any changes made in this mode will not affect real data. To remove the dummy data, and create new data or make actual changes, you will need to switch to Live Mode."}
              </p>
              <p className="text-orange-700 font-medium text-xs">
                <strong>{data?.testModeModal?.note || "Note: Once you go live, you will be logged out and you will have to log back in."}</strong>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <input 
            type="checkbox" 
            id="confirmCheckbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="confirmCheckbox" className="text-sm text-gray-700 leading-relaxed">
            {data?.testModeModal?.confirmButton || "I understand this is Test Mode, and I'm ready to switch to Live Mode to work with real data."}
          </label>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg"
          >
            {data?.testModeModal?.cancelButton || "Cancel"}
          </button>
          <button
            onClick={handleGoLive}
            disabled={!isChecked}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm leading-tight ${
              isChecked 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
}