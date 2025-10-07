import React from 'react';
import type { Course } from '../types';

interface ResultCardProps {
  course: Course;
}

const ResultCard: React.FC<ResultCardProps> = ({ course }) => {
  return (
    <div
      className="p-5 bg-gray-800 rounded-lg border border-gray-700 transition-all duration-300"
    >
      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-sm"
        aria-label={`View course: ${course.title}`}
      >
        <h3 className="font-semibold text-lg text-cyan-400">{course.title}</h3>
        <p className="text-xs text-gray-500 mt-1 break-all">{course.url}</p>
      </a>

      {course.chapters && course.chapters.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-700">
            <h4 className="font-semibold text-gray-300 text-md mb-2">Chapters</h4>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 text-sm pl-2">
                {course.chapters.map((chapter, index) => (
                    <li key={`${chapter.title}-${index}`}>{chapter.title}</li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default ResultCard;