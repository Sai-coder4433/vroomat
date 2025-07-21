
import React from 'react';

const StatsSection: React.FC = () => {
    return (
        <div className="bg-brand-gray-100 dark:bg-brand-dark py-16 px-6 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white">
                        Trusted by Thousands
                    </h2>
                    <p className="mt-4 text-lg text-brand-gray-600 dark:text-brand-gray-400">
                        We're committed to getting you back on the road, fast. Our network is optimized for speed and quality service.
                    </p>
                </div>
                <div className="flex justify-center items-center space-x-8">
                    <div className="text-center">
                        <p className="text-5xl font-bold text-brand-red">92%</p>
                        <p className="mt-2 text-sm font-semibold text-brand-gray-500 dark:text-brand-gray-400">
                            Breakdowns Resolved<br />within 30 mins
                        </p>
                    </div>
                     <div className="text-center">
                        <p className="text-5xl font-bold text-brand-red">98%</p>
                        <p className="mt-2 text-sm font-semibold text-brand-gray-500 dark:text-brand-gray-400">
                            Customer<br />Satisfaction
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;