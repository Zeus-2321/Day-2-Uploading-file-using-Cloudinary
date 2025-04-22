import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/files/upload", formData);
      setImageUrl(res.data.url);
      setError("");
    } catch (error) {
      setError("Upload failed. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>{loading ? "Uploading..." : "Upload"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <p>Uploaded: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>)}
    </div>
  );
};

export default FileUpload;
