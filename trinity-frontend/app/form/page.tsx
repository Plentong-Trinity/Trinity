"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Users, MapPin, Calendar, Clock, AlertTriangle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Upload, FileText } from "lucide-react";

const ROOM_DATA_FLOOR_1 = [
  { id: 'Park', label: 'Parking Lot', grid: 'col-start-1 col-span-2 row-start-1 row-span-6', style:'my-1' },
  { id: 'CN', label: 'Canteen', grid: 'col-start-3 col-span-1 row-start-1 row-span-6', style:'my-1 ml-1' },
  { id: 'M', label: 'St. Mary', grid: 'col-start-6 col-span-2 row-start-3 row-span-4', style:'mb-1 mr-1 border-t-transparent' },
  { id: 'n', label: 'St. Mary', grid: 'col-start-6 col-span-2 row-start-1 row-span-2', isService: true, style:'mt-1 mr-1'},
  { id: 'H1', label: 'Hall 1', grid: 'col-start-8 row-start-1 row-span-2', style:'my-1' },
  { id: 'H2', label: 'Hall 2', grid: 'col-start-8 row-start-3 row-span-2', style:'my-0.5' },
  { id: '1', label: 'Room 1', grid: 'col-start-8 row-start-5 row-span-1', style:'my-0.5' },
  { id: '2', label: 'Room 2', grid: 'col-start-9 row-start-5 row-span-1', style:'my-0.5 ml-1' },
  { id: '3', label: 'Room 3', grid: 'col-start-9 row-start-6 row-span-1', style:'my-1 ml-1' },
  { id: 'T', label: 'Toilet', grid: 'col-start-8 row-start-6 row-span-1', isService: true, style:'mt-1 mb-1' },
  { id: 'SCT', label: 'Sanctuary', grid: 'col-start-4 col-span-2 row-start-1 row-span-6', style:'my-1 mx-1' },
];

const ROOM_DATA_FLOOR_2 = [
  { id: '9', label: 'Room 9', grid: 'col-start-1 row-start-1 row-span-2', style:'my-1' },
  { id: '10', label: 'Room 10', grid: 'col-start-2 row-start-1 row-span-2', style:'my-1'},
  { id: '11', label: 'Room 11', grid: 'col-start-3 row-start-1 row-span-2', style:'my-1'},
  { id: '12', label: 'Room 12', grid: 'col-start-1 row-start-4', style:'my-1' },
  { id: 'T', label: 'Toilet', grid: 'col-start-1 row-start-5 bg-slate-5 row-span-2', isService: true , style:'my-1'},
  { id: '8', label: 'Room 8', grid: 'col-start-3 row-start-4 row-span-3', style:'my-1' },
  { id: '7', label: 'Room 7', grid: 'col-start-4 col-span-2 row-start-5 row-span-2', style:'my-1 ml-1 mr-0.5' },
  { id: '6', label: 'Room 6', grid: 'col-start-6 col-span-2 row-start-5 row-span-2', style:'my-1 mx-0.5' },
  { id: '4', label: 'Room 4', grid: 'col-start-7 row-start-1 row-span-2', style:'my-1' },
  { id: '5', label: 'Room H', grid: 'col-start-8 row-start-1 row-span-2', style:'my-1' },
  { id: 'PH', label: 'Parish House', grid: 'col-start-9 col-span-2 row-start-1 row-span-2 bg-slate-50', isService: true, style:'my-1 mx-1' },
];

export default function FormPage() {
  const searchParams = useSearchParams();
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState({ start: "", end: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [formData, setFormData] = useState({
    applicant: "",
    ministry: "",
    purpose: "",
    pax: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentFloor, setCurrentFloor] = useState<'floor1' | 'floor2'>('floor1');
  const [isDragActive, setIsDragActive] = useState(false);
  const roomData = currentFloor === 'floor1' ? ROOM_DATA_FLOOR_1 : ROOM_DATA_FLOOR_2;

  const toggleRoom = (id: string, isService: boolean) => {
    if (isService) return;
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((roomId) => roomId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const loadData = () => {
      const dateParam = searchParams.get("date");
      if (dateParam) setSelectedDate(dateParam);

      const timeData = sessionStorage.getItem("selectedTime");
      if (timeData) {
        try {
          const parsed = JSON.parse(timeData);
          setSelectedTime({ start: parsed.start || "", end: parsed.end || "" });
        } catch (e) { console.error(e); }
      }

      const roomsData = sessionStorage.getItem("selectedRooms");
      if (roomsData) {
        try {
          const parsed = JSON.parse(roomsData);
          setSelectedRooms(Array.isArray(parsed) ? parsed : []);
        } catch (e) { console.error(e); }
      }
    };

    loadData();
    const timer = setTimeout(loadData, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    sessionStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
  }, [selectedRooms]);

  useEffect(() => {
    if (!previewFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(previewFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    };
  }, [previewFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
      e.currentTarget.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const previewSelectedFile = async (file: File) => {
    setPreviewFile(file);
    setPreviewHtml(null);

    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const { default: mammoth } = await import('mammoth/mammoth.browser');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setPreviewHtml(result.value);
      } catch (error) {
        console.error('DOCX preview failed', error);
      }
    }

    setIsPreviewOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic...
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 antialiased text-slate-900">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDE: Visuals and Details */}
        <div className="lg:col-span-5 space-y-6 lg:sticky" style={{ top: 'calc(var(--navbar-height, 0px) + 1rem)' }}>
          <Card className="shadow-sm border-slate-200 overflow-hidden">
            <CardHeader className="bg-white border-b py-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Floor Plan Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 bg-slate-100 border-b">
              <div className="relative border border-slate-300 p-4 bg-white rounded-md">
                <div className="grid grid-cols-9 grid-rows-6 h-[200px]">
                  {roomData.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      disabled={true}
                      onClick={() => toggleRoom(room.id, !!room.isService)}
                      className={`
                        ${room.grid}
                        ${room.style || ''}
                        flex items-center justify-center
                        border-2 border-slate-800
                        text-[10px] font-bold transition-all
                        ${room.isService ? 'opacity-60 bg-slate-100 text-slate-500' : ''}
                        ${selectedRooms.includes(room.id) ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-slate-800'}
                      `}
                    >
                      <span>{room.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between mt-2">
                <div className="text-sm text-slate-700">
                  Selected rooms: {selectedRooms.length}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentFloor(currentFloor === 'floor1' ? 'floor2' : 'floor1')}
                    className="gap-2"
                  >
                    Floor {currentFloor === 'floor1' ? 1 : 2}
                  </Button>
                </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Selected Date</p>
                  <p className="text-sm font-semibold">{selectedDate || "Not selected"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Time Window</p>
                  <p className="text-sm font-semibold">{selectedTime.start ? `${selectedTime.start} – ${selectedTime.end}` : "Not selected"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE: Application Form */}
        <div className="lg:col-span-7">
          <Card className="shadow-xl border-none ring-1 ring-slate-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-extrabold tracking-tight">Room Request Form</CardTitle>
              <p className="text-slate-500 text-sm">Please enter details exactly as they should appear in the record.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Applicant Info - Using normal-case to ensure case sensitivity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="applicant" className="text-sm font-semibold">Applicant Name</Label>
                    <Input 
                      id="applicant" 
                      placeholder="e.g. Paul Ho" 
                      className="font-sans normal-case focus:ring-blue-500" 
                      required
                      value={formData.applicant} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pax" className="text-sm font-semibold">Expected Pax</Label>
                    <Input id="pax" type="number" placeholder="40" className="font-sans" required value={formData.pax} onChange={handleChange} min={1} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ministry" className="text-sm font-semibold">Ministry / Department</Label>
                  <Input 
                    id="ministry" 
                    placeholder="e.g. Outreach Team" 
                    className="font-sans normal-case"
                    required
                    value={formData.ministry} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-sm font-semibold">Purpose of Use</Label>
                  <Textarea 
                    id="purpose" 
                    rows={3} 
                    placeholder="Provide a detailed description of the meeting or event..." 
                    className="font-sans normal-case resize-none"
                    required
                    value={formData.purpose} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Supporting Documents</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:bg-slate-100'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {files.length > 0 ? (
                          <div className="flex flex-col items-center gap-2 text-blue-600 font-medium">
                            <FileText className="h-5 w-5" />
                            <span className="text-sm">{files.length} file{files.length > 1 ? 's' : ''} selected</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-400">PDF, DOCX or PNG (MAX. 5MB)</p>
                          </>
                        )}
                      </div>
                      <input type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg" />
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
                      <div className="text-sm font-semibold text-slate-700">Uploaded files</div>
                      <div className="space-y-2">
                        {files.map((fileItem, index) => (
                          <div key={`${fileItem.name}-${index}`} className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                            <div>
                              <p className="text-sm font-medium text-slate-900">{fileItem.name}</p>
                              <p className="text-xs text-slate-500">{Math.round(fileItem.size / 1024)} KB</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-800" onClick={() => previewSelectedFile(fileItem)}>
                                View
                              </button>
                              <button type="button" className="text-sm font-semibold text-rose-600 hover:text-rose-800" onClick={() => removeFile(index)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-slate-900 hover:bg-black text-white h-12 rounded-lg font-bold transition-all shadow-lg active:scale-95">
                  Submit Application
                </Button>
              </form>
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>{previewFile?.name || 'File Preview'}</DialogTitle>
                    <DialogDescription className="text-sm text-slate-500 mt-2">
                      Preview selected file below. Close when finished.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    {previewHtml ? (
                      <div className="prose max-h-[500px] overflow-auto rounded-md border border-slate-200 bg-white p-4" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    ) : previewUrl ? (
                      previewFile?.type.startsWith('image/') ? (
                        <img src={previewUrl} alt={previewFile.name} className="max-h-[400px] w-full rounded-md object-contain" />
                      ) : previewFile?.type === 'application/pdf' ? (
                        <object data={previewUrl} type="application/pdf" className="h-[400px] w-full rounded-md border">
                          <p className="text-sm text-slate-600">Preview not available. <a href={previewUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open in new tab</a></p>
                        </object>
                      ) : previewFile?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || previewFile?.type === 'application/msword' ? (
                        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                          <p className="font-medium">DOC/DOCX preview is loading or not supported. Use the download link below if needed.</p>
                          <p>{previewFile?.name}</p>
                          <a href={previewUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Download or open externally</a>
                        </div>
                      ) : (
                        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                          <p className="font-medium">Cannot preview this file type.</p>
                          <p>{previewFile?.name}</p>
                          <a href={previewUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Download or open externally</a>
                        </div>
                      )
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        No preview available.
                      </div>
                    )}
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsPreviewOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}