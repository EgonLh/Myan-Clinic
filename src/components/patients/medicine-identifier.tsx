"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, X, Loader2, Pill, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUploadMedicineMutation } from "@/app/store/features/ai-services/appApi" // import your RTK mutation

interface IdentificationResult {
  name: string
  confidence: number
  dosage: string
  manufacturer: string
  warnings: string[]
  description: string
}

export function MedicineIdentifier() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadMedicine, { isLoading: isUploading }] = useUploadMedicineMutation()

  // Handle local preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target?.result as string)
      reader.readAsDataURL(file)
      setResult(null)
    }
  }

  // Handle medicine identification
  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    try {
      // Upload the file to backend
      const response = await uploadMedicine(selectedFile).unwrap()
      console.log("Upload response:", response)

      // Simulate result based on response or replace with actual backend data
      setTimeout(() => {
        setResult({
          name: "Lisinopril",
          confidence: 94,
          dosage: "10mg",
          manufacturer: "Lupin Pharmaceuticals",
          warnings: ["Take with food", "May cause dizziness", "Monitor blood pressure"],
          description: "ACE inhibitor used to treat high blood pressure and heart failure",
        })
        setIsAnalyzing(false)
      }, 1000)
    } catch (err) {
      console.error("Upload failed:", err)
      setIsAnalyzing(false)
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setPreviewImage(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-balance mb-2">Medicine Identifier</h2>
        <p className="text-muted-foreground">
          Upload a photo of your medication to identify it and get detailed information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Upload Medicine Photo
            </CardTitle>
            <CardDescription>Take a clear photo of your pill or medication packaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!previewImage ? (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload an image</p>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to select a photo</p>
                <Button variant="outline">Choose File</Button>
              </div>
            ) : (
              <div className="relative">
                <img src={previewImage} alt="Selected medicine" className="w-full h-64 object-cover rounded-lg" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearImage}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {selectedFile && (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || isUploading}
                className="w-full flex justify-center items-center gap-2"
              >
                {isAnalyzing || isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Analyzing..."}
                  </>
                ) : (
                  <>
                    <Pill className="w-4 h-4" />
                    Identify Medicine
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Identification Results
            </CardTitle>
            <CardDescription>Detailed information about your medication</CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !isAnalyzing && (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Upload an image to get started</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-lg font-medium mb-2">Analyzing your medication...</p>
                <p className="text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{result.name}</h3>
                  <Badge
                    variant={result.confidence > 90 ? "default" : "secondary"}
                    className={cn(result.confidence > 90 && "bg-green-100 text-green-800 border-green-200")}
                  >
                    {result.confidence}% confident
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dosage</p>
                    <p className="font-medium">{result.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{result.manufacturer}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{result.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Important Warnings
                  </p>
                  <div className="space-y-2">
                    {result.warnings.map((warning, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">{warning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Disclaimer:</strong> This identification is for informational purposes only. Always consult
                    with your healthcare provider before taking any medication.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
