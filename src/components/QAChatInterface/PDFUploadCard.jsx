import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const PDFUploadCard = ({ onUploadComplete, onRemove, currentPDF }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'success', 'error'
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (!file.name.endsWith('.pdf')) {
      setUploadStatus('error');
      return;
    }

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      setUploadStatus('error');
      return;
    }

    // Trigger upload
    onUploadComplete(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  // If PDF is already uploaded, show info card
  if (currentPDF) {
    return (
      <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle size={20} className="text-green-400" />
            <div>
              <p className="text-green-400 font-medium">{currentPDF.filename}</p>
              <p className="text-green-300 text-xs">
                {currentPDF.page_count} pages • Ready for questions
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-green-500/20 rounded transition-colors"
          >
            <X size={18} className="text-green-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all
          ${isDragging 
            ? 'border-green-400 bg-green-500/10' 
            : 'border-dark-border hover:border-green-400/50 bg-dark-card'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className={`p-3 rounded-full ${isDragging ? 'bg-green-500/20' : 'bg-dark-bg'}`}>
            <Upload size={24} className={isDragging ? 'text-green-400' : 'text-dark-textSecondary'} />
          </div>
          
          <div className="text-center">
            <p className="text-dark-text font-medium">
              Upload PDF Study Material
            </p>
            <p className="text-dark-textSecondary text-sm mt-1">
              Drag and drop or click to browse
            </p>
            <p className="text-dark-textSecondary text-xs mt-1">
              Max size: 20MB
            </p>
          </div>
        </div>
      </div>

      {uploadStatus === 'error' && (
        <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">
            Invalid file. Please upload a PDF file under 20MB.
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFUploadCard;

