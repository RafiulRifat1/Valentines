"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

const images = [
  "/game-photos/1.avif", "/game-photos/2.avif", "/game-photos/3.avif",
  "/game-photos/4.avif", "/game-photos/5.avif", "/game-photos/6.avif",
  "/game-photos/7.avif", "/game-photos/8.avif", "/game-photos/9.avif",
  "/game-photos/10.avif", "/game-photos/11.avif", "/game-photos/12.avif",
  "/game-photos/13.avif", "/game-photos/14.avif", "/game-photos/15.avif",
  "/game-photos/16.avif", "/game-photos/17.avif", "/game-photos/18.avif",
  "/game-photos/19.avif", "/game-photos/20.avif", "/game-photos/21.avif",
  "/game-photos/22.avif", "/game-photos/23.avif", "/game-photos/24.avif",
  "/game-photos/25.avif", "/game-photos/26.avif", "/game-photos/27.avif",
  "/game-photos/28.avif", "/game-photos/29.avif", "/game-photos/30.avif",
  "/game-photos/31.avif", "/game-photos/32.avif", "/game-photos/33.avif",
  "/game-photos/34.avif", "/game-photos/35.avif", "/game-photos/36.avif",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string; } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  // --- Telegram Notification Logic ---
  const notifyTelegram = async (decision: string) => {
    const BOT_TOKEN = "8273925695:AAGrQO0SPvUcKWdMlvpYOeLTu-UI5HbWjWU";
    const CHAT_ID = "6011375797"; 

    const text = `💌 **Sinthiya Update**\n\nসিদ্ধান্ত: ${decision}\nসময়: ${new Date().toLocaleString('bn-BD')}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      });
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    notifyTelegram("হুমমম, রাজি! 😍 (Yes এ ক্লিক করেছে)");
    setShowFireworks(true);
    setStep(3);
  };

  const handleNoHoverOrClick = () => {
    notifyTelegram("পালাতে চাচ্ছে! 😢 (No বাটনে মাউস নিয়েছে বা ক্লিক করেছে)");
    setPosition(getRandomPosition());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 text-center px-4 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Congratulations! You have completed the game.
          </motion.h2>
        )}
        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 text-center px-4 ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            I have a surprise for you!
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10 w-full h-full justify-center"
          >
            {/* Background Memory Grid */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10 -z-10 pointer-events-none">
              {images.map((src, index) => (
                <div key={index} className="relative h-40">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2 className={`text-4xl md:text-5xl font-semibold mb-8 text-center px-4 ${playfairDisplay.className}`}>
              Will you be my Valentine?
            </h2>
            
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
              priority
            />

            <div className="flex space-x-4 mt-10 relative">
              <button
                className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleYesClick}
              >
                Yes, Rifat I will! 🥰
              </button>
              
              <button
                className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={position ? { position: "absolute", top: position.top, left: position.left, zIndex: 100 } : {}}
                onMouseEnter={handleNoHoverOrClick}
                onClick={handleNoHoverOrClick}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center text-center px-4 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Thank you for accepting💕
            <p className="text-sm mt-4 text-gray-300">
              Sinthiya, You are my valentines now. <br/>
              <span className="text-rose-400 font-bold text-lg">Say I LOVE YOU 💌</span>
            </p>
            <Image
              src="/hamster_jumping.gif"
              alt="Happy Hamster"
              width={250}
              height={250}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Fireworks
            options={{ autoresize: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}