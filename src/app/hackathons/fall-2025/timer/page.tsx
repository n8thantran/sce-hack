"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next"

export default function Fall2025TimerPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentPhase, setCurrentPhase] = useState('before'); // 'before', 'hacking', 'ended'
  const [phaseText, setPhaseText] = useState('');

  useEffect(() => {
    const hackathonDate = new Date("2025-09-05T09:00:00-07:00"); // September 5, 2025 at 9:00 AM PT
    const hackingStartTime = new Date("2025-09-05T10:00:00-07:00"); // Hacking starts at 10:00 AM PT
    const hackingEndTime = new Date("2025-09-05T15:00:00-07:00"); // Hacking ends at 3:00 PM PT (submission deadline)
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      let targetDate;
      let phase;
      let text;
      
      if (now < hackathonDate.getTime()) {
        // Before hackathon starts
        targetDate = hackathonDate;
        phase = 'before';
        text = 'Time until SCE Hacks 1.0 w/ Mintlify Begins';
      } else if (now < hackingStartTime.getTime()) {
        // Hackathon started but hacking hasn't begun yet (opening ceremony, etc.)
        targetDate = hackingStartTime;
        phase = 'before-hacking';
        text = 'Time until Hacking Time Begins';
      } else if (now < hackingEndTime.getTime()) {
        // Currently in hacking time
        targetDate = hackingEndTime;
        phase = 'hacking';
        text = 'Hacking Time Remaining';
      } else {
        // Hackathon has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentPhase('ended');
        setPhaseText('SCE Hacks 1.0 w/ Mintlify Has Ended');
        return;
      }
      
      setCurrentPhase(phase);
      setPhaseText(text);
      const distance = targetDate.getTime() - now;
      
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'before':
      case 'before-hacking':
        return 'text-blue-400';
      case 'hacking':
        return 'text-red-400 animate-pulse';
      case 'ended':
        return 'text-gray-400';
      default:
        return 'text-blue-400';
    }
  };

  const getBackgroundGradient = () => {
    switch (currentPhase) {
      case 'before':
      case 'before-hacking':
        return 'bg-gradient-to-br from-blue-900/20 to-purple-900/20';
      case 'hacking':
        return 'bg-gradient-to-br from-red-900/20 to-orange-900/20';
      case 'ended':
        return 'bg-gradient-to-br from-gray-900/20 to-slate-900/20';
      default:
        return 'bg-gradient-to-br from-blue-900/20 to-purple-900/20';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} text-foreground`}>
      {/* Header */}
      <header className="border-b border-secondary py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <Image
              src="/sce-logo.png"
              alt="SCE SJSU Logo"
              width={48}
              height={48}
              className="rounded"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">SCE Hackathons</h1>
              <p className="text-sm text-tertiary">Software & Computer Engineering Society</p>
            </div>
          </Link>
          <div className="ml-auto">
            <Link 
              href="/"
              className="text-accent hover:text-accent/80 font-medium transition-colors mr-4"
            >
              ← All Hackathons
            </Link>
            <Link 
              href="/hackathons/fall-2025"
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Event Details
            </Link>
          </div>
        </div>
      </header>

      {/* Main Timer Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Phase Text */}
          <div className={`text-2xl md:text-3xl font-bold mb-8 ${getPhaseColor()}`}>
            {phaseText.includes('Mintlify') ? (
              <>
                {phaseText.split('Mintlify')[0]}
                <span style={{ color: '#18e299' }}>Mintlify</span>
                {phaseText.split('Mintlify')[1]}
              </>
            ) : (
              phaseText
            )}
          </div>

          {/* Event Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            SCE HACKS 1.0
          </h1>
          <div className="text-2xl md:text-3xl text-accent font-medium mb-8">
            w/ <span style={{ color: '#18e299' }}>Mintlify</span>
          </div>

          {/* Event Details */}
          <div className="text-lg md:text-xl text-tertiary mb-12">
            <div>September 5, 2025</div>
            <div>9:00 AM - 4:45 PM PT</div>
            <div>MLK Library Room 225</div>
          </div>

          {/* Countdown Timer */}
          {currentPhase !== 'ended' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div className="bg-background/50 border border-secondary rounded-lg p-6">
                <div className={`text-4xl md:text-6xl font-bold ${getPhaseColor()}`}>
                  {timeLeft.days}
                </div>
                <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                  Days
                </div>
              </div>
              <div className="bg-background/50 border border-secondary rounded-lg p-6">
                <div className={`text-4xl md:text-6xl font-bold ${getPhaseColor()}`}>
                  {timeLeft.hours}
                </div>
                <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                  Hours
                </div>
              </div>
              <div className="bg-background/50 border border-secondary rounded-lg p-6">
                <div className={`text-4xl md:text-6xl font-bold ${getPhaseColor()}`}>
                  {timeLeft.minutes}
                </div>
                <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                  Minutes
                </div>
              </div>
              <div className="bg-background/50 border border-secondary rounded-lg p-6">
                <div className={`text-4xl md:text-6xl font-bold ${getPhaseColor()}`}>
                  {timeLeft.seconds}
                </div>
                <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                  Seconds
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-background/50 border border-secondary rounded-lg p-12 mb-12">
              <div className="text-4xl md:text-6xl font-bold text-gray-400 mb-4">
                🏁
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-400">
                Hackathon Complete!
              </div>
              <div className="text-lg text-tertiary mt-4">
                Thank you to all participants. See you at the next event!
              </div>
            </div>
          )}

          {/* Phase-specific Messages */}
          {currentPhase === 'hacking' && (
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 mb-8">
              <div className="text-red-400 font-bold text-xl mb-2">🔴 HACKING TIME IS LIVE!</div>
              <div className="text-tertiary">
                Projects must be submitted by 3:00 PM PT. Good luck!
              </div>
            </div>
          )}

          {(currentPhase === 'before' || currentPhase === 'before-hacking') && (
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6 mb-8">
              <div className="text-blue-400 font-bold text-xl mb-2">📅 Get Ready!</div>
              <div className="text-tertiary">
                {currentPhase === 'before' 
                  ? "Don't forget to bring your laptop, charger, and development tools!"
                  : "Opening ceremony in progress. Hacking begins soon!"
                }
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/hackathons/fall-2025"
              className="bg-accent hover:bg-accent/90 text-background font-bold py-3 px-6 rounded-lg transition-colors"
            >
              View Full Details
            </Link>
            <Link 
              href="/"
              className="bg-background/50 hover:bg-background/70 border border-secondary text-foreground font-bold py-3 px-6 rounded-lg transition-colors"
            >
              All Hackathons
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary py-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/sce-logo.png"
                alt="SCE SJSU Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <div>
                <div className="text-foreground text-sm font-medium">
                  Software & Computer Engineering Society
                </div>
                <div className="text-tertiary text-xs">San José State University</div>
              </div>
            </div>
            <div className="text-tertiary text-sm">
              © 2025 SCE SJSU. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      <Analytics/>
    </div>
  );
}
