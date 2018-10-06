import React from "react";
import { Document, Page } from "react-pdf";

const PdfElement = ({ file, pageNumber, onDocumentLoad, width }) => {
  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoad}>
        <Page pageNumber={pageNumber} width={width} />
      </Document>
    </div>
  );
};

export default PdfElement;
