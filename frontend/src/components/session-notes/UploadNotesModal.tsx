import { useState, useRef } from "react";
import type { FormEvent, DragEvent, ChangeEvent } from "react";
import {
  X,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import type { Session, SessionPdfNote } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";

type UploadNotesModalProps = {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
  existingNote?: SessionPdfNote;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const UploadNotesModal = ({
  session,
  isOpen,
  onClose,
  existingNote,
}: UploadNotesModalProps) => {
  const { uploadSessionNote } = useSessions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const validateAndSetFile = (file: File) => {
    setError(null);

    // Validate 1: PDF only
    const isPdfMime = file.type === "application/pdf";
    const isPdfExt = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdfMime && !isPdfExt) {
      setError("Please upload a PDF file.");
      setSelectedFile(null);
      return;
    }

    // Validate 2: 10 MB maximum
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("PDF must be smaller than 10 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const res = uploadSessionNote({
      sessionId: session.id,
      file: selectedFile,
    });

    if (res.success) {
      setSelectedFile(null);
      setError(null);
      onClose();
    } else {
      setError(res.error || "Failed to upload notes. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg rounded-3xl border border-violet-100 bg-white p-7 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Upload size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#211653]">
              {existingNote ? "Replace Session Notes" : "Upload Session Notes"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Topic: <span className="font-semibold text-slate-700">{session.topic}</span>
            </p>
          </div>
        </div>

        {/* Existing Note Banner */}
        {existingNote && !selectedFile && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-violet-50/70 p-3.5 border border-violet-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText size={18} className="text-violet-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-violet-900 truncate">
                  Current: {existingNote.fileName}
                </p>
                {existingNote.fileSize && (
                  <p className="text-[11px] text-violet-700">
                    {formatFileSize(existingNote.fileSize)}
                  </p>
                )}
              </div>
            </div>

            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
              Uploaded
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Drag & Drop Upload Zone */}
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                isDragging
                  ? "border-violet-500 bg-violet-50/80 scale-[1.01]"
                  : "border-slate-200 bg-slate-50/60 hover:border-violet-300 hover:bg-violet-50/30"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <FileText size={28} />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                Click to browse or drag & drop PDF here
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PDF documents only • Max 10 MB
              </p>
            </div>
          ) : (
            /* Selected File Card */
            <div className="rounded-2xl border border-green-200 bg-green-50/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-green-950 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-700">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                  title="Remove selected file"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedFile}
              className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-sm transition ${
                selectedFile
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-md"
                  : "bg-slate-300 cursor-not-allowed text-slate-500"
              }`}
            >
              <Upload size={16} />
              {existingNote ? "Replace Notes" : "Upload Notes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadNotesModal;
