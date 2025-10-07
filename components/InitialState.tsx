
import React from 'react';

const InitialState: React.FC = () => {
    return (
        <div className="text-center p-6 bg-gray-800/50 border border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l.01.01" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-400">Agent is standing by</h3>
            <p className="mt-2 text-gray-500 max-w-md">
                Enter a topic above and dispatch the AI agent to search for relevant courses on Coursera.
            </p>
        </div>
    );
};

export default InitialState;
