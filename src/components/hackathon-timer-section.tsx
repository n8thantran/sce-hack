"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Phase = "before" | "before-hacking" | "hacking" | "ended";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  hackathonDateIso: string;
  hackingStartIso: string;
  hackingEndIso: string;
  phaseTextBefore: string;
  phaseTextBeforeHacking: string;
  phaseTextHacking: string;
  phaseTextEnded: string;
  submissionDeadlineText?: string;
  initial?: {
    timeLeft: TimeLeft;
    phase: Phase;
    phaseText: string;
  };
  serverNowMs?: number;
}

export default function HackathonTimerSection({
  hackathonDateIso,
  hackingStartIso,
  hackingEndIso,
  phaseTextBefore,
  phaseTextBeforeHacking,
  phaseTextHacking,
  phaseTextEnded,
  submissionDeadlineText = "Projects must be submitted by 3:00 PM PT. Good luck!",
  initial,
  serverNowMs,
}: Props) {
  const hackathonDate = useMemo(
    () => new Date(hackathonDateIso),
    [hackathonDateIso]
  );
  const hackingStartTime = useMemo(
    () => new Date(hackingStartIso),
    [hackingStartIso]
  );
  const hackingEndTime = useMemo(
    () => new Date(hackingEndIso),
    [hackingEndIso]
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    initial?.timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );
  const [currentPhase, setCurrentPhase] = useState<Phase>(
    initial?.phase ?? "before"
  );
  const [phaseText, setPhaseText] = useState(initial?.phaseText ?? "");
  const offsetRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now() - offsetRef.current;
      let targetDate: Date | null = null;
      let nextPhase: Phase = "before";
      let text = "";

      if (now < hackathonDate.getTime()) {
        targetDate = hackathonDate;
        nextPhase = "before";
        text = phaseTextBefore;
      } else if (now < hackingStartTime.getTime()) {
        targetDate = hackingStartTime;
        nextPhase = "before-hacking";
        text = phaseTextBeforeHacking;
      } else if (now < hackingEndTime.getTime()) {
        targetDate = hackingEndTime;
        nextPhase = "hacking";
        text = phaseTextHacking;
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentPhase("ended");
        setPhaseText(phaseTextEnded);
        return;
      }

      setCurrentPhase(nextPhase);
      setPhaseText(text);

      if (targetDate) {
        const distance = targetDate.getTime() - now;
        if (distance <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    hackathonDate,
    hackingStartTime,
    hackingEndTime,
    phaseTextBefore,
    phaseTextBeforeHacking,
    phaseTextHacking,
    phaseTextEnded,
    serverNowMs,
  ]);

  const phaseColor = useMemo(() => {
    switch (currentPhase) {
      case "hacking":
        return "text-red-400 animate-pulse";
      case "ended":
        return "text-gray-400";
      case "before":
      case "before-hacking":
      default:
        return "text-blue-400";
    }
  }, [currentPhase]);

  const renderWithMintlifyAccent = (text: string) => {
    const parts = text.split("Mintlify");
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <span style={{ color: "#18e299" }}>Mintlify</span>
        {parts.slice(1).join("Mintlify")}
      </>
    );
  };

  return (
    <section className={`rounded-xl `}>
      {/* Phase Text */}
      <div className={`text-2xl md:text-3xl font-bold mb-8 ${phaseColor}`}>
        {renderWithMintlifyAccent(phaseText)}
      </div>

      {/* Countdown or Ended */}
      {currentPhase !== "ended" ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            <div className="bg-background/50 border border-secondary rounded-lg p-6">
              <div className={`text-4xl md:text-6xl font-bold ${phaseColor}`}>
                {timeLeft.days}
              </div>
              <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                Days
              </div>
            </div>
            <div className="bg-background/50 border border-secondary rounded-lg p-6">
              <div className={`text-4xl md:text-6xl font-bold ${phaseColor}`}>
                {timeLeft.hours}
              </div>
              <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                Hours
              </div>
            </div>
            <div className="bg-background/50 border border-secondary rounded-lg p-6">
              <div className={`text-4xl md:text-6xl font-bold ${phaseColor}`}>
                {timeLeft.minutes}
              </div>
              <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                Minutes
              </div>
            </div>
            <div className="bg-background/50 border border-secondary rounded-lg p-6">
              <div className={`text-4xl md:text-6xl font-bold ${phaseColor}`}>
                {timeLeft.seconds}
              </div>
              <div className="text-tertiary text-sm md:text-base font-medium uppercase tracking-wider">
                Seconds
              </div>
            </div>
          </div>

          {/* Phase-specific Messages */}
          {currentPhase === "hacking" && (
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 mb-8">
              <div className="text-red-400 font-bold text-xl mb-2">
                🔴 HACKING TIME IS LIVE!
              </div>
              <div className="text-tertiary">{submissionDeadlineText}</div>
            </div>
          )}

          {(currentPhase === "before" || currentPhase === "before-hacking") && (
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6 mb-8">
              <div className="text-blue-400 font-bold text-xl mb-2">
                📅 Get Ready!
              </div>
              <div className="text-tertiary">
                {currentPhase === "before"
                  ? "Don't forget to bring your laptop, charger, and development tools!"
                  : "Opening ceremony in progress. Hacking begins soon!"}
              </div>
            </div>
          )}
        </>
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
    </section>
  );
}
