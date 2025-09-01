import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import HackathonTimerSection from "@/components/hackathon-timer-section";

export const dynamic = "force-dynamic";

export default function Fall2025TimerPage() {
  const serverNow = Date.now();
  const hackathonDate = new Date("2025-09-05T09:00:00-07:00").getTime();
  const hackingStart = new Date("2025-09-05T10:00:00-07:00").getTime();
  const hackingEnd = new Date("2025-09-05T15:00:00-07:00").getTime();

  let phaseText = "";
  let phase: "before" | "before-hacking" | "hacking" | "ended" = "before";
  let target = hackathonDate;
  if (serverNow < hackathonDate) {
    phase = "before";
    phaseText = "Time until SCE Hacks 1.0 w/ Mintlify Begins";
    target = hackathonDate;
  } else if (serverNow < hackingStart) {
    phase = "before-hacking";
    phaseText = "Time until Hacking Time Begins";
    target = hackingStart;
  } else if (serverNow < hackingEnd) {
    phase = "hacking";
    phaseText = "Hacking Time Remaining";
    target = hackingEnd;
  } else {
    phase = "ended";
    phaseText = "SCE Hacks 1.0 w/ Mintlify Has Ended";
    target = serverNow;
  }

  const distance = Math.max(0, target - serverNow);
  const initial = {
    phase,
    phaseText,
    timeLeft: {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    },
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-900/20 to-purple-900/20 text-foreground`}
    >
      {/* Header */}
      <header className="border-b border-secondary py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/sce-logo.png"
              alt="SCE SJSU Logo"
              width={48}
              height={48}
              className="rounded"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                SCE Hackathons
              </h1>
              <p className="text-sm text-tertiary">
                Software & Computer Engineering Society
              </p>
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
          {/* Event Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            SCE HACKS 1.0
          </h1>
          <div className="text-2xl md:text-3xl text-accent font-medium mb-8">
            w/ <span style={{ color: "#18e299" }}>Mintlify</span>
          </div>

          {/* Event Details */}
          <div className="text-lg md:text-xl text-tertiary mb-12">
            <div>September 5, 2025</div>
            <div>9:00 AM - 4:45 PM PT</div>
            <div>MLK Library Room 225</div>
          </div>

          <HackathonTimerSection
            hackathonDateIso="2025-09-05T09:00:00-07:00"
            hackingStartIso="2025-09-05T10:00:00-07:00"
            hackingEndIso="2025-09-05T15:00:00-07:00"
            phaseTextBefore="Time until SCE Hacks 1.0 w/ Mintlify Begins"
            phaseTextBeforeHacking="Time until Hacking Time Begins"
            phaseTextHacking="Hacking Time Remaining"
            phaseTextEnded="SCE Hacks 1.0 w/ Mintlify Has Ended"
            initial={initial}
            serverNowMs={serverNow}
          />

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
                <div className="text-tertiary text-xs">
                  San José State University
                </div>
              </div>
            </div>
            <div className="text-tertiary text-sm">
              © 2025 SCE SJSU. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
