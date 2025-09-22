"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, X, Loader2, Pill, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface IdentificationResult {
  name: string
  confidence: number
  dosage: string
  manufacturer: string
  warnings: string[]
  description: string
}

export function MedicineIdentifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate API call - replace with actual backend integration
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
    }, 3000)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
            {!selectedImage ? (
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
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected medicine"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearImage}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {selectedImage && (
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Pill className="w-4 h-4 mr-2" />
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

      {/* Recent Identifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Identifications</CardTitle>
          <CardDescription>Your previously identified medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Metformin 500mg</p>
                  <p className="text-sm text-muted-foreground">Identified 2 days ago</p>
                </div>
              </div>
              <Badge variant="outline">97% match</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Atorvastatin 20mg</p>
                  <p className="text-sm text-muted-foreground">Identified 1 week ago</p>
                </div>
              </div>
              <Badge variant="outline">92% match</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
