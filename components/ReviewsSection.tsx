

import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { StarIcon } from './Icons';

const mockReviewsData = [
  { name: "Ramesh Patil", location: "Pune", stars: 5, quote: "Super fast support! My car was picked up in 15 mins." },
  { name: "Priya Kulkarni", location: "Mumbai", stars: 4.5, quote: "Trusted garage partners. Got my engine fixed in a day!" },
  { name: "Akash Sharma", location: "Nashik", stars: 5, quote: "Loved the doorstep drop-off. No stress at all!" },
  { name: "Anjali Desai", location: "Hyderabad", stars: 4.5, quote: "Affordable prices and genuine service." },
  { name: "Raj Mehta", location: "Nagpur", stars: 5, quote: "Best breakdown help service in India. Highly recommend!" },
  { name: "Sneha Rane", location: "Thane", stars: 4, quote: "They even helped me locate the nearest garage." },
  { name: "Neeraj Singh", location: "Bengaluru", stars: 5, quote: "Everything was smooth — pickup, repair, and drop." }
];

const mockReviews: Review[] = mockReviewsData.map((review) => ({
    name: review.name,
    city: review.location,
    rating: review.stars,
    comment: review.quote,
}));

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<StarIcon key={`full-${i}`} className="w-6 h-6 text-yellow-400" />);
        } else if (i - 0.5 <= rating) {
            stars.push(
                <div key={`half-${i}`} className="relative">
                    <StarIcon className="w-6 h-6 text-brand-gray-300 dark:text-brand-gray-700" />
                    <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                        <StarIcon className="w-6 h-6 text-yellow-400" />
                    </div>
                </div>
            );
        } else {
            stars.push(<StarIcon key={`empty-${i}`} className="w-6 h-6 text-brand-gray-600" />);
        }
    }
    return <div className="flex items-center justify-center space-x-1">{stars}</div>;
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="flex flex-col items-center max-w-xl mx-auto text-center p-6">
    <div className="mb-6">
        <StarRating rating={review.rating} />
    </div>
    <blockquote className="text-xl md:text-2xl font-medium text-white mb-6 leading-relaxed" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.2)' }}>
        <p>"{review.comment}"</p>
    </blockquote>
    <footer className="mt-auto">
        <p className="font-bold text-lg text-brand-red">{review.name}</p>
        <p className="text-sm text-brand-gray-400">- {review.city} -</p>
    </footer>
  </div>
);


const ReviewsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const transitionDuration = 600; // 0.6s
    const displayDuration = 2500; // 2.5s

    useEffect(() => {
        if (mockReviews.length <= 1) return;

        const intervalId = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % mockReviews.length);
                setIsFading(false);
            }, transitionDuration / 2);
        }, displayDuration + transitionDuration);

        return () => clearInterval(intervalId);
    }, []);

    const currentReview = mockReviews[currentIndex];

    return (
        <div className="bg-brand-dark dark font-sans py-16 sm:py-24 px-4 sm:px-6">
             <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                What Our Customers Say
            </h2>
            <div className="relative flex items-center justify-center" style={{ minHeight: '260px' }}>
                <div 
                    className={`transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                >
                   {currentReview && <ReviewCard review={currentReview} />}
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;