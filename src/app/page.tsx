import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Hackathon type definition
type Hackathon = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  status: "upcoming" | "current" | "completed";
  url?: string;
  timerUrl?: string;
};

// Sample hackathon data - replace with actual data from your backend
const hackathons = {
  upcoming: [
    {
      id: 1,
      name: "SCE Hacks 1.0 w/ Mintlify",
      date: "September 5, 2025",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      duration: "6 hours",
      location: "MLK Library Room 225",
      status: "upcoming",
      url: "/hackathons/fall-2025",
      timerUrl: "/hackathons/fall-2025/timer"
    }
  ] as Hackathon[],
  current: [
    // Currently no active hackathons
  ] as Hackathon[],
  previous: [
    // No previous hackathons to show yet
  ] as Hackathon[]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-secondary py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Current Hackathons */}
        {hackathons.current.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              🔴 Live Now
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons.current.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Hackathons */}
        {hackathons.upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Upcoming Hackathons
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons.upcoming.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}

        {/* Previous Hackathons */}
        {hackathons.previous.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Previous Hackathons
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons.previous.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </section>
        )}

        {/* Show message if no hackathons */}
        {hackathons.upcoming.length === 0 && hackathons.current.length === 0 && hackathons.previous.length === 0 && (
          <section className="text-center py-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No hackathons scheduled at this time
            </h2>
            <p className="text-tertiary">
              Check back later for upcoming events!
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary py-8 bg-secondary/5 mt-16">
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
    </div>
  );
}

// Hackathon Card Component
function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline" className="text-blue-400 border-blue-400">Upcoming</Badge>;
      case "current":
        return <Badge variant="destructive" className="animate-pulse">Live Now</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="cursor-default">
      <Card className="bg-background border-secondary hover:border-accent transition-colors h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-foreground text-lg">
              {hackathon.name.includes('Mintlify') ? (
                <>
                  {hackathon.name.split('Mintlify')[0]}
                  <span style={{ color: '#18e299' }}>Mintlify</span>
                  {hackathon.name.split('Mintlify')[1]}
                </>
              ) : (
                hackathon.name
              )}
            </CardTitle>
            {getStatusBadge(hackathon.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="text-accent">📅</span>
            <span>{hackathon.date}</span>
          </div>
          <div className="flex items-center gap-2 text-tertiary">
            <span className="text-accent">⏰</span>
            <span>{hackathon.startTime} - {hackathon.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-tertiary">
            <span className="text-accent">⏱️</span>
            <span>{hackathon.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-tertiary">
            <span className="text-accent">📍</span>
            <span>{hackathon.location}</span>
          </div>

          {/* Action Links */}
          <div className="pt-4 space-y-2">
            {hackathon.url && (
              <Link
                href={hackathon.url}
                className="block text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                View Details →
              </Link>
            )}
            {hackathon.timerUrl && (
              <Link
                href={hackathon.timerUrl}
                className="block text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                ⏰ Live Timer →
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
