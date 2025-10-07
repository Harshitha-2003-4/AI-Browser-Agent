
import React from 'react';
import type { GroundingSource } from '../types';

interface SourceLinksProps {
  sources: GroundingSource[];
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-400 mb-3 border-b-2 border-gray-700 pb-2">Data Sources</h2>
      <ul className="list-disc list-inside space-y-2 text-sm">
        {sources.map((source, index) => (
          <li key={`${source.uri}-${index}`}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 hover:underline transition-colors"
              title={source.uri}
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
       <p className="text-xs text-gray-600 mt-4">
        Powered by Google Search. These sources were used by the AI to generate the course list.
      </p>
    </section>
  );
};

export default SourceLinks;
