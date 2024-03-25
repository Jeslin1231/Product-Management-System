import type React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleError = () => {
      console.error('ErrorBoundary caught an error');
      setHasError(true);
      navigate('/error');
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [navigate]);

  useEffect(() => {
    if (hasError) {
      // Navigate to error page when an error occurs
      navigate('/error');
    }
  }, [hasError, navigate]);

  return <>{children}</>;
};

export default ErrorBoundary;
