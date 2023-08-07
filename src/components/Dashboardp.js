import React, { useState } from 'react';
import axios from 'axios';

const Dashboardp = () => {
  const [allowedFileTypes] = useState(['image/png', 'image/jpeg', 'image/jpg']);
  const [isUploading, setIsUploading] = useState(false);
  const [display, setDisplay] = useState('');
  const [uploadedID, setUploadedID] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    // Filter and store only the allowed file types
    const selectedFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );
    setSelectedFiles(selectedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUploading(true);
    // Retrieve form values
    const form = event.target;
    const formData = new FormData(form);

    // Add any additional form data if needed
    formData.append('additionalField', 'additionalValue');

    // Append selected files to formData
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Make the POST request using Axios
    axios
      .post('https://propmanagerbackend.azurewebsites.net/api/Props_upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Add any other Axios configurations if required
      })
      .then((response) => {
        // Handle successful response
        console.log('Upload successful:', response.data);
        // Set the uploadedID state with the media ID received from the server
        setUploadedID(response.data.mediaId);
      })
      .catch((error) => {
        // Handle error
        console.error('Upload failed:', error);
        // Optionally, set an error message to display on the UI
        setDisplay('Upload failed. Please try again later.');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
   
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Form Dimensions</h2>
        <label>
          <input type="radio" name="form-dimension" value="small" />
          Small
        </label>
        <label>
          <input type="radio" name="form-dimension" value="table-top" />
          Table Top
        </label>
        <label>
          <input type="radio" name="form-dimension" value="full-blown" />
          Full Blown
        </label>

        <h2>Texture</h2>
        <label>
          <input type="radio" name="texture" value="textured" />
          Textured
        </label>
        <label>
          <input type="radio" name="texture" value="non-textured" />
          Non-Textured
        </label>

        <h2>Print</h2>
        <label>
          <input type="radio" name="print" value="solid" />
          Solid
        </label>
        <label>
          <input type="radio" name="print" value="printed" />
          Printed
        </label>

        <h2>Color</h2>
        <label>
          <input type="checkbox" name="color" value="black" />
          Black
        </label>
        <label>
          <input type="checkbox" name="color" value="blue" />
          Blue
        </label>
        <label>
          <input type="checkbox" name="color" value="red" />
          Red
        </label>
        <label>
          <input type="checkbox" name="color" value="multicolored" />
          Multicolored
        </label>
        <label htmlFor="fileUpload">Upload Files:</label>
        <br />
        {/* Replace the single file input with a multiple file input */}
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          multiple
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')}
        />
        <br />
        {uploadedID && (
          <p className="design">Media Uploaded! Registered media ID {uploadedID}</p>
        )}{' '}
        {/* Displaying the uploaded ID */}
        <br />
        {display && <p className="design diff ">{display}</p>}
        <br />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>

      {isUploading && (
        <div className="upload-overlay">
          <div className="upload-spinner"></div>
          <p className="upload-message ">Uploading file...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboardp;
