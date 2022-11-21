import React, { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import "./Upload.css";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };
  return (
    <div>
      <div className="title"> Upload file</div>
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
    </div>
  );
}
