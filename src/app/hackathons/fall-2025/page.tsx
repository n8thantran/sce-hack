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
              Join us for <strong className="text-foreground">SCE Hacks 1.0 w/ <span style={{ color: '#18e299' }}>Mintlify</span></strong> - a day of innovation, creativity, and collaborative coding! Whether you&apos;re a seasoned developer or just starting your programming journey, this event is designed to challenge your skills and expand your network.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-blue-400 text-xl">🏆</div>
              <div>
                <span className="text-foreground font-medium">Prizes: </span>
                <span className="text-foreground">$2,000 total prize pool across 4 categories!</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">What to Expect</h3>
            
            <ul className="space-y-3 text-tertiary">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>5 hours of focused coding and development time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Fireside chat with industry professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Optional Hackathon 101 workshop for beginners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Networking opportunities with fellow developers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Breakfast and refreshments provided</span>
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
              Here&apos;s the detailed schedule for Friday, September 5, 2025. The event runs from 9:00 AM to 4:45 PM with check-in, fireside chat, hacking time, judging, and closing ceremony.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Event Schedule - Friday, September 5, 2025</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">9:00 – 9:20 AM</span>
                <div>
                  <div className="text-foreground font-medium">Hacker check-in & breakfast</div>
                  <div className="text-tertiary text-sm">Croissants, seating - check-in closes promptly at 9:30 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">9:20 – 9:30 AM</span>
                <div>
                  <div className="text-foreground font-medium">Opening Ceremony</div>
                  <div className="text-tertiary text-sm">President Introduction, SCE GLAZE, Mizan + Ryan yap</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">9:30 – 10:00 AM</span>
                <div>
                  <div className="text-foreground font-medium">Fireside Chat</div>
                  <div className="text-tertiary text-sm">Hosted by Ryan + Hanhbee</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">10:00 AM</span>
                <div>
                  <div className="text-foreground font-medium">Hacking officially begins</div>
                  <div className="text-tertiary text-sm">Ryan + Mizan Announce</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">10:00 – 10:30 AM</span>
                <div>
                  <div className="text-foreground font-medium">Optional Workshop</div>
                  <div className="text-tertiary text-sm">TBD</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">3:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Hacking ends; judging begins</div>
                  <div className="text-tertiary text-sm">Final deadline for project submissions</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">4:00 PM</span>
                <div>
                  <div className="text-foreground font-medium">Judging concludes</div>
                  <div className="text-tertiary text-sm">All project evaluations completed</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg">
                <span className="text-accent font-bold">4:00 – 4:45 PM</span>
                <div>
                  <div className="text-foreground font-medium">Closing Ceremony</div>
                  <div className="text-tertiary text-sm">Winners announcement and wrap-up</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Optional Workshops</h3>
            
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
              <div className="text-blue-400 font-bold mb-2">📚 Optional Workshop Available</div>
              <p className="text-tertiary">One optional workshop will be available during the event from 10:00 - 10:30 AM. You can attend or skip it - it&apos;s completely up to you and your team&apos;s needs!</p>
            </div>
            
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
              <div className="text-red-400 font-bold mb-2">⚠ Important Reminders</div>
              <ul className="text-tertiary space-y-1">
                <li>• Bring your laptop, charger, and any development tools you need</li>
                <li>• Team formation happens during check-in (2-4 people per team)</li>
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
      },
      4: {
        title: "Tips & Prizes",
        content: (
          <>
            <p className="text-lg text-tertiary mb-6 leading-relaxed">
              Get ready to compete for amazing prizes! Here are the prize tracks and some helpful tips to maximize your chances of success.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Prize Tracks</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 border border-yellow-600 rounded-lg">
                <div>
                  <div className="text-foreground font-bold text-lg">🏆 Best Overall</div>
                  <div className="text-tertiary text-sm">Most impressive project across all criteria</div>
                </div>
                <div className="text-yellow-400 font-bold text-2xl">$800</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-600 rounded-lg">
                <div>
                  <div className="text-foreground font-bold text-lg">🚀 Most Likely to be a Startup</div>
                  <div className="text-tertiary text-sm">Project with the highest commercial potential</div>
                </div>
                <div className="text-green-400 font-bold text-2xl">$500</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-600 rounded-lg">
                <div>
                  <div className="text-foreground font-bold text-lg">🎨 Best UI/UX</div>
                  <div className="text-tertiary text-sm">Most intuitive and visually appealing design</div>
                </div>
                <div className="text-blue-400 font-bold text-2xl">$500</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-600 rounded-lg">
                <div>
                  <div className="text-foreground font-bold text-lg">😄 Most Useless</div>
                  <div className="text-tertiary text-sm">Hilariously impractical but well-executed project</div>
                </div>
                <div className="text-purple-400 font-bold text-2xl">$200</div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-4">Hackathon Tips</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
                <div className="text-blue-400 font-bold mb-2">💡 Project Planning</div>
                <ul className="text-tertiary space-y-1 text-sm">
                  <li>• Start simple and iterate</li>
                  <li>• Focus on core functionality first</li>
                  <li>• Plan your MVP within 3-4 hours</li>
                  <li>• Save time for testing and presentation prep</li>
                </ul>
              </div>
              
              <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                <div className="text-green-400 font-bold mb-2">👥 Team Strategy</div>
                <ul className="text-tertiary space-y-1 text-sm">
                  <li>• Divide tasks based on strengths</li>
                  <li>• Communicate frequently</li>
                  <li>• Use version control (Git)</li>
                  <li>• Set regular check-in times</li>
                </ul>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
                <div className="text-yellow-400 font-bold mb-2">🏆 Winning Tips</div>
                <ul className="text-tertiary space-y-1 text-sm">
                  <li>• Tell a compelling story</li>
                  <li>• Demo, don&apos;t just show code</li>
                  <li>• Highlight unique features</li>
                  <li>• Practice your presentation</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
                <div className="text-purple-400 font-bold mb-2">⚡ Technical Tips</div>
                <ul className="text-tertiary space-y-1 text-sm">
                  <li>• Use familiar technologies</li>
                  <li>• Leverage APIs and libraries</li>
                  <li>• Focus on functionality over perfection</li>
                  <li>• Have backup plans ready</li>
                </ul>
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
              SCE HACKS 1.0
            </h1>
            <div className="text-2xl md:text-3xl text-accent font-medium">
              w/ <span style={{ color: '#18e299' }}>Mintlify</span>
            </div>
            <div className="text-xl md:text-2xl text-tertiary mt-4">
              September 5, 2025 • 9:00 AM - 4:45 PM PT
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
                9:00 AM - 4:45 PM Pacific Time
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
                    className={`w-full text-left text-lg font-bold pb-2 transition-colors cursor-pointer ${
                      activeSection === 1 
                        ? 'text-foreground border-b border-secondary' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    1. INTRODUCTION
                  </button>
                  <button 
                    onClick={() => setActiveSection(2)}
                    className={`w-full text-left text-lg font-bold transition-colors cursor-pointer ${
                      activeSection === 2 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    2. SCHEDULE
                  </button>
                  <button 
                    onClick={() => setActiveSection(3)}
                    className={`w-full text-left text-lg font-bold transition-colors cursor-pointer ${
                      activeSection === 3 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    3. SUBMISSION
                  </button>
                  <button 
                    onClick={() => setActiveSection(4)}
                    className={`w-full text-left text-lg font-bold transition-colors cursor-pointer ${
                      activeSection === 4 
                        ? 'text-foreground border-b border-secondary pb-2' 
                        : 'text-tertiary hover:text-foreground'
                    }`}
                  >
                    4. TIPS & PRIZES
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
