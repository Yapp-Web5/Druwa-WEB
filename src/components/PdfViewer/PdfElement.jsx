import React from "react";
import { Document, Page } from "react-pdf";
import * as styles from "./PdfElement.scss";

const PdfElement = ({ file, pageNumber, onDocumentLoad, width }) => {
  //cros처리
  // const cros_file = {
  //   url: file,
  //   httpHeaders: { "X-CustomHeader": "40359820958024350238508234" },
  //   withCredentials: true,
  // };

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
