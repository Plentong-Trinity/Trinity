"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Users, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormPage() {
  const searchParams = useSearchParams();
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState({ start: "", end: "" });

  const [formData, setFormData] = useState({
    applicant: "",
    ministry: "",
    purpose: "",
    pax: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch booking details from session storage
  useEffect(() => {
    // Small delay to ensure session storage is accessible
    const loadData = () => {
      const dateParam = searchParams.get("date");
      console.log("Date from URL:", dateParam);
      if (dateParam) {
        setSelectedDate(dateParam);
      }

      const timeData = sessionStorage.getItem("selectedTime");
      console.log("Time from storage:", timeData);
      if (timeData) {
        try {
          const parsed = JSON.parse(timeData);
          console.log("Parsed time:", parsed);
          setSelectedTime({ start: parsed.start || "", end: parsed.end || "" });
        } catch (error) {
          console.error("Failed to parse time data:", error);
        }
      }

      const roomsData = sessionStorage.getItem("selectedRooms");
      console.log("Rooms from storage:", roomsData);
      if (roomsData) {
        try {
          const parsed = JSON.parse(roomsData);
          console.log("Parsed rooms:", parsed);
          setSelectedRooms(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error("Failed to parse rooms data:", error);
        }
      }
    };

    // Call immediately and also with a small delay to ensure session storage is ready
    loadData();
    const timer = setTimeout(loadData, 100);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicant.trim()) {
      newErrors.applicant = "Applicant name is required";
    }
    if (!formData.ministry.trim()) {
      newErrors.ministry = "Ministry is required";
    }
    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }
    if (!formData.pax) {
      newErrors.pax = "Number of people is required";
    } else if (parseInt(formData.pax) <= 0) {
      newErrors.pax = "Number of people must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", { ...formData, selectedRooms, selectedDate, selectedTime });
      // TODO: Send form data to your backend API
      alert("Form submitted successfully!");
      // Reset form
      setFormData({
        applicant: "",
        ministry: "",
        purpose: "",
        pax: "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-4 md:p-8">
      <main className="max-w-2xl mx-auto w-full space-y-4">
        {/* Booking Summary Card */}
        <Card className="shadow-md border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-900">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Date</p>
                <p className="text-sm text-slate-600">
                  {selectedDate
                    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Not selected"}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Time</p>
                <p className="text-sm text-slate-600">
                  {selectedTime.start && selectedTime.end
                    ? `${selectedTime.start} – ${selectedTime.end}`
                    : "Not selected"}
                </p>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Rooms Selected</p>
                {selectedRooms.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedRooms.map((room) => (
                      <span
                        key={room}
                        className="inline-block bg-slate-200 text-slate-900 px-2 py-1 rounded text-xs font-medium"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">No rooms selected</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="applicant">Applicant</Label>
                <Input
                  id="applicant"
                  placeholder="Paul Ho"
                  value={formData.applicant}
                  onChange={handleChange}
                  className={errors.applicant ? "border-red-500" : ""}
                />
                {errors.applicant && (
                  <p className="text-sm text-red-500">{errors.applicant}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ministry">Ministry</Label>
                <Input
                  id="ministry"
                  placeholder="e.g. 促进会"
                  value={formData.ministry}
                  onChange={handleChange}
                  className={errors.ministry ? "border-red-500" : ""}
                />
                {errors.ministry && (
                  <p className="text-sm text-red-500">{errors.ministry}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea
                  id="purpose"
                  placeholder="Meeting"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`${errors.purpose ? "border-red-500" : ""} normal-case`}
                />
                {errors.purpose && (
                  <p className="text-sm text-red-500">{errors.purpose}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pax" className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> Pax
                </Label>
                <Input
                  id="pax"
                  type="number"
                  placeholder="40"
                  value={formData.pax}
                  onChange={handleChange}
                  className={errors.pax ? "border-red-500" : ""}
                />
                {errors.pax && (
                  <p className="text-sm text-red-500">{errors.pax}</p>
                )}
              </div>

              <div className="flex items-start gap-2 text-sm text-slate-600 p-3 bg-blue-50 rounded-md border border-blue-200">
                <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Please fill in all the required fields above.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-primary/90 active:scale-95 active:bg-primary/80"
              >
                Submit to Office
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
