"use client"
// ---- Component: MedicineIdentifier ----- //
// - Review [x]
import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, X, Loader2, Pill, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useUploadMedicineMutation } from "@/app/store/features/ai-services/appApi"

// ----- Identification Result type ----- //
interface IdentificationResult {
  Medicine_Name: string
  Composition: string
  Uses: string
  Side_effects: string
  Image_URL: string
  Manufacturer: string
  Excellent_Review: number
  Average_Review: number
  Poor_Review: number
}

// ----- Convert any image type to PNG before uploading ----- //
async function convertImageToPng(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject("Canvas not supported")

        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("PNG conversion failed")
            const pngFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".png", {
              type: "image/png",
            })
            resolve(pngFile)
          },
          "image/png",
          1.0
        )
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}

// ----- Medicine Identifier Component ----- //
export function MedicineIdentifier() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadMedicine, { isLoading: isUploading }] = useUploadMedicineMutation()

  // ----- Handle local preview + convert to PNG ----- //
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const pngFile = await convertImageToPng(file)
        setSelectedFile(pngFile)

        const reader = new FileReader()
        reader.onload = (e) => setPreviewImage(e.target?.result as string)
        reader.readAsDataURL(pngFile)

        setResult(null)
      } catch (err) {
        console.error("Failed to convert image:", err)
      }
    }
  }

  // ----- Handle medicine identification ----- //
  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    try {
      const response = await uploadMedicine(selectedFile).unwrap()

      // ✅ Set result from response
      setResult(response)
    } catch (err) {
      console.error("Upload failed:", err)
      setResult(null)
    } finally {
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
        <h2 className="text-lg font-bold mb-2 font-mono">Medicine Identifier</h2>
        <p className="text-muted-foreground mb-4">
          Upload a clear photo of your medication to identify it and get detailed information. Here’s an example of a
          clear photo{" "}
          <a
            href="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/pn7apngctvrtweencwi1.jpg"
            target="_blank"
            className="underline text-blue-400"
          >
            (View Example)
          </a>
          .<br />
          <span className="text-xs text-red-500">
            Do not rely solely on this identification. Always meet a healthcare professional before taking any
            medicine.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="border rounded font-mono shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Upload Medicine Photo
            </CardTitle>
            <CardDescription>Take a clear photo of your pill or packaging</CardDescription>
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
                {previewImage ? (
                  <img src={previewImage} alt="Selected medicine" className="w-full h-64 object-cover rounded-lg" />
                ) : null}
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
        <Card className="border rounded font-mono shadow-none">
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
                  <h3 className="text-xl font-bold">{result.Medicine_Name}</h3>
                </div>

                <img
                  src={result.Image_URL}
                  alt={result.Medicine_Name}
                  className="w-full h-56 object-cover rounded-lg border"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Composition</p>
                    <p className="font-medium">{result.Composition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{result.Manufacturer}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Uses</p>
                  <p className="text-sm">{result.Uses}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Side Effects
                  </p>
                  <p className="text-sm text-yellow-800">{result.Side_effects}</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Disclaimer:</strong> This identification is for informational purposes only. Always consult
                    a healthcare professional before taking any medication.
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
