import React from 'react';
import ServiceTiles from './ServiceTiles';
import StatsSection from './StatsSection';
import ReviewsSection from './ReviewsSection';

interface HomePageProps {
  onReportBreakdown: () => void;
  onNavigateToEcom: () => void;
  onBookService: () => void;
  onNavigateToTowing: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onReportBreakdown, onNavigateToEcom, onBookService, onNavigateToTowing }) => {
  return (
    <div className="min-h-full w-full flex flex-col bg-brand-gray-100 dark:bg-brand-dark">

      {/* Hero Section with Video */}
      <div className="relative w-full h-[40vh] flex flex-col justify-end bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent z-10"></div>
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            poster="https://images.unsplash.com/photo-1553523913-647355a112f2?q=80&w=2574&auto=format&fit=crop"
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-sports-car-on-a-bridge-with-passing-trains-42901-large.mp4"
        >
            Your browser does not support the video tag.
        </video>
        {/* Buttons removed for a cleaner, scroll-focused layout as per the new design direction. */}
      </div>
      
      {/* Content Section */}
      <div className="bg-brand-gray-100 dark:bg-brand-dark rounded-t-3xl -mt-12 relative z-20 pt-1">
        <div className="p-6">
            <ServiceTiles 
              onReportBreakdown={onReportBreakdown} 
              onBookService={onBookService}
              onNavigateToEcom={onNavigateToEcom}
              onNavigateToTowing={onNavigateToTowing}
            />
        </div>
        <div className="h-px bg-brand-gray-200 dark:bg-brand-gray-800 mx-6"></div>
        <StatsSection />
        <div className="h-px bg-brand-gray-200 dark:bg-brand-gray-800 mx-6"></div>
        <ReviewsSection />
      </div>

    </div>
  );
};

export default HomePage;