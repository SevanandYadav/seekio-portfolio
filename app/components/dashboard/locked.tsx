import { Lock, AlertTriangle } from "lucide-react";

export function LockedFeature() {
  const handleGoLive = () => {
    if (confirm("Once you go live, you will be logged out and you will have to log back in. Continue?")) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('dashboard-data');
      window.location.href = '/signup';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-orange-600" size={40} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">You are on Test Mode</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 text-left">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 mr-3 mt-1 flex-shrink-0" size={20} />
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="mb-3">
                You are currently using the platform in <strong>Test Mode</strong>. The content you see here is dummy data added to help you explore and understand the basic functionalities.
              </p>
              <p className="mb-3">
                Please note that any changes made in this mode will not affect real data. To remove the dummy data, and create new data or make actual changes, you will need to switch to <strong>Live Mode</strong>.
              </p>
              <p className="text-orange-700 font-medium">
                <strong>Note:</strong> Once you go live, you will be logged out and you will have to log back in.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleGoLive}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          I understand this is Test Mode, and I'm ready to switch to Live Mode to work with real data.
        </button>
      </div>
    </div>
  );
}