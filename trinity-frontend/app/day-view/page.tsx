"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button"

type CalendarEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
  textColor: string;
};

type PositionedEvent = CalendarEvent & {
  col: number;
  totalCols: number;
};

type AllDayEvent = {
  id: number;
  title: string;
  color: string;
  textColor: string;
};

type CalendarHeaderProps = {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

type AllDayBannerProps = {
  events: AllDayEvent[];
};

type EventBlockProps = {
  event: PositionedEvent;
};

type TimeGridProps = {
  events: CalendarEvent[];
  isToday: boolean;
};

const HOUR_HEIGHT = 60;
const START_HOUR = 0;
const END_HOUR = 24;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => i + START_HOUR
);

const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: "Dentist appt.",
    start: "08:00",
    end: "09:30",
    color: "#E8914A",
    textColor: "#7A3D10",
  },
  {
    id: 2,
    title: "Client calls",
    start: "11:00",
    end: "13:00",
    color: "#5B8A3C",
    textColor: "#2A4A17",
  },
  {
    id: 3,
    title: "Weekly Team Mtg.",
    start: "15:00",
    end: "16:30",
    color: "#7B5EA7",
    textColor: "#3D2060",
  },
  {
    id: 4,
    title: "Lunch w/ Sarah",
    start: "12:30",
    end: "13:30",
    color: "#3A86C8",
    textColor: "#0C3D6E",
  },
  {
    id: 5,
    title: "Code review",
    start: "14:00",
    end: "14:30",
    color: "#C25B7A",
    textColor: "#621030",
  },
  {
    id: 6,
    title: "Focus time",
    start: "09:30",
    end: "11:00",
    color: "#4AADAD",
    textColor: "#0D5050",
  },
];

const SAMPLE_ALL_DAY_EVENTS: AllDayEvent[] = [
  { id: 1, title: "Home Office", color: "#3DB8A8", textColor: "#0A5550" },
  { id: 2, title: "Mark OOO", color: "#A07DC8", textColor: "#3D1A6E" },
  { id: 3, title: "Sandy in Berlin", color: "#B87FBE", textColor: "#501060" },
];

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToY(minutes: number): number {
  return (
    ((minutes - START_HOUR * 60) / TOTAL_MINUTES) *
    (HOUR_HEIGHT * (END_HOUR - START_HOUR))
  );
}

function formatHour(hour: number): string {
  if (hour === 0) return "12am";
  if (hour < 12) return `${hour}am`;
  if (hour === 12) return "12pm";
  return `${hour - 12}pm`;
}

function formatEventTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 || 12;

  return minute === 0
    ? `${hour12}${ampm}`
    : `${hour12}:${String(minute).padStart(2, "0")}${ampm}`;
}

function formatHeaderDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getWeekNumber(date: Date): number {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const diffDays = (date.getTime() - jan1.getTime()) / 86400000;
  return Math.ceil((diffDays + jan1.getDay() + 1) / 7);
}

function resolveOverlaps(events: CalendarEvent[]): PositionedEvent[] {
  const sortedEvents = [...events].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  );

  const columnEndTimes: number[] = [];

  const positionedEvents: PositionedEvent[] = sortedEvents.map((event) => ({
    ...event,
    col: 0,
    totalCols: 1,
  }));

  positionedEvents.forEach((event) => {
    const eventEnd = timeToMinutes(event.end);
    let placed = false;

    for (let columnIndex = 0; columnIndex < columnEndTimes.length; columnIndex++) {
      if (timeToMinutes(event.start) >= columnEndTimes[columnIndex]) {
        event.col = columnIndex;
        columnEndTimes[columnIndex] = eventEnd;
        placed = true;
        break;
      }
    }

    if (!placed) {
      event.col = columnEndTimes.length;
      columnEndTimes.push(eventEnd);
    }
  });

  positionedEvents.forEach((event) => {
    const eventStart = timeToMinutes(event.start);
    const eventEnd = timeToMinutes(event.end);
    let maxColumn = event.col;

    positionedEvents.forEach((otherEvent) => {
      const otherStart = timeToMinutes(otherEvent.start);
      const otherEnd = timeToMinutes(otherEvent.end);

      if (otherStart < eventEnd && otherEnd > eventStart) {
        maxColumn = Math.max(maxColumn, otherEvent.col);
      }
    });

    event.totalCols = maxColumn + 1;
  });

  return positionedEvents;
}

function CalendarHeader({
  date,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="sticky top-0 z-20 flex flex-shrink-0 items-center justify-between border-b border-gray-100 bg-card px-4 py-2.5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={onPrev}>
            ‹
          </Button>
          <Button variant="outline" size="sm" onClick={onToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={onNext}>
            ›
          </Button>
        </div>

        <span className="text-[15px] font-medium text-gray-800">
          {formatHeaderDate(date)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md bg-background px-2 py-1 text-xs border text-gray-800">
          W{getWeekNumber(date)}
        </span>
        <span className="text-sm  text-gray-800">{formatFullDate(date)}</span>
      </div>
    </div>
  );
}

function AllDayBanner({ events }: AllDayBannerProps) {
  if (events.length === 0) return null;

  return (
    <div className="flex-shrink-0 border-b border-gray-100 bg-white">
      <div className="flex">
        <div className="flex w-[52px] flex-shrink-0 items-center justify-end border-r border-gray-100 pr-2 py-1">
          <span className="text-[10px] text-gray-400">all-day</span>
        </div>

        <div className="flex flex-1 flex-col gap-0.5 px-2 py-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="truncate rounded px-2 py-0.5 text-xs font-medium"
              style={{
                background: event.color,
                color: event.textColor,
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventBlock({ event }: EventBlockProps) {
  const startMinutes = timeToMinutes(event.start);
  const endMinutes = timeToMinutes(event.end);
  const top = minutesToY(startMinutes);
  const height = Math.max(minutesToY(endMinutes) - top, 20);
  const widthFraction = 1 / event.totalCols;

  return (
    <div
      className="absolute z-[5] cursor-pointer overflow-hidden rounded-md transition-all duration-150 hover:z-10 hover:scale-[1.01] hover:brightness-90"
      style={{
        top: top + 2,
        height: height - 4,
        left: `calc(${event.col * widthFraction * 100}% + 2px)`,
        width: `calc(${widthFraction * 100}% - 4px)`,
        background: event.color,
      }}
    >
      <div className="px-1.5 pt-1">
        <p
          className="truncate text-[12px] font-medium leading-tight"
          style={{ color: event.textColor }}
        >
          {event.title}
        </p>

        {height > 32 && (
          <p
            className="mt-0.5 truncate text-[11px] opacity-80"
            style={{ color: event.textColor }}
          >
            {formatEventTime(event.start)} – {formatEventTime(event.end)}
          </p>
        )}
      </div>
    </div>
  );
}

function CurrentTimeLine() {
  const [minutes, setMinutes] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const now = new Date();
      setMinutes(now.getHours() * 60 + now.getMinutes());
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  const top = minutesToY(minutes);

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 z-[15]"
      style={{ top }}
    >
      <div className="absolute left-[-4px] top-[-4px] h-[9px] rounded-full bg-red-500" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-red-500" />
    </div>
  );
}

function TimeGrid({ events, isToday }: TimeGridProps) {
  const gridHeight = HOUR_HEIGHT * (END_HOUR - START_HOUR);
  const positionedEvents = useMemo(() => resolveOverlaps(events), [events]);

  return (
    <div className="flex" style={{ height: gridHeight, position: "relative" }}>
      <div className="relative w-[52px] flex-shrink-0 border-r border-gray-100">
        {HOURS.filter((hour) => hour > START_HOUR && hour < END_HOUR).map((hour) => (
          <span
            key={hour}
            className="absolute right-2 -translate-y-1/2 whitespace-nowrap text-[11px] text-gray-400"
            style={{ top: minutesToY(hour * 60) }}
          >
            {formatHour(hour)}
          </span>
        ))}
      </div>

      <div className="relative flex-1">
        {HOURS.map((hour) => (
          <div key={hour}>
            <div
              className="absolute left-0 right-0 border-t border-gray-100"
              style={{ top: minutesToY(hour * 60) }}
            />
            {hour < END_HOUR && (
              <div
                className="absolute left-0 right-0 border-t border-dashed border-gray-100 opacity-60"
                style={{ top: minutesToY(hour * 60 + 30) }}
              />
            )}
          </div>
        ))}

        {positionedEvents.map((event) => (
          <EventBlock key={event.id} event={event} />
        ))}

        {isToday && <CurrentTimeLine />}
      </div>
    </div>
  );
}

export default function Page() {
  const [date, setDate] = useState<Date>(new Date(2023, 9, 2));
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const today = new Date();

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = minutesToY(7 * 60) - 20;
    }
  }, []);

  function shiftDate(days: number) {
    setDate((currentDate) => {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + days
      );
    });
  }

    return (
    <div className="flex items-start justify-center px-6 py-8">
      <div className="w-full max-w-6xl">
        <div className="flex max-h-[800px] flex-col overflow-hidden rounded-2xl border border-[#d8cbb8] bg-card shadow-sm">
          <CalendarHeader
            date={date}
            onPrev={() => shiftDate(-1)}
            onNext={() => shiftDate(1)}
            onToday={() => setDate(new Date())}
          />
          {/* <AllDayBanner events={SAMPLE_ALL_DAY_EVENTS} /> */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-hidden overflow-y-auto"
          >
            <TimeGrid events={SAMPLE_EVENTS} isToday={isToday} />
          </div>
        </div>
      </div>
    </div>
  );
}