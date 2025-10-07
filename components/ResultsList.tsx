import React from 'react';
import type { Course } from '../types';
import ResultCard from './ResultCard';

interface ResultsListProps {
  courses: Course[];
}

const ResultsList: React.FC<ResultsListProps> = ({ courses }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-cyan-300 mb-4 border-b-2 border-gray-700 pb-2">Found Specialization Structure</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course, index) => (
          <ResultCard key={`${course.url}-${index}`} course={course} />
        ))}
      </div>
    </section>
  );
};

export default ResultsList;