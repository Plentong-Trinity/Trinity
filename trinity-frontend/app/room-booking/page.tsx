"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Calendar, Clock, AlertTriangle, ChevronRight, Loader2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Image from "next/image";

// Fixed Room layout with complete borders - Floor 1
const ROOM_DATA_FLOOR_1 = [
  { id: 'Park', label: 'Parking Lot', grid: 'col-start-1 col-span-2 row-start-1 row-span-6', style:'my-1' },
  { id: 'CN', label: 'Canteen', grid: 'col-start-3 col-span-1 row-start-1 row-span-6', style:'my-1 ml-1' },
  { id: 'M', label: 'St. Mary', grid: 'col-start-6 col-span-2 row-start-3 row-span-4', style:'mb-1 mr-1 border-t-transparent' },
  // { id: '10', label: 'Room 10', grid: 'col-start-2 row-start-1 row-span-2', style:'my-1'},
  // { id: '11', label: 'Room 11', grid: 'col-start-3 row-start-1 row-span-2', style:'my-1'},
  // { id: '12', label: 'Room 12', grid: 'col-start-1 row-start-4', style:'my-1' },
  // { id: 'T', label: 'Toilet', grid: 'col-start-1 row-start-5 bg-slate-5 row-span-2', isService: true , style:'my-1'},
  // { id: 'E7', label:'' , grid: 'col-start-4 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1' },
  // { id: '8', label: 'Room 8', grid: 'col-start-3 row-start-4 row-span-3', style:'my-1' },
  // { id: '7', label: 'Room 7', grid: 'col-start-4 col-span-2 row-start-5 row-span-2', style:'my-1 ml-1 mr-0.5' },
  // { id: '6', label: 'Room 6', grid: 'col-start-6 row-start-4 row-span-3', style:'my-1 mx-0.5' },
  { id: 'n', label: 'St. Mary', grid: 'col-start-6 col-span-2 row-start-1 row-span-2', isService: true, style:'mt-1 mr-1'},
  { id: 'H1', label: 'Hall 1', grid: 'col-start-8 row-start-1 row-span-2', style:'my-1' },
  { id: 'H2', label: 'Hall 2', grid: 'col-start-8 row-start-3 row-span-2', style:'my-0.5' },
  { id: '1', label: 'Room 1', grid: 'col-start-8 row-start-5 row-span-1', style:'my-0.5' },
  { id: '2', label: 'Room 2', grid: 'col-start-9 row-start-5 row-span-1', style:'my-0.5 ml-1' },
  { id: '3', label: 'Room 3', grid: 'col-start-9 row-start-6 row-span-1', style:'my-1 ml-1' },
  { id: 'T', label: 'Toilet', grid: 'col-start-8 row-start-6 row-span-1', isService: true, style:'mt-1 mb-1' },
  { id: 'SCT', label: 'Sanctuary', grid: 'col-start-4 col-span-2 row-start-1 row-span-6', style:'my-1 mx-1' },
];

// Floor 2 - Alternative layout
const ROOM_DATA_FLOOR_2 = [
  { id: '9', label: 'Room 9', grid: 'col-start-1 row-start-1 row-span-2', style:'my-1' },
  { id: '10', label: 'Room 10', grid: 'col-start-2 row-start-1 row-span-2', style:'my-1'},
  { id: '11', label: 'Room 11', grid: 'col-start-3 row-start-1 row-span-2', style:'my-1'},
  { id: '12', label: 'Room 12', grid: 'col-start-1 row-start-4', style:'my-1' },
  { id: 'T', label: 'Toilet', grid: 'col-start-1 row-start-5 bg-slate-5 row-span-2', isService: true , style:'my-1'},
  // { id: 'E7', label:'' , grid: 'col-start-4 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1' },
  { id: '8', label: 'Room 8', grid: 'col-start-3 row-start-4 row-span-3', style:'my-1' },
  { id: '7', label: 'Room 7', grid: 'col-start-4 col-span-2 row-start-5 row-span-2', style:'my-1 ml-1 mr-0.5' },
  { id: '6', label: 'Room 6', grid: 'col-start-6 col-span-2 row-start-5 row-span-2', style:'my-1 mx-0.5' },
  { id: '4', label: 'Room 4', grid: 'col-start-7 row-start-1 row-span-2', style:'my-1' },
  { id: '5', label: 'Room H', grid: 'col-start-8 row-start-1 row-span-2', style:'my-1' },
  { id: 'PH', label: 'Parish House', grid: 'col-start-9 col-span-2 row-start-1 row-span-2 bg-slate-50', isService: true, style:'my-1 mx-1' },
  { id: 'WL1', label: 'WALL1', grid: 'col-start-4 col-span-2 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1 mx-1' },
  { id: 'ST', label: 'Staircase', grid: 'col-start-6 col-span-1 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1 mx-0.5' },
];

export default function BookingPage() {
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<'floor1' | 'floor2'>('floor1');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isSingleDayCalendarOpen, setIsSingleDayCalendarOpen] = useState(false);
  const [loadingType, setLoadingType] = useState<'single' | 'multi' | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedSingleDate, setSelectedSingleDate] = useState<Date | null>(null);

  const roomData = currentFloor === 'floor1' ? ROOM_DATA_FLOOR_1 : ROOM_DATA_FLOOR_2;

  const toggleRoom = (id: string, isService: boolean) => {
    if (isService) return;
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const handleBooking = (type: 'single' | 'multi') => {
    if (type === 'single') {
      setLoadingType('single');
      setIsSingleDayCalendarOpen(true);
      setIsBookingDialogOpen(false);
    } else {
      setLoadingType('multi');
      router.push('/calendar');
    }
  };

  const handleSingleDateSelect = (date: Date) => {
    setSelectedSingleDate(date);
  };

  const handleConfirmSingleDay = () => {
    console.log("Single day booking confirmed for:", selectedSingleDate);
    setLoadingType(null);
    setIsSingleDayCalendarOpen(false);
    
    if (selectedSingleDate) {
      // Save selected rooms to session storage
      sessionStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
      
      const year = selectedSingleDate.getFullYear();
      const month = String(selectedSingleDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedSingleDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      router.push(`/day-view?date=${dateString}`);
    }
    
    setSelectedSingleDate(null);
    setCalendarMonth(new Date());
    // Navigate to checkout or next step
    // router.push('/checkout');
  };

  const handlePrevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-4 md:p-8">
      {/* <div className="max-w-6xl mx-auto w-full mb-6">
        <Button variant="ghost" asChild className="gap-2">
        </Button>
      </div> */}

      <main className="max-w-6xl mx-auto w-full">
        {/* Interactive Map with Fixed Borders */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Room Selection</CardTitle>
                <CardDescription>Click to select rooms for your booking.</CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentFloor(currentFloor === 'floor1' ? 'floor2' : 'floor1')}
              className="gap-2"
            >
              Floor {currentFloor === 'floor1' ? 1 : 2}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative border border-slate-300 p-8 bg-white rounded-md overflow-x-auto">
              {/* Using a grid with gap to ensure distinct borders for every room */}
              <div className="grid grid-cols-10 grid-rows-6 min-w-[600px] h-[350px]">
                {roomData.map((room) => (
                  <button
                    key={room.id}
                    disabled={room.isService}
                    onClick={() => toggleRoom(room.id, !!room.isService)}
                    className={`
                                ${room.grid}
                                ${room.style || ''}
                                flex items-center justify-center
                                border-2 border-slate-800
                                text-[10px] font-bold transition-all

                                ${room.isService ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}

                                ${
                                  !room.isService && !selectedRooms.includes(room.id)
                                    ? 'hover:bg-slate-100'
                                    : ''
                                }

                                ${
                                  selectedRooms.includes(room.id)
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-white text-slate-800'
                                }
                              `}>
                    <div className="flex flex-col items-center justify-center">
                      {room.id === "ST" || room.id === "ST2" ? (
                        <div className="relative w-full h-full">
                          <Image
                            src="/images/staircase.png"
                            alt="Staircase"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        ) : (
                          <span>{room.label}</span>
                        )}
                    </div>
                    {/* {room.label} */}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-start gap-2 text-sm text-slate-600">
            <div className="flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-amber-600 font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Important Rules:
              </div>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>No food/drinks/smoking inside the room</li>
                <li>NO PLANKING</li>
              </ul>
            </div>
            <button
              disabled={selectedRooms.length === 0}
              onClick={() => setIsBookingDialogOpen(true)}
              className="ml-auto bg-primary text-primary-foreground px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-primary/90 active:scale-95 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Booking
            </button>
          </CardFooter>
        </Card>

        {/* --- Booking Type Selection Dialog --- */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Choose Booking Type</DialogTitle>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">You have selected:</p>
                <div className="grid grid-cols-4 gap-2">
                  {selectedRooms.map((room) => (
                    <div
                      key={room}
                      className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium text-center"
                    >
                      {room}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Would you like to book for a single day or a range of dates?</p>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button 
                variant="outline" 
                className="flex flex-col h-24 gap-2"
                onClick={() => 
                  handleBooking('single')
                }
              >
                {loadingType === 'single' ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <Clock className="h-6 w-6 text-primary" />
                )}
                <span>Single Day</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-24 gap-2"
                onClick={() => {
                  handleBooking('multi');}}
              >
                {loadingType === 'multi' ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <Calendar className="h-6 w-6 text-primary" />
                )}
                <span>Multiple Days</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- Single Day Calendar Popup --- */}
        <Dialog open={isSingleDayCalendarOpen} onOpenChange={setIsSingleDayCalendarOpen}>
          <DialogContent className="sm:max-w-[320px] p-0 bg-white border border-gray-300 [&>button]:hidden">
            {/* Month/Year Header with Navigation - Aligned with X */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <button
                onClick={handlePrevMonth}
                className="p-0.5 hover:bg-gray-100 rounded"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </button>
              <div className="text-center flex-1">
                <div className="text-black font-semibold text-sm">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-0.5 hover:bg-gray-100 rounded"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </button>
            </div>

            <div className="px-4 pb-4 pt-4">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Teu', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-black py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const daysInMonth = getDaysInMonth(calendarMonth);
                  const firstDay = getFirstDayOfMonth(calendarMonth);
                  const days = [];

                  // Empty cells for days before the month starts
                  for (let i = 0; i < firstDay; i++) {
                    days.push(<div key={`empty-${i}`} className="h-8" />);
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                    const isSelected = selectedSingleDate && isSameDay(date, selectedSingleDate);
                    const isTodayDate = isToday(date);

                    days.push(
                      <button
                        key={day}
                        onClick={() => handleSingleDateSelect(date)}
                        disabled={date < new Date()}
                        className={`h-8 w-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                          (date < new Date()) ? 'text-gray-400 cursor-not-allowed' : 

                          isSelected
                            ? 'bg-gray-800 text-white'
                            : isTodayDate
                            ? 'bg-gray-300 text-black border border-black'
                            : 'text-black hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  }

                  return days;
                })()}
              </div>

              {/* Confirm Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleConfirmSingleDay}
                  disabled={!selectedSingleDate}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}