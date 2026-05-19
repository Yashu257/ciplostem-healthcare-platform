import { motion } from 'framer-motion';
import { Database, FileText, Zap, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { aiApiService, type DocumentStats } from '@/services/aiApiService';

export function AIStatsPanel() {
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await aiApiService.getDocumentStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      icon: Database,
      label: 'Knowledge Base',
      value: stats?.initialized ? 'Active' : 'Inactive',
      color: 'from-cyan-500 to-teal-500',
      status: stats?.initialized
    },
    {
      icon: FileText,
      label: 'Medical Documents',
      value: stats?.documentCount || 0,
      color: 'from-blue-500 to-cyan-500',
      status: true
    },
    {
      icon: Zap,
      label: 'AI Model',
      value: 'GPT-4',
      color: 'from-purple-500 to-pink-500',
      status: true
    },
    {
      icon: CheckCircle,
      label: 'Status',
      value: 'Ready',
      color: 'from-emerald-500 to-green-500',
      status: true
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-neutral-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-500 to-teal-500" />
        <h3 className="text-sm font-semibold text-neutral-700">
          AI System Status
        </h3>
      </div>

      <div className="space-y-3">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="text-xs text-neutral-500 mb-0.5">
                  {item.label}
                </div>
                <div className="text-sm font-semibold text-neutral-800">
                  {item.value}
                </div>
              </div>

              {item.status && (
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info message */}
      <div className="pt-3 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 leading-relaxed">
          AI powered by advanced RAG architecture with real-time access to medical documentation and clinical evidence.
        </p>
      </div>
    </motion.div>
  );
}
