import type { User } from 'firebase/auth';

interface AuthBannerProps {
  user: User | null;
  loading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

const AuthBanner = ({ user, loading, onSignIn, onSignOut }: AuthBannerProps) => {
  if (loading) {
    return null;
  }

  return (
    <div className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex justify-end items-center">
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Welcome, {user.displayName || user.email}
          </span>
          <button
            onClick={onSignOut}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={onSignIn}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default AuthBanner;
