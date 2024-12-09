'use client';

import { useState, useEffect } from 'react';
import { Loader2, Wallet } from 'lucide-react';

declare global {
  interface Window {
    solana?: any;
  }
}

export default function Home() {
  const [connecting, setConnecting] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(0);

  const connectPhantom = async () => {
    if (!window.solana?.isPhantom) {
      alert('Phantom wallet is not installed');
      return;
    }

    try {
      setConnecting(true);
      const resp = await window.solana.connect();
      setWallets([resp.publicKey.toString()]);
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-bold">SOL Consolidator</h1>
        
        {!wallets.length ? (
          <button
            onClick={connectPhantom}
            disabled={connecting}
            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {connecting ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Wallet className="h-4 w-4" />
            )}
            <span>Connect Phantom</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h2 className="font-medium mb-2">Connected Wallet</h2>
              <p className="text-sm font-mono">{wallets[0]}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h2 className="font-medium mb-2">Progress</h2>
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{width: `${(currentWallet / 100) * 100}%`}}
                  />
                </div>
                <span className="text-sm">{currentWallet}/100</span>
              </div>
            </div>

            <button
              className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center"
              onClick={() => setProcessing(true)}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Start Consolidation'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}