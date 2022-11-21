import Upload from "../Upload/Upload";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <p className="title"> GIS-app</p>
      <Upload />
    </div>
  );
}
