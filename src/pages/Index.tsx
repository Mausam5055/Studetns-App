
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    // Redirect to dashboard if logged in, otherwise to login page
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Return a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-universe-900">
      <div className="animate-pulse-subtle">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-universe-400 to-universe-600 flex items-center justify-center">
          <span className="text-xl font-bold text-white">U</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
