"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Fall2025Hackathon() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownPhase, setCountdownPhase] = useState('start'); // 'start' or 'submission'
  const [activeSection, setActiveSection] = useState(1); // Track which section is active

  useEffect(() => {
    const startDate = new Date("2025-09-05T09:15:00-07:00"); // September 5, 2025 at 9:15 AM PT
    const submissionDate = new Date("2025-09-05T15:00:00-07:00"); // September 5, 2025 at 3:00 PM PT
    
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
        title: "Introduction",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Join us for the <strong className="text-foreground">Fall 2025 Hackathon</strong> - a day of innovation, creativity, and collaborative coding! Whether you&apos;re a seasoned developer or just starting your programming journey, this event is designed to challenge your skills and expand your network.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-blue-400 text-xl">🏆</div>
              <div>
                <span className="text-foreground font-medium">Prizes: </span>
                <span className="text-foreground">TBD - Exciting prizes to be announced soon!</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">What to Expect</h3>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>6 hours of focused coding and development time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Guest speaker presentation and industry insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Two optional 30-minute technical workshops you can attend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Networking opportunities with fellow developers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Free food and refreshments throughout the day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Exciting prizes and recognition for outstanding projects</span>
              </li>
            </ul>
          </>
        )
      },
      2: {
        title: "Schedule & Important Info",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Here&pos;s the detailed schedule for Friday, September 5, 2025. The event runs from 9:15 AM to 4:30 PM with workshops, guest speaker, hacking time, and extended judging period.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Event Schedule - Friday, September 5, 2025</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">9:15 AM</span>
                <div>
                  <div className="text-foreground font-medium">Check-in & Welcome</div>
                  <div className="text-tertiary text-sm">Registration, team formation, and light refreshments</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">9:45 AM</span>
                <div>
                  <div className="text-foreground font-medium">Opening Ceremony & Guest Speaker (TBD)</div>
                  <div className="text-tertiary text-sm">Theme presentation, rules overview, and keynote presentation</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">10:15 AM</span>
                <div>
                  <div className="text-foreground font-medium">Hacking Begins!</div>
                  <div className="text-tertiary text-sm">Start building your projects</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">12:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Lunch Break</div>
                  <div className="text-tertiary text-sm">Food provided by SCE</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">3:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Project Submissions Due</div>
                  <div className="text-tertiary text-sm">Final deadline for project submissions</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">3:15 PM</span>
                <div>
                  <div className="text-foreground font-medium">Project Presentations & Judging</div>
                  <div className="text-tertiary text-sm">Teams present their projects (1 hour 15 minute judging period)</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">4:30 PM</span>
                <div>
                  <div className="text-foreground font-medium">Award Ceremony & Closing</div>
                  <div className="text-tertiary text-sm">Winners announcement and wrap-up</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Optional Workshops</h3>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <div className="text-blue-400 font-bold mb-2">📚 Workshops Available</div>
              <p className="text-tertiary">Two optional 30-minute workshops will be available during the event. You can attend either, both, or neither - it&apos;s completely up to you and your team&apos;s needs!</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-3 bg-green-900/20 border border-green-600 rounded-lg">
                <span className="text-green-400 font-bold">Workshop 1</span>
                <div>
                  <div className="text-foreground font-medium">Topic TBD - 30 minutes</div>
                  <div className="text-tertiary text-sm">Optional technical workshop - details coming soon</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-green-900/20 border border-green-600 rounded-lg">
                <span className="text-green-400 font-bold">Workshop 2</span>
                <div>
                  <div className="text-foreground font-medium">Topic TBD - 30 minutes</div>
                  <div className="text-tertiary text-sm">Optional technical workshop - details coming soon</div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-6">
              <div className="text-yellow-400 font-bold mb-2">💡 Workshop Tips</div>
              <ul className="text-tertiary space-y-1">
                <li>• Workshops are completely optional - focus on your project if you prefer</li>
                <li>• Each workshop is 30 minutes long with practical content</li>
                <li>• You can attend one, both, or skip them entirely</li>
                <li>• Workshop times and topics will be announced closer to the event</li>
              </ul>
            </div>
            
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
              <div className="text-red-400 font-bold mb-2">⚠ Important Reminders</div>
              <ul className="text-tertiary space-y-1">
                <li>• Bring your laptop, charger, and any development tools you need</li>
                <li>• Team formation happens during check-in (1-4 people per team)</li>
                <li>• Submissions must be made through the official platform by 3:00 PM</li>
                <li>• All projects must be built within the hackathon timeframe</li>
              </ul>
            </div>
          </>
        )
      },
      3: {
        title: "Submission Guidelines",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Follow these guidelines to ensure your project is properly submitted and eligible for judging. All submissions must be completed by 3:00 PM on September 5, 2025.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <div className="text-blue-400 font-bold mb-2">📋 Submission Requirements</div>
              <p className="text-tertiary">All projects must include working code, documentation, and a demo video or live presentation.</p>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Required Components</h3>
            
            <ul className="space-y-3 text-tertiary mb-6">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Source Code:</strong> Complete project repository with clean, documented code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">📹</span>
                <span><strong className="text-foreground">Demo Video (Optional):</strong> 2-3 minute demonstration of your project&pos;s functionality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">README:</strong> Clear project description, setup instructions, and usage guide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span><strong className="text-foreground">Team Info:</strong> List of all team members and their contributions</span>
              </li>
            </ul>

            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <div className="text-accent font-bold mb-2">📝 Submission Platform</div>
              <p className="text-tertiary mb-4">Submit your project through our official hackathon platform. Link will be provided during the event.</p>
              <div className="text-sm text-tertiary">
                <strong>Deadline:</strong> September 5, 2025 at 3:00 PM PT
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
          <div className="ml-auto flex items-center gap-4">
            <Link 
              href="/hackathons/fall-2025/timer"
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              ⏰ Live Timer
            </Link>
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
              September 5, 2025 • 9:15 AM - 4:30 PM PT
            </div>
            <div className="text-lg md:text-xl text-tertiary mt-2">
              MLK Library Room 225
            </div>
            {countdownPhase === 'submission' && (
              <div className="text-lg md:text-xl text-red-400 mt-2 font-semibold">
                ⏰ PROJECT SUBMISSIONS DUE 3:00 PM PT
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="mb-20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-widest mb-4">
                SEPTEMBER 5, 2025
              </div>
              <div className="text-lg text-tertiary mb-4">
                9:15 AM - 4:30 PM Pacific Time
              </div>
            </div>
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
                    2. SCHEDULE
                  </button>
                  <button 
                    onClick={() => setActiveSection(3)}
                    className={`w-full text-left text-lg font-bold transition-colors ${
                      activeSection === 3 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    3. SUBMISSION
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
