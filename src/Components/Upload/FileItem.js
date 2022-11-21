import React from "react";
import "./FileItem.css";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <button className="fa-spin" onClick={() => deleteFile(file.name)}>
              spinner
            </button>
          )}
          {!file.isUploading && (
            <button onClick={() => deleteFile(file.name)}>delete</button>
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
