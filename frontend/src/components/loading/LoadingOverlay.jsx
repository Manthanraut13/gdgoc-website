import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

export default function LoadingOverlay() {
    const [isAnimating, setAnimating] = useState(true); // Start with loading animation on initial load
    const location = useLocation();

    useEffect(() => {
        // Handle initial load
        const timeout = setTimeout(() => setAnimating(false), 3000); // Show animation for 3 seconds on initial load

        return () => clearTimeout(timeout); // Clean up timeout on unmount
    }, []);

    useEffect(() => {
        // Handle route changes
        if (!isAnimating) {
            setAnimating(true);
            const timeout = setTimeout(() => setAnimating(false), 3000); // Show animation for 3 seconds on route change

            return () => clearTimeout(timeout); // Clean up timeout on unmount
        }
    }, [location.pathname]);

    return isAnimating ? <Loading /> : null;
}