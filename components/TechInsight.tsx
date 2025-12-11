import React, { useState } from 'react';
import { Search, Globe, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchTechTrends } from '../services/geminiService';
import { SearchResult } from '../types';
import content from '../content.json';

const TechInsight: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQueries = [
    "What's new in React Native 2025?",
    "iOS vs Android market share 2024",
    "Flutter performance tips",
    "Future of mobile AI"
  ];

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setIsLoading(true);
    setResult(null);

    const data = await searchTechTrends(q);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
            <Globe size={14} />
            <span>{content.techInsight.label}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.techInsight.title}</h2>
          <p className="text-gray-400">
            {content.techInsight.description}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl flex items-center p-2 shadow-xl">
            <Search className="text-gray-400 ml-3" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={content.techInsight.placeholder}
              className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none text-lg placeholder-gray-500"
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={isLoading || !query.trim()}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl font-medium transition-colors border border-slate-700 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
            </button>
          </div>
        </div>

        {/* Predefined Chips */}
        {!result && !isLoading && (
          <div className="flex flex-wrap justify-center gap-3">
            {predefinedQueries.map((q) => (
              <button
                key={q}
                onClick={() => handleSearch(q)}
                className="px-4 py-2 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/50 text-sm text-gray-300 hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-500 rounded-full"></span>
              Insight Result
            </h3>
            <div className="prose prose-invert max-w-none mb-6 text-gray-300 leading-relaxed">
              {result.text}
            </div>

            {result.sources.length > 0 && (
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sources</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.sources.slice(0, 4).map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/50 hover:border-brand-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 text-brand-400 group-hover:text-brand-300">
                        <Globe size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-200 truncate group-hover:text-white">{source.title}</div>
                        <div className="text-xs text-gray-500 truncate">{new URL(source.uri).hostname}</div>
                      </div>
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechInsight;