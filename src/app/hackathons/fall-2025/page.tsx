"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Fall2025Hackathon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownPhase, setCountdownPhase] = useState('start'); // 'start' or 'submission'
  const [activeSection, setActiveSection] = useState(1); // Track which section is active

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

  // Function to get content for each section
  const getSectionContent = (section: number) => {
    const sections = {
      1: {
        title: "Lorem Ipsum Dolor Sit Amet?",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet <strong className="text-foreground">consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-blue-400 text-xl">ℹ️</div>
              <div>
                <span className="text-foreground font-medium">Lorem ipsum: </span>
                <span className="text-foreground">Dolor sit amet consectetur adipiscing elit sed do eiusmod</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Ipsum Dolor</h3>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Lorem ipsum dolor sit amet consectetur</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Sed do eiusmod tempor incididunt ut labore</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Ut enim ad minim veniam quis nostrud</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Duis aute irure dolor in reprehenderit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Excepteur sint occaecat cupidatat non</span>
              </li>
            </ul>
          </>
        )
      },
      2: {
        title: "Lorem Ipsum Setup",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Ipsum Process</h3>
            
            <ol className="space-y-3 text-tertiary list-decimal list-inside mb-6">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit sed do</li>
              <li>Eiusmod tempor incididunt ut labore</li>
              <li>Dolore magna aliqua ut enim</li>
            </ol>

            <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6">
              <div className="text-accent font-bold mb-2">📝 Lorem Ipsum</div>
              <p className="text-tertiary mb-4">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/80 text-background px-6 py-2 rounded-lg font-medium transition-colors inline-block"
              >
                Lorem Form
              </a>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Ipsum Bring</h3>
            <ul className="space-y-2 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Lorem ipsum dolor sit amet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Consectetur adipiscing elit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Sed do eiusmod tempor!</span>
              </li>
            </ul>
          </>
        )
      },
      3: {
        title: "Schedule & Important Info",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Here&pos;s the detailed schedule for the event day and important reminders to ensure you have the best experience.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Event Schedule</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">10:00 AM</span>
                <div>
                  <div className="text-foreground font-medium">Check-in & Welcome</div>
                  <div className="text-tertiary text-sm">Registration and team formation</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">10:30 AM</span>
                <div>
                  <div className="text-foreground font-medium">Opening Ceremony</div>
                  <div className="text-tertiary text-sm">Theme presentation and rules overview</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">11:00 AM</span>
                <div>
                  <div className="text-foreground font-medium">Hacking Begins!</div>
                  <div className="text-tertiary text-sm">Start building your projects</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">1:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Lunch Break</div>
                  <div className="text-tertiary text-sm">Food provided by SCE</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">3:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Workshop: AI/ML Basics</div>
                  <div className="text-tertiary text-sm">Optional workshop for beginners</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">5:30 PM</span>
                <div>
                  <div className="text-foreground font-medium">Project Submissions Due</div>
                  <div className="text-tertiary text-sm">Final deadline for submissions</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">6:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Presentations & Judging</div>
                  <div className="text-tertiary text-sm">Showcase your projects</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
              <div className="text-red-400 font-bold mb-2">⚠ Lorem Ipsum</div>
              <ul className="text-tertiary space-y-1">
                <li>• Lorem ipsum dolor sit amet</li>
                <li>• Consectetur adipiscing elit sed do</li>
                <li>• Eiusmod tempor incididunt ut labore</li>
                <li>• Dolore magna aliqua ut enim</li>
              </ul>
            </div>
          </>
        )
      },
      4: {
        title: "Lorem Ipsum Guidelines",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <div className="text-blue-400 font-bold mb-2">📋 Lorem Requirements</div>
              <p className="text-tertiary">Lorem ipsum dolor sit amet consectetur. Adipiscing elit sed do eiusmod tempor.</p>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Components</h3>
            
            <ul className="space-y-3 text-tertiary mb-6">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Lorem Ipsum:</strong> Dolor sit amet consectetur adipiscing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Dolor Sit:</strong> 2-3 lorem ipsum demonstration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Amet Consectetur:</strong> Lorem ipsum dolor explanation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Adipiscing Elit:</strong> Lorem ipsum team members</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Criteria</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-secondary rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Lorem (25%)</h4>
                <p className="text-tertiary text-sm">Ipsum dolor sit amet consectetur</p>
              </div>
              <div className="p-4 border border-secondary rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Ipsum (25%)</h4>
                <p className="text-tertiary text-sm">Dolor sit amet consectetur adipiscing</p>
              </div>
              <div className="p-4 border border-secondary rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Dolor (25%)</h4>
                <p className="text-tertiary text-sm">Sit amet consectetur adipiscing elit</p>
              </div>
              <div className="p-4 border border-secondary rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Amet (25%)</h4>
                <p className="text-tertiary text-sm">Consectetur adipiscing elit sed do</p>
              </div>
            </div>
          </>
        )
      },
      5: {
        title: "Lorem Ipsum Resources",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Ipsum Resources</h3>
            
            <div className="space-y-4 mb-6">
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Lorem Ipsum Documentation</div>
                <div className="text-sm text-tertiary">Dolor sit amet consectetur adipiscing</div>
              </a>
              
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Consectetur Adipiscing</div>
                <div className="text-sm text-tertiary">Elit sed do eiusmod tempor tutorials</div>
              </a>
              
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Incididunt Ut Labore</div>
                <div className="text-sm text-tertiary">Dolore magna aliqua models</div>
              </a>

              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Enim Ad Minim</div>
                <div className="text-sm text-tertiary">Veniam quis nostrud API</div>
              </a>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Tools</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-3 border border-secondary rounded-lg">
                <div className="text-accent font-medium">Lorem Ipsum</div>
                <div className="text-sm text-tertiary">Dolor sit amet consectetur</div>
              </div>
              <div className="p-3 border border-secondary rounded-lg">
                <div className="text-accent font-medium">Adipiscing Elit</div>
                <div className="text-sm text-tertiary">Sed do eiusmod tempor</div>
              </div>
              <div className="p-3 border border-secondary rounded-lg">
                <div className="text-accent font-medium">Incididunt Ut</div>
                <div className="text-sm text-tertiary">Labore et dolore magna</div>
              </div>
              <div className="p-3 border border-secondary rounded-lg">
                <div className="text-accent font-medium">Aliqua Enim</div>
                <div className="text-sm text-tertiary">Ad minim veniam quis</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">Lorem Help?</h3>
            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <p className="text-tertiary mb-3">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do!</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Lorem Support</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Ipsum Mentors</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Dolor Workshops</span>
              </div>
            </div>
          </>
        )
      }
    };
    
    return sections[section as keyof typeof sections] || sections[1];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-secondary p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
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
          </Link>
          <div className="ml-auto">
            <Link 
              href="/"
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              ← Back to All Hackathons
            </Link>
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
              FALL HACKATHON
            </h1>
            <div className="text-2xl md:text-3xl text-accent font-medium">
              September 13, 2025 at 10:00 AM PT
            </div>
            <div className="text-lg md:text-xl text-tertiary mt-2">
              Lorem Ipsum Theme
            </div>
            {countdownPhase === 'submission' && (
              <div className="text-lg md:text-xl text-red-400 mt-2 font-semibold">
                ⏰ PROJECT SUBMISSIONS DUE AT 5:30 PM
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

      {/* Information Section - Box layout */}
      <section className="bg-secondary/5 border-t border-secondary py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="bg-background border border-secondary rounded-lg p-6">
                <nav className="space-y-4">
                  <button 
                    onClick={() => setActiveSection(1)}
                    className={`w-full text-left text-lg font-bold pb-2 transition-colors ${
                      activeSection === 1 
                        ? 'text-foreground border-b border-secondary' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    1. LOREM
                  </button>
                  <button 
                    onClick={() => setActiveSection(2)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 2 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    2. IPSUM
                  </button>
                  <button 
                    onClick={() => setActiveSection(3)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 3 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    3. SCHEDULE
                  </button>
                  <button 
                    onClick={() => setActiveSection(4)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 4 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    4. DOLOR
                  </button>
                  <button 
                    onClick={() => setActiveSection(5)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 5 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    5. SIT
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-9">
              <div className="bg-background border border-secondary rounded-lg p-8">
                
                {/* Dynamic Content Based on Active Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {getSectionContent(activeSection).title}
                </h2>
                
                {getSectionContent(activeSection).content}
                
              </div>
            </div>
            
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
            <div className="text-tertiary text-sm">
              © 2025 SCE SJSU. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
