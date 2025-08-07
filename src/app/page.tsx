"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownPhase, setCountdownPhase] = useState('start'); // 'start' or 'submission'

  useEffect(() => {
    const startDate = new Date("2025-09-13T10:00:00-07:00"); // September 13, 2025 at 10:00 AM PT
    const submissionDate = new Date("2025-09-13T18:00:00-07:00"); // September 13, 2025 at 6:00 PM PT
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      let targetDate;
      let phase;
      
      if (now < startDate.getTime()) {
        // Before event starts - countdown to start
        targetDate = startDate;
        phase = 'start';
      } else if (now < submissionDate.getTime()) {
        // Event has started - countdown to submission deadline
        targetDate = submissionDate;
        phase = 'submission';
      } else {
        // Event has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCountdownPhase('ended');
        return;
      }
      
      setCountdownPhase(phase);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-secondary p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Image
            src="/sce-logo.png"
            alt="SCE SJSU Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <div>
            <div className="text-sm font-medium text-foreground">Software & Computer Engineering Society</div>
            <div className="text-sm text-tertiary">San José State University</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Centered content container */}
        <div className="w-full max-w-5xl mx-auto text-center">
          
          {/* Event Title */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4 tracking-tight">
              SCE HACKATHON
            </h1>
            <div className="text-2xl md:text-3xl text-accent font-medium">
              September 13, 2025 at 10:00 AM PT
            </div>
            {countdownPhase === 'submission' && (
              <div className="text-lg md:text-xl text-red-400 mt-2 font-semibold">
                ⏰ PROJECT SUBMISSIONS DUE AT 6:00 PM
              </div>
            )}
          </div>

          {/* Countdown Timer - Large and centered */}
          <div className="mb-20">
            {/* Countdown Phase Indicator */}
            <div className="text-center mb-6">
              {countdownPhase === 'start' && (
                <div className="text-xl md:text-2xl text-tertiary font-medium">
                  TIME UNTIL HACKATHON STARTS
                </div>
              )}
              {countdownPhase === 'submission' && (
                <div className="text-xl md:text-2xl text-accent font-bold animate-pulse">
                  ⚡ TIME UNTIL PROJECT SUBMISSION DEADLINE ⚡
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-8 md:gap-16 mb-8">
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-foreground mb-2 font-mono">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base font-medium text-tertiary tracking-widest">DAYS</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-foreground mb-2 font-mono">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base font-medium text-tertiary tracking-widest">HOURS</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-foreground mb-2 font-mono">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base font-medium text-tertiary tracking-widest">MINUTES</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-foreground mb-2 font-mono">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base font-medium text-tertiary tracking-widest">SECONDS</div>
              </div>
            </div>

            {countdownPhase === 'ended' && (
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-widest">
                HACKATHON HAS ENDED
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Timeline Section - Linear progress bar style */}
      <section className="bg-secondary/5 border-t border-secondary py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Timeline Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">EVENT SCHEDULE</h2>
            <div className="text-tertiary">Follow the timeline below</div>
          </div>
          
          {/* Linear Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-secondary"></div>
            <div className="absolute top-6 left-0 h-0.5 bg-accent" style={{width: '100%'}}></div>
            
            {/* Timeline Points */}
            <div className="flex justify-between relative">
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">10:00 AM</div>
                <div className="text-sm font-medium text-foreground">Check-in / Breakfast</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">10:30 AM</div>
                <div className="text-sm font-medium text-foreground">Opening / Kickoff</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">11:00 AM</div>
                <div className="text-sm font-medium text-foreground">Hackathon Begins</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">1:00 PM</div>
                <div className="text-sm font-medium text-foreground">Lunch Break</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">6:00 PM</div>
                <div className="text-sm font-medium text-foreground">Project Submissions</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-accent mb-1">7:00 PM</div>
                <div className="text-sm font-medium text-foreground">Presentations</div>
              </div>
              
              <div className="flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-background mb-4 relative z-10"></div>
                <div className="text-lg font-bold text-red-500 mb-1">8:00 PM</div>
                <div className="text-sm font-medium text-foreground">Awards & Closing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 border-t border-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Build. Code. Create.</h2>
          
          <p className="text-lg md:text-xl text-tertiary mb-8 max-w-2xl mx-auto">
            Join us for a full-day hackathon where creativity meets technology and ideas become reality.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="border-2 border-accent hover:bg-accent hover:text-background text-accent px-12 py-4 font-bold text-lg tracking-wide transition-all">
              REGISTER NOW
            </button>
            <button className="bg-accent hover:bg-accent/80 text-background px-12 py-4 font-bold text-lg tracking-wide transition-all">
              VIEW DETAILS
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="border border-secondary text-tertiary px-4 py-2 text-sm font-medium tracking-wide">WEB DEVELOPMENT</span>
            <span className="border border-secondary text-tertiary px-4 py-2 text-sm font-medium tracking-wide">MOBILE APPS</span>
            <span className="border border-secondary text-tertiary px-4 py-2 text-sm font-medium tracking-wide">NETWORKING</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary py-8 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/sce-logo.png"
                alt="SCE SJSU Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <div className="text-left">
                <div className="text-foreground text-sm font-medium">Software & Computer Engineering Society</div>
                <div className="text-tertiary text-xs">San José State University</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
