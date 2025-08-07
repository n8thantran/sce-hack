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
        title: "Lorem ipsum dolor sit amet consectetur?",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet <strong className="text-foreground">consectetur adipiscing elit</strong> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <strong className="text-accent">voluptate velit esse</strong> cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident.
            </p>
            
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-yellow-400 text-xl">⚠</div>
              <div>
                <span className="text-foreground font-medium">Lorem ipsum </span>
                <a href="#" className="text-accent underline hover:text-accent/80">dolor sit amet consectetur</a>
                <span className="text-foreground"> adipiscing elit</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Lorem ipsum dolor sit?</h3>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Sed do eiusmod tempor incididunt ut labore et dolore magna</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Ut enim ad minim veniam quis nostrud exercitation</span>
              </li>
            </ul>
          </>
        )
      },
      2: {
        title: "Set Up Instructions",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Configuration Steps</h3>
            
            <ol className="space-y-3 text-tertiary list-decimal list-inside">
              <li>At vero eos et accusamus et iusto odio dignissimos</li>
              <li>Ducimus qui blanditiis praesentium voluptatum deleniti</li>
              <li>Atque corrupti quos dolores et quas molestias excepturi</li>
              <li>Sint occaecati cupiditate non provident similique</li>
            </ol>
          </>
        )
      },
      3: {
        title: "Important Reminders",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mb-6">
              <div className="text-red-400 font-bold mb-2">⚠ Critical Reminder</div>
              <p className="text-tertiary">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
            </div>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Quis autem vel eum iure reprehenderit qui in ea voluptate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Velit esse quam nihil molestiae consequatur</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</span>
              </li>
            </ul>
          </>
        )
      },
      4: {
        title: "Submission Guidelines",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <div className="text-blue-400 font-bold mb-2">📋 Submission Checklist</div>
              <p className="text-tertiary">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.</p>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Required Components</h3>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Facere possimus, omnis voluptas assumenda est</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Omnis dolor repellendus temporibus autem quibusdam</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Et aut officiis debitis aut rerum necessitatibus saepe</span>
              </li>
            </ul>
          </>
        )
      },
      5: {
        title: "Resources & Links",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Helpful Links</h3>
            
            <div className="space-y-4 mb-6">
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Lorem ipsum documentation</div>
                <div className="text-sm text-tertiary">Comprehensive guide to getting started</div>
              </a>
              
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Dolor sit amet tutorials</div>
                <div className="text-sm text-tertiary">Step-by-step video tutorials</div>
              </a>
              
              <a href="#" className="block p-3 border border-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="text-accent font-medium">Consectetur adipiscing examples</div>
                <div className="text-sm text-tertiary">Sample projects and code snippets</div>
              </a>
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
                    1. INTRODUCTION
                  </button>
                  <button 
                    onClick={() => setActiveSection(2)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 2 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    2. SET UP
                  </button>
                  <button 
                    onClick={() => setActiveSection(3)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 3 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    3. REMINDERS
                  </button>
                  <button 
                    onClick={() => setActiveSection(4)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 4 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    4. SUBMISSION
                  </button>
                  <button 
                    onClick={() => setActiveSection(5)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 5 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    5. RESOURCES
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
          </div>
        </div>
      </footer>
    </div>
  );
}
