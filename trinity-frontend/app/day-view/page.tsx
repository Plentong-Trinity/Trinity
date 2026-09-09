"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

type RoomEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  group: 1 | 2 | 3 | 4;
};

type RoomSchedule = {
  id: string;
  name: string;
  events: RoomEvent[];
};

type PositionedEvent = RoomEvent & {
  col: number;
  totalCols: number;
};

type SchedulePayload = {
  date?: string; // "YYYY-MM-DD"
  rooms: RoomSchedule[];
};

type CalendarHeaderProps = {
  date: Date;
};

type RoomColumnProps = {
  room: RoomSchedule;
  isToday: boolean;
  onEmptySpaceClick?: (time: string) => void;
  schedule?: SchedulePayload;
};

type EventBlockProps = {
  event: PositionedEvent;
};

const HOUR_HEIGHT = 64;
const START_HOUR = 8;
const END_HOUR = 23;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => i + START_HOUR
);

const GROUP_COLORS: Record<1 | 2 | 3 | 4, { bg: string; text: string }> = {
  1: { bg: "#D38845", text: "#edf6f6" },
  2: { bg: "#4FAFB1", text: "#edf6f6" },
  3: { bg: "#438BCD", text: "#edf6f6" },
  4: { bg: "#8469B5", text: "#edf6f6" },
};

function getGroupColors(group: 1 | 2 | 3 | 4) {
  return GROUP_COLORS[group] ?? { bg: "#CBD5E1", text: "#1F2937" };
}

const FALLBACK_SCHEDULE: SchedulePayload = {
  date: "2026-04-21",
  rooms: [
    {
      id: "room-101",
      name: "Room 101",
      events: [
        { id: 1, title: "Dentist appt.", start: "09:00", end: "10:00", group: 1 },
        { id: 2, title: "Focus time", start: "10:00", end: "11:00", group: 2 },
        { id: 3, title: "Client calls", start: "11:00", end: "12:30", group: 3 },
        { id: 4, title: "Weekly Team Mtg.", start: "16:00", end: "17:00", group: 4 },
      ],
    },
    {
      id: "room-102",
      name: "Room 102",
      events: [
        { id: 7, title: "Project Planning", start: "11:00", end: "12:30", group: 1 },
        { id: 8, title: "Stakeholder Update", start: "13:00", end: "14:00", group: 2 },
        { id: 9, title: "Blocker Sync", start: "14:00", end: "15:00", group: 4 },
        { id: 10, title: "Design Review", start: "15:00", end: "16:30", group: 3 },
      ],
    },
    {
      id: "room-a",
      name: "Conference Room A",
      events: [
        { id: 11, title: "Marketing Standup", start: "09:00", end: "10:00", group: 2 },
        { id: 12, title: "Campaign Review", start: "10:00", end: "11:00", group: 2 },
        { id: 13, title: "Budget Review", start: "11:00", end: "12:00", group: 3 },
        { id: 14, title: "Sales Training", start: "13:00", end: "14:30", group: 4 },
        { id: 15, title: "Client Presentation", start: "15:00", end: "16:00", group: 2 },
        { id: 16, title: "Q&A Session", start: "16:00", end: "17:00", group: 1 },
      ],
    },
    {
      id: "room-b",
      name: "Conference Room B",
      events: [
        { id: 11, title: "Marketing Standup", start: "09:00", end: "10:00", group: 4 },
        { id: 12, title: "Campaign Review", start: "10:00", end: "11:00", group: 3 },
        { id: 13, title: "Budget Review", start: "11:00", end: "12:00", group: 2 },
        { id: 14, title: "Sales Training", start: "13:00", end: "14:30", group: 1 },
        { id: 15, title: "Client Presentation", start: "15:00", end: "16:00", group: 4 },
        { id: 16, title: "Q&A Session", start: "16:00", end: "17:00", group: 3 },
      ],
    },
  ],
};

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function minutesToY(minutes: number): number {
  return (
    ((minutes - START_HOUR * 60) / TOTAL_MINUTES) *
    (HOUR_HEIGHT * (END_HOUR - START_HOUR))
  );
}

function isTimeAvailableInAllRooms(
  startMinutes: number,
  endMinutes: number,
  schedule: SchedulePayload
): boolean {
  if (startMinutes >= endMinutes) return false;

  return schedule.rooms.every((room) => {
    return room.events.every((event) => {
      const eventStart = timeToMinutes(event.start);
      const eventEnd = timeToMinutes(event.end);
      return eventEnd <= startMinutes || eventStart >= endMinutes;
    });
  });
}

/**
 * Sweeps through business hours in 30-minute intervals and identifies gaps
 * where ALL rooms are concurrently open.
 */
function getAvailableTimeSlots(schedule: SchedulePayload): Array<{ start: number; end: number }> {
  const slots: Array<{ start: number; end: number }> = [];
  const startLimit = START_HOUR * 60;
  const endLimit = END_HOUR * 60;

  let currentStart: number | null = null;

  for (let min = startLimit; min <= endLimit; min += 30) {
    if (min < endLimit && isTimeAvailableInAllRooms(min, min + 30, schedule)) {
      if (currentStart === null) {
        currentStart = min;
      }
    } else {
      if (currentStart !== null) {
        slots.push({ start: currentStart, end: min });
        currentStart = null;
      }
    }
  }

  return slots;
}

function getUnavailablePeriods(schedule: SchedulePayload): Array<{ start: number; end: number }> {
  const unavailable: Array<{ start: number; end: number }> = [];
  const eventTimes = new Set<number>();
  eventTimes.add(START_HOUR * 60);
  eventTimes.add(END_HOUR * 60);

  schedule.rooms.forEach((room) => {
    room.events.forEach((event) => {
      eventTimes.add(timeToMinutes(event.start));
      eventTimes.add(timeToMinutes(event.end));
    });
  });

  const sortedTimes = Array.from(eventTimes).sort((a, b) => a - b);

  for (let i = 0; i < sortedTimes.length - 1; i++) {
    const start = sortedTimes[i];
    const end = sortedTimes[i + 1];

    if (!isTimeAvailableInAllRooms(start, end, schedule)) {
      unavailable.push({ start, end });
    }
  }

  return unavailable;
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
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getWeekNumber(date: Date): number {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const diffDays = (date.getTime() - jan1.getTime()) / 86400000;
  return Math.ceil((diffDays + jan1.getDay() + 1) / 7);
}

function resolveOverlaps(events: RoomEvent[]): PositionedEvent[] {
  const sortedEvents = [...events].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
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

function CalendarHeader({ date }: CalendarHeaderProps) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e4d9c9] bg-[#f8f3eb] px-6 py-4">
      <span className="text-[15px] font-medium uppercase tracking-wide text-[#4b4b4b]">
        {formatHeaderDate(date)}
      </span>
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-[#d8cbb8] bg-[#f8f3eb] px-2 py-1 text-xs text-[#5f5f5f]">
          W{getWeekNumber(date)}
        </span>
        <span className="text-sm text-[#4b4b4b]">{formatFullDate(date)}</span>
      </div>
    </div>
  );
}

function EventBlock({ event }: EventBlockProps) {
  const startMinutes = timeToMinutes(event.start);
  const endMinutes = timeToMinutes(event.end);
  const top = minutesToY(startMinutes);
  const height = Math.max(minutesToY(endMinutes) - top, 24);
  const widthFraction = 1 / event.totalCols;

  const { bg, text } = getGroupColors(event.group);

  return (
    <div
      className="absolute z-[5] overflow-hidden rounded-md px-3 py-2 shadow-sm"
      style={{
        top: top + 2,
        height: height - 4,
        left: `calc(${event.col * widthFraction * 100}% + 6px)`,
        width: `calc(${widthFraction * 100}% - 12px)`,
        background: bg,
      }}
    >
      <p className="truncate text-[13px] font-medium leading-tight" style={{ color: text }}>
        {event.title}
      </p>
      {height > 38 && (
        <p className="mt-1 text-[12px] opacity-85" style={{ color: text }}>
          {formatEventTime(event.start)} – {formatEventTime(event.end)}
        </p>
      )}
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

  if (minutes < START_HOUR * 60 || minutes > END_HOUR * 60) return null;
  const top = minutesToY(minutes);

  return (
    <div className="pointer-events-none absolute left-0 right-0 z-[15]" style={{ top }}>
      <div className="absolute left-[-4px] top-[-4px] h-[8px] w-[8px] rounded-full bg-red-500" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-red-500" />
    </div>
  );
}

function RoomColumn({ room, isToday, onEmptySpaceClick, schedule }: RoomColumnProps) {
  const gridHeight = HOUR_HEIGHT * (END_HOUR - START_HOUR);
  const positionedEvents = useMemo(() => resolveOverlaps(room.events), [room.events]);
  const unavailablePeriods = useMemo(() => (schedule ? getUnavailablePeriods(schedule) : []), [schedule]);
  
  const [hoveredMinutes, setHoveredMinutes] = useState<number | null>(null);

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onEmptySpaceClick || !schedule) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const minutes = START_HOUR * 60 + (clickY / gridHeight) * TOTAL_MINUTES;
    const roundedMinutes = Math.round(minutes / 30) * 30;
    
    if (roundedMinutes >= START_HOUR * 60 && roundedMinutes <= END_HOUR * 60) {
      onEmptySpaceClick(minutesToTime(roundedMinutes));
    }
  };

  return (
    <div className="relative min-w-[320px] flex-1 border-r border-[#e4d9c9] last:border-r-0">
      <div className="sticky top-0 z-10 border-b border-[#e4d9c9] bg-[#f8f3eb] px-4 py-3 text-center text-[15px] font-medium text-[#4b4b4b]">
        {room.name}
      </div>

      <div 
        className="relative cursor-pointer" 
        style={{ height: gridHeight }} 
        onClick={handleGridClick}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const minutes = START_HOUR * 60 + ((e.clientY - rect.top) / gridHeight) * TOTAL_MINUTES;
          setHoveredMinutes(Math.round(minutes / 30) * 30);
        }}
        onMouseLeave={() => setHoveredMinutes(null)}
      >
        {HOURS.map((hour) => (
          <div key={hour} className="absolute left-0 right-0 border-t border-[#e8dfd1]" style={{ top: minutesToY(hour * 60) }} />
        ))}

        {unavailablePeriods.map((period, idx) => (
          <div
            key={`unavailable-${idx}`}
            className="absolute left-0 right-0 bg-gray-400 opacity-40"
            style={{ top: minutesToY(period.start), height: Math.max(minutesToY(period.end) - minutesToY(period.start), 0), pointerEvents: 'none', zIndex: 2 }}
          />
        ))}

        {hoveredMinutes !== null && (
          <div
            className="absolute left-0 right-0 bg-gray-300 opacity-50"
            style={{ top: minutesToY(hoveredMinutes), height: HOUR_HEIGHT * 0.5, pointerEvents: 'none', zIndex: 3 }}
          />
        )}

        {positionedEvents.map((event) => (
          <EventBlock key={event.id} event={event} />
        ))}

        {isToday && <CurrentTimeLine />}
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [schedule, setSchedule] = useState<SchedulePayload>(FALLBACK_SCHEDULE);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [timeError, setTimeError] = useState<string | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem("calendarSchedule");
    if (!raw) return;
    try {
      const parsed: SchedulePayload = JSON.parse(raw);
      if (parsed?.rooms?.length) setSchedule(parsed);
    } catch (error) {
      console.error("Failed to parse calendarSchedule:", error);
    }
  }, []);

  // Calculate completely isolated unblocked gaps across all rooms
  const freeBlocks = useMemo(() => getAvailableTimeSlots(schedule), [schedule]);

  // Generate dynamic start options strictly from unblocked timelines
  const selectableStartOptions = useMemo(() => {
    const options: string[] = [];
    freeBlocks.forEach((block) => {
      for (let min = block.start; min < block.end; min += 30) {
        options.push(minutesToTime(min));
      }
    });
    return options;
  }, [freeBlocks]);

  // Dynamically compute valid sequential end choices for the active start item
  const selectableEndOptions = useMemo(() => {
    if (!selectedStartTime) return [];
    const startMin = timeToMinutes(selectedStartTime);
    
    // Find the boundary event or wrap limitation block hosting this event
    const activeBlock = freeBlocks.find((b) => startMin >= b.start && startMin < b.end);
    if (!activeBlock) return [];

    const options: string[] = [];
    // Populate selections exclusively up to the absolute edge of this gap
    for (let min = startMin + 30; min <= activeBlock.end; min += 30) {
      options.push(minutesToTime(min));
    }
    return options;
  }, [selectedStartTime, freeBlocks]);

  // Handle setting intelligent default values when dialog pops up
  useEffect(() => {
    if (isTimeDialogOpen) {
      if (selectableStartOptions.length > 0 && (!selectedStartTime || !selectableStartOptions.includes(selectedStartTime))) {
        const fallbackStart = selectableStartOptions[0];
        setSelectedStartTime(fallbackStart);
        
        const startMin = timeToMinutes(fallbackStart);
        const activeBlock = freeBlocks.find((b) => startMin >= b.start && startMin < b.end);
        if (activeBlock) {
          setSelectedEndTime(minutesToTime(Math.min(startMin + 60, activeBlock.end)));
        }
      }
    }
  }, [isTimeDialogOpen, selectableStartOptions, freeBlocks]);

  const date = useMemo(() => {
    const dateParam = searchParams.get("date");
    const sourceDate = dateParam || schedule.date;
    if (!sourceDate) return new Date();
    const [year, month, day] = sourceDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [searchParams, schedule.date]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = Math.max(minutesToY(9 * 60) - 20, 0);
    }
  }, []);

  useEffect(() => {
    const roomsParam = searchParams.get("rooms");

    if (roomsParam) {
      const parsedRooms = roomsParam
        .split(",")
        .map((room) => room.trim())
        .filter(Boolean);

      if (parsedRooms.length) {
        setSelectedRooms(parsedRooms);
        sessionStorage.setItem("selectedRooms", JSON.stringify(parsedRooms));
      }
    } else {
      const storedRooms = sessionStorage.getItem("selectedRooms");
      if (storedRooms) {
        try {
          const parsed = JSON.parse(storedRooms);
          if (Array.isArray(parsed)) setSelectedRooms(parsed);
        } catch (error) {
          console.error("Failed to parse selectedRooms:", error);
        }
      }
    }
  }, [searchParams]);

  const handleConfirmTime = () => {
    if (!selectedStartTime || !selectedEndTime) {
      setTimeError("Please pick a valid window range.");
      return;
    }
    
    setTimeError(null);
    sessionStorage.setItem("selectedTime", JSON.stringify({ start: selectedStartTime, end: selectedEndTime }));
    setIsTimeDialogOpen(false);
    
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const params = new URLSearchParams({ date: dateString });

    if (selectedRooms.length > 0) {
      params.set("rooms", selectedRooms.join(","));
    }
    if (selectedStartTime) {
      params.set("start", selectedStartTime);
    }
    if (selectedEndTime) {
      params.set("end", selectedEndTime);
    }

    router.push(`/form?${params.toString()}`);
  };

  const handleEmptySpaceClick = (clickedTime: string) => {
    const clickedMin = timeToMinutes(clickedTime);
    
    // Find if the clicked slot falls within a fully unblocked time span across all rooms
    const matchingBlock = freeBlocks.find((b) => clickedMin >= b.start && clickedMin < b.end);
    
    // STOPS HERE: If it's not a completely valid selectable slot, do nothing (no modal jump)
    if (!matchingBlock) {
      return; 
    }

    // Only execute and trigger dialog when slot is explicitly open
    setSelectedStartTime(clickedTime);
    
    // Sets default end time selection strictly 30 minutes later
    setSelectedEndTime(minutesToTime(clickedMin + 30));
    setTimeError(null);
    setIsTimeDialogOpen(true);
  };

  const gridHeight = HOUR_HEIGHT * (END_HOUR - START_HOUR);

  return (
    <div className="flex items-start justify-center px-6 py-8">
      <div className="w-full max-w-[1500px]">
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsTimeDialogOpen(true)} className="gap-2" variant="outline">
            <Clock className="h-4 w-4" />
            Select Time
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d8cbb8] bg-[#f8f3eb] shadow-sm">
          <CalendarHeader date={date} />
          <div ref={scrollContainerRef} className="overflow-auto" style={{ maxHeight: "820px" }}>
            <div className="flex min-w-[980px]">
              <div className="sticky left-0 z-10 w-[70px] flex-shrink-0 border-r border-[#e4d9c9] bg-[#f8f3eb]">
                <div className="sticky top-0 h-[49px] border-b border-[#e4d9c9] bg-[#f8f3eb]" />
                <div className="relative" style={{ height: gridHeight }}>
                  {HOURS.map((hour) => (
                    <div key={hour}>
                      <div className="absolute left-0 right-0 border-t border-[#e8dfd1]" style={{ top: minutesToY(hour * 60) }} />
                      {hour < END_HOUR && (
                        <span className="absolute left-3 -translate-y-1/2 text-[12px] text-[#8f98a3]" style={{ top: minutesToY(hour * 60) }}>
                          {formatHour(hour)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-1">
                {schedule.rooms.map((room) => (
                  <RoomColumn key={room.id} room={room} isToday={date.toDateString() === new Date().toDateString()} onEmptySpaceClick={handleEmptySpaceClick} schedule={schedule} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time Selection Dialog */}
        <Dialog open={isTimeDialogOpen} onOpenChange={(open) => { setIsTimeDialogOpen(open); if (!open) setTimeError(null); }}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Select Time Slot</DialogTitle>
              <DialogDescription>
                Only showing unconflicted times available across all rooms.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {timeError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                  <p className="font-medium">{timeError}</p>
                </div>
              )}

              {selectableStartOptions.length === 0 ? (
                <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 border border-amber-200">
                  No overlapping availability found across all rooms today.
                </div>
              ) : (
                <>
                  {/* Start Time Text */}
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-gray-500 block">Start Time</span>
                    <div className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {selectedStartTime ? formatEventTime(selectedStartTime) : ""}
                    </div>
                  </div>

                  {/* End Time Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Time</label>
                    <select
                      value={selectedEndTime}
                      onChange={(e) => {
                        setSelectedEndTime(e.target.value);
                        setTimeError(null);
                      }}
                      className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    >
                      {selectableEndOptions.map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {formatEventTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Final Selected Display Window Summary */}
                  {selectedStartTime && selectedEndTime && (
                    <div className="rounded-md p-3 text-sm bg-blue-50 text-blue-800">
                      <p className="font-medium">Confined Window Choice:</p>
                      <p className="mt-1 font-semibold">
                        {formatEventTime(selectedStartTime)} – {formatEventTime(selectedEndTime)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsTimeDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirmTime} disabled={selectableStartOptions.length === 0} className="flex-1">
                Confirm Time
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}