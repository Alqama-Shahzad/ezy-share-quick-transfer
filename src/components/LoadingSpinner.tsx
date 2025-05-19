import { Flame } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-ezyshare-timberwolf/10 to-ezyshare-timberwolf/20 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
          <Flame className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
          EzyShare
        </h1>
        <div className="flex items-center justify-center mt-2">
          <div className="h-8 w-8 border-4 border-ezyshare-flame border-r-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-ezyshare-blackOlive/70">Loading content...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 