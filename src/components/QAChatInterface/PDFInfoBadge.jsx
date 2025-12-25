import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

const PDFInfoBadge = ({ pdfInfo }) => {
  if (!pdfInfo) return null;

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
      <FileText size={14} className="text-green-400" />
      <span className="text-green-400 text-xs font-medium">
        Answering from: {pdfInfo.filename}
      </span>
      <Sparkles size={12} className="text-green-400 animate-pulse" />
    </div>
  );
};

export default PDFInfoBadge;

