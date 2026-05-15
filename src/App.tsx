/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  Menu, 
  LayoutGrid, 
  TrendingUp, 
  Zap, 
  Globe, 
  MoreHorizontal, 
  X,
  Share2,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  CircleDollarSign,
  User,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';

const COLORS = {
  bg: '#050505',
  card: '#141414',
  accent: '#22c55e', // Success green from design
  blue: '#3b82f6', // Brighter blue for branding
  text: '#FFFFFF',
  secondary: '#71717a', // zinc-500 equivalent
  border: 'rgba(255, 255, 255, 0.05)'
};

const MarketItem = ({ title, price, volume, percentage, isGreen = true }: { title: string, price: string, volume: string, percentage: string, isGreen?: boolean }) => (
  <div className="flex items-center justify-between p-4 border-b border-[#2A2B32] hover:bg-[#1A1B20] transition-colors cursor-pointer group">
    <div className="flex flex-col">
      <span className="text-white font-medium group-hover:text-[#20A1FF] transition-colors">{title}</span>
      <span className="text-[#94949C] text-xs font-mono">{volume} Vol.</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-white font-mono text-xl font-bold">{percentage}%</span>
      <div className={`px-4 py-1.5 rounded text-sm font-bold min-w-[90px] text-center ${isGreen ? 'bg-[#27C074]/10 text-[#27C074] border border-[#27C074]/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
        Buy {isGreen ? 'Yes' : 'No'} {price}
      </div>
       <div className="px-4 py-1.5 rounded bg-[#1C1D21] text-[#94949C] text-sm font-bold min-w-[90px] text-center border border-[#2A2B32]">
        Buy {isGreen ? 'No' : 'Yes'} {isGreen ? '90¢' : '10¢'}
      </div>
    </div>
  </div>
);

export default function App() {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    
    setIsDownloading(true);
    try {
      // Ensure the background and styles are captured correctly
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        backgroundColor: '#050505',
        style: {
          borderRadius: '40px'
        },
        filter: (node) => {
          if (node.classList && node.classList.contains('no-capture')) {
            return false;
          }
          return true;
        }
      });
      
      const link = document.createElement('a');
      link.download = `polymarket-receipt-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating receipt image:', err);
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="min-h-screen font-sans selection:bg-[#20A1FF]/30" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      {/* Navigation */}
      <nav className="h-16 border-b border-[#2A2B32] px-4 flex items-center justify-between sticky top-0 bg-[#0F0F12]/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
               <div className="w-6 h-6 border-4 border-black rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">Polymarket</span>
            <div className="ml-2">
              <img 
                src="https://flagcdn.com/nl.svg" 
                className="w-5 h-3.5 rounded-sm object-cover opacity-80" 
                alt="Dutch Flag"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center bg-[#1A1B20] border border-[#2A2B32] rounded-lg px-3 py-1.5 w-[400px]">
            <Search className="w-4 h-4 text-[#94949C]" />
            <input 
              type="text" 
              placeholder="Search polymarkets..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-white placeholder:text-[#94949C]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#20A1FF] text-sm font-medium cursor-pointer hover:opacity-80">
            <span className="w-4 h-4 border border-[#20A1FF] rounded-full flex items-center justify-center text-[10px] font-bold">i</span>
            How it works
          </div>
          <button className="text-sm font-medium hover:text-[#20A1FF] transition-colors">Log In</button>
          <button className="bg-[#20A1FF] hover:bg-[#20A1FF]/90 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all transform active:scale-95 shadow-[0_0_20px_rgba(32,161,255,0.2)]">
            Sign Up
          </button>
          <Menu className="w-6 h-6 text-[#94949C] lg:hidden" />
        </div>
      </nav>

      {/* Sub-nav */}
      <div className="h-12 border-b border-[#2A2B32] overflow-x-auto [&::-webkit-scrollbar]:hidden flex items-center gap-6 px-4 md:px-8 text-sm font-medium text-[#94949C]">
        {[
          { icon: TrendingUp, label: 'Trending' },
          { icon: Zap, label: 'Breaking' },
          { icon: LayoutGrid, label: 'New' },
          { icon: ChevronDown, label: 'Politics', active: true },
          { label: 'Sports' },
          { label: 'Crypto' },
          { label: 'Esports' },
          { label: 'Iran' },
          { label: 'Finance' },
          { label: 'Tech' }
        ].map((item, idx) => (
          <div key={idx} className={`flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:text-white transition-colors pb-3 border-b-2 ${item.active ? 'border-[#20A1FF] text-white' : 'border-transparent'}`}>
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.label}
          </div>
        ))}
      </div>

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 lg:grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#94949C]">
              Politics <span className="text-[#2A2B32]">•</span> Trump
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">What will Trump say during bilateral events with Xi Jinping?</h1>
            <div className="flex items-center gap-4 text-sm text-[#94949C]">
              <span className="font-mono text-white">$2,552,709 Vol.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> May 15, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-6 border-b border-[#2A2B32] pb-2 text-sm font-bold">
            <span className="text-white border-b-2 border-white pb-2 cursor-pointer">Markets</span>
            <span className="text-[#94949C] hover:text-white pb-2 cursor-pointer transition-colors">Activity</span>
            <span className="text-[#94949C] hover:text-white pb-2 cursor-pointer transition-colors">Comments</span>
          </div>

          <div className="bg-[#16171B] rounded-xl border border-[#2A2B32] overflow-hidden">
            <MarketItem title="Covid / Pandemic" volume="$58,994" percentage="2" price="3.0¢" />
            <MarketItem title="AI / Artificial Intelligence" volume="$197,684" percentage="16" price="17¢" />
            <MarketItem title="Iran" volume="$487,634" percentage="99" price="99.3¢" />
            <MarketItem title="Japan / Korea" volume="$27,304" percentage="4" price="5.1¢" />
             <MarketItem title="Friend of mine" volume="$64,857" percentage="14" price="17¢" />
          </div>
        </div>

        <aside className="hidden lg:block space-y-6 pt-4">
          <div className="bg-[#16171B] rounded-2xl border border-[#2A2B32] p-6 shadow-2xl">
            <div className="flex items-center gap-1 mb-4">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" className="w-8 h-8 rounded object-cover" alt="Xi & Trump" />
               <div className="text-xs font-bold leading-tight">
                  <div className="text-[#94949C]">What will Trump say during...</div>
                  <div className="text-white">Covid / Pandemic • <span className="text-[#27C074]">Yes</span></div>
               </div>
            </div>

            <div className="flex bg-[#0F0F12] p-1 rounded-xl mb-6">
              <button className="flex-1 py-2 text-sm font-bold text-white bg-[#1A1B20] rounded-lg border border-[#2A2B32]">Buy</button>
              <button className="flex-1 py-2 text-sm font-bold text-[#94949C] hover:text-white transition-colors">Sell</button>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="bg-[#27C074] text-white px-6 py-2 rounded-xl text-sm font-bold cursor-pointer">Yes 3.0¢</div>
                  <div className="bg-[#1A1B20] text-[#94949C] px-6 py-2 rounded-xl text-sm font-bold border border-[#2A2B32] cursor-pointer">No 98.7¢</div>
               </div>

               <div className="space-y-2">
                 <div className="text-xs font-bold text-[#94949C] uppercase tracking-wider">Amount</div>
                 <div className="relative">
                    <input type="text" value="$0" readOnly className="w-full bg-transparent text-5xl font-bold outline-none text-right placeholder:text-[#2A2B32] pr-2" />
                 </div>
                 <div className="flex gap-2">
                    {['+$1', '+$5', '+$10', '+$100'].map(val => (
                      <button key={val} className="flex-1 bg-[#1A1B20] border border-[#2A2B32] text-xs font-bold py-1.5 rounded-lg text-[#94949C] hover:text-white transition-colors">{val}</button>
                    ))}
                 </div>
               </div>

               <button className="w-full bg-[#20A1FF] hover:bg-[#20A1FF]/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]">
                 Trade
               </button>

               <p className="text-[10px] text-center text-[#94949C] leading-relaxed">
                 By trading, you agree to the <span className="underline cursor-pointer">Terms of Use</span>.
               </p>
            </div>
          </div>
          
          <div className="p-4 border border-[#2A2B32] border-dashed rounded-xl text-center">
             <div className="text-xs font-medium text-[#94949C]">Want to trade with crypto?</div>
             <div className="text-[#20A1FF] text-sm font-bold mt-1 cursor-pointer">Connect Wallet</div>
          </div>
        </aside>
      </main>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowConfirmation(false)}
            />
            <motion.div 
              ref={receiptRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-[600px] glass-card rounded-[40px] p-10 flex flex-col items-center shadow-[0_0_100px_-20px_rgba(0,0,0,1)] relative z-10"
            >
              {/* Background Glow Effect */}
              <div className="absolute -top-20 -z-10 w-80 h-80 success-gradient-glow opacity-50" />

              {/* Success Header */}
              <div className="mb-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </motion.div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase italic">Payment Confirmed</h1>
                <p className="text-zinc-500 text-sm">Transaction successfully processed on Polygon Network</p>
              </div>

              {/* Main Content */}
              <div className="w-full space-y-6">
                {/* Payer Info */}
                <div className="flex justify-between items-center pb-6 border-b border-white/5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Customer Name</p>
                    <p className="text-lg font-semibold text-zinc-100">Ujwal Gugu</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Market Platform</p>
                    <p className="text-lg font-bold text-blue-500 tracking-tighter italic">POLYMARKET</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">AI Markets Prediction Contract</span>
                    <span className="text-zinc-100 font-medium font-mono text-lg">$10.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Iran Geopolitical Outlook (IR-01)</span>
                    <span className="text-zinc-100 font-medium font-mono text-lg">$10.00</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="py-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* Totals */}
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Transaction ID</p>
                    <p className="text-xs font-mono text-zinc-400">TX-8492017382-POL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-green-500 mb-1 font-bold">Total Amount Paid</p>
                    <p className="text-4xl font-bold text-white tracking-tighter">$20.00</p>
                  </div>
                </div>
              </div>

              {/* Footer Branding */}
              <div className="mt-10 w-full flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
                <span>Verified Hash: PM-291-8291-4402</span>
                <span>May 15, 2026 • 11:12 UTC</span>
              </div>

              {/* Interaction Buttons (Integrated into the Sophisticated look) */}
              <div className="w-full grid grid-cols-2 gap-4 mt-4 no-capture">
                <button 
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading}
                  className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold py-3 rounded-full border border-white/10 tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDownloading ? 'Downloading...' : (
                    <>
                      Download Receipt <Download className="w-3 h-3" />
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold py-3 rounded-full tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-30">
        <button className="w-14 h-14 bg-[#20A1FF] rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-all">
          <CircleDollarSign className="w-6 h-6" />
        </button>
      </div>

       <footer className="mt-20 border-t border-[#2A2B32] py-12 px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
               <div className="w-4 h-4 border-2 border-black rotate-45"></div>
            </div>
            <span className="text-lg font-bold tracking-tight">Polymarket</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-[#94949C] uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
            <span className="hover:text-white cursor-pointer transition-colors">Careers</span>
          </div>
          <div className="text-[10px] text-[#94949C] uppercase font-mono tracking-widest">
            © 2026 POLYMARKET. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
