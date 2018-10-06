import React from "react";
import { Document, Page } from "react-pdf";
import * as styles from "./PdfElement.scss";

const PdfElement = ({ file, pageNumber, onDocumentLoad, width }) => {
  return (
    <Document
      className={styles.pdfElement}
      file={file}
      onLoadSuccess={onDocumentLoad}
    >
      <Page
        className={styles.pdfElement__page}
        pageNumber={pageNumber}
        width={width}
      />
    </Document>
  );
};

export default PdfElement;
