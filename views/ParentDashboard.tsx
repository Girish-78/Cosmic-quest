import React, { useEffect, useState } from 'react';
import { getDailySkyFact } from '../services/geminiService';
import { BookOpen, CheckCircle, ShieldAlert } from 'lucide-react';

const ParentDashboard: React.FC = () => {
    const [fact, setFact] = useState<string>("Loading your daily sky fact...");

    useEffect(() => {
        getDailySkyFact().then(setFact);
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto pb-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">Parent & Guardian Mode</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Fact Card */}
                <div className="bg-indigo-900/40 p-6 rounded-2xl border border-indigo-500/30">
                    <div className="flex items-center gap-2 mb-4 text-indigo-300">
                        <BookOpen size={20} />
                        <h3 className="font-bold">Daily Sky Fact</h3>
                    </div>
                    <p className="text-lg italic text-white/90">"{fact}"</p>
                    <p className="text-xs text-indigo-400 mt-4">Powered by AI to spark curiosity.</p>
                </div>

                {/* Learning Progress */}
                <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-4 text-emerald-300">
                        <CheckCircle size={20} />
                        <h3 className="font-bold">Learning Tracker</h3>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm border-b border-emerald-500/10 pb-2">
                            <span>Solar System Basics</span>
                            <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-200 text-xs">In Progress</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-emerald-500/10 pb-2">
                            <span>Zodiac Elements</span>
                            <span className="px-2 py-0.5 bg-gray-500/20 rounded text-gray-400 text-xs">Not Started</span>
                        </li>
                        <li className="flex justify-between items-center text-sm">
                            <span>Indian Planet Names</span>
                            <span className="px-2 py-0.5 bg-gray-500/20 rounded text-gray-400 text-xs">Not Started</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-red-900/20 p-6 rounded-2xl border border-red-500/20 flex gap-4">
                 <ShieldAlert className="text-red-400 shrink-0" size={32} />
                 <div>
                     <h3 className="text-red-200 font-bold mb-1">Privacy Note</h3>
                     <p className="text-sm text-red-100/70">
                         All birth data entered in the "Birth Sky Map" is processed using a secure AI session and is not stored permanently on any server. The app is designed to be purely educational and entertainment-focused (Edutainment). It does not provide real predictions or medical advice.
                     </p>
                 </div>
            </div>
        </div>
    );
};

export default ParentDashboard;