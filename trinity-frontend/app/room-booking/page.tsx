"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Calendar, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Fixed Room layout with complete borders
const ROOM_DATA = [
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
  { id: '5', label: 'Room 5', grid: 'col-start-8 row-start-1 row-span-2', style:'my-1' },
  { id: 'PH', label: 'Parish House', grid: 'col-start-9 col-span-2 row-start-1 row-span-2 bg-slate-50', isService: true, style:'my-1 mx-1' },
  { id: 'WL1', label: 'WALL1', grid: 'col-start-4 col-span-2 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1 mx-1' },
  { id: 'ST', label: 'Staircase', grid: 'col-start-6 col-span-1 row-start-1 row-span-4 bg-slate-50', isService: true, style:'my-1 mx-0.5' },
];

export default function BookingPage() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const toggleRoom = (id: string, isService: boolean) => {
    if (isService) return;
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map with Fixed Borders */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Room Selection
            </CardTitle>
            <CardDescription>Click to select rooms for your booking.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border border-slate-300 p-8 bg-white rounded-md overflow-x-auto">
              {/* Using a grid with gap to ensure distinct borders for every room */}
              <div className="grid grid-cols-10 grid-rows-6 min-w-[600px] h-[350px]">
                {ROOM_DATA.map((room) => (
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
                      {room.id === "ST" ? (
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
          <CardFooter className="flex flex-col items-start gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Important Rules:
            </div>
            <ul className="list-disc list-inside text-xs space-y-1">
              <li>No food/drinks/smoking inside the room</li>
            </ul>
          </CardFooter>
        </Card>

        {/* Application Form */}
        <Card className="shadow-md h-fit">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="applicant">Applicant</Label>
              <Input id="applicant" placeholder="Paul Ho" /> 
            </div>
            <div className="space-y-2">
              <Label htmlFor="ministry">Ministry</Label>
              <Input id="ministry" placeholder="e.g. 促进会" /> 
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" placeholder="Meeting"/> 
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> Pax
                </Label>
                <Input type="number" placeholder="40" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Date
                </Label>
                <Input type="date" /> 
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Time Duration
              </Label>
              <Input placeholder="10am - 12am" /> 
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={selectedRooms.length === 0}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
              </svg>Submit to Office
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}