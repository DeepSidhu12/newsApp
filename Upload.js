import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('File uploaded successfully');
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;
