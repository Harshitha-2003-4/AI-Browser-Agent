
import React, { useState } from 'react';
import type { Course, GroundingSource } from './types';
import { searchCoursera } from './services/geminiService';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import LoadingSpinner from './components/LoadingSpinner';
import SourceLinks from './components/SourceLinks';
import InitialState from './components/InitialState';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Course[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async (topic: string) => {
    if (!topic.trim()) return;
    
    setQuery(topic);
    setIsLoading(true);
    setError(null);
    setResults([]);
    setSources([]);
    setHasSearched(true);

    try {
      const searchResult = await searchCoursera(topic);
      setResults(searchResult.courses);
      setSources(searchResult.sources);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-wider">
            AI Course Finder
          </h1>
          <p className="text-gray-400 mt-2 font-mono">
            Autonomous agent searching Coursera for courses on any topic.
          </p>
        </header>

        <main>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          <div className="mt-8 min-h-[400px]">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="text-center p-6 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="font-bold text-red-400">Error</p>
                <p className="mt-2 text-gray-300">{error}</p>
              </div>
            )}
            {!isLoading && !error && !hasSearched && <InitialState />}
            {!isLoading && !error && hasSearched && results.length === 0 && (
                <div className="text-center p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
                    <p className="font-bold text-yellow-400">No Results</p>
                    <p className="mt-2 text-gray-300">The agent could not find any courses for "{query}". Try a different topic.</p>
                </div>
            )}
            {!isLoading && !error && results.length > 0 && (
              <div className="space-y-8">
                <ResultsList courses={results} />
                {sources.length > 0 && <SourceLinks sources={sources} />}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
