import React, { useState } from 'react';
import Axios from 'axios';
import './Dashboardprop.css'

const Dashboardp = () => {
  const [allowedFileTypes] = useState(['image/png', 'image/jpeg', 'image/jpg']);
  const [isUploading, setIsUploading] = useState(false);
  const [display, setDisplay] = useState('');
  const [uploadedID, setUploadedID] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [propName, setPropName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [category, setCategory] = useState('Accessories');
  const [colors, setColors] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    // Filter and store only the allowed file types
    const selectedFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );
    setSelectedFiles(selectedFiles);
  };
  
  const getCategoryCode = () => {
    switch (category) {
      case 'Clothing':
        return 'PMC0001';
      case 'Accessories':
        return 'PMC0002';
      case 'Jewelleries':
        return 'PMC0003';
      case 'Furniture':
        return 'PMC0004';
      case 'Electronics':
        return 'PMC0005';
      case 'Plants':
        return 'PMC0006';
      case 'Books':
        return 'PMC0007';
      case 'Toys':
        return 'PMC0008';
      case 'Decor':
        return 'PMC0009';
      case 'Kitchen':
        return 'PMC0010';
      case 'Blocks':
        return 'PMC0011';
      case 'Flooring':
        return 'PMC0012';
      case 'Stones':
        return 'PMC0013';
      case 'Furnishings':
        return 'PMC0014';
      default:
        return '';
    }
  };

  

 

  const handleColorChange = (event) => {
    const colorValue = event.target.value;
    setColors(colorValue) 
  };
  const renderColorCheckbox = (color) => {
    const isChecked = colors.includes(color);

    const handleColorCheckboxChange = () => {
      handleColorChange({ target: { value: color } });
    };

    return (
      <label className='color-dpx' key={color}>
        <div
          className={`color-square ${isChecked ? 'checked' : ''} ${color.toLowerCase()}`}
          onClick={handleColorCheckboxChange}
        ></div>
        {color}
      </label>
    );
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsUploading(true);
    
   
    const apiUrl = `https://propmanagerbackend.azurewebsites.net/api/Props_upload?Prop_type=P001&Prop_name=${propName}&Studio_name=${studioName}&Category=${getCategoryCode()}&Dimension=''&Texture=''&Print=''&Color=${colors}`

    // Create an array of FormData objects for each file
    const formDataArray = selectedFiles.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      return formData;
    });

    try {
      setIsUploading(true);

      // Send all the files to the backend in parallel using Promise.all
      const responseArray = await Promise.all(
        formDataArray.map(formData => Axios.post(apiUrl, formData))
      );

      // Assuming the API returns an object with an "id" property for each file
      const uploadedIDs = responseArray.map(response => response.data);

      setUploadedID(uploadedIDs);
      setDisplay("Files uploaded successfully!");
      setTimeout(() => {
        setDisplay("");
      }, 3000);
      // Handle success scenario, such as showing a success message to the user
    } catch (error) {
      setDisplay("File upload failed!");
      // Handle specific error scenarios based on the response status and data
    } finally {
      setIsUploading(false);
    }
  };
    
 

  return (
    <div className='dashboardprop'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="propName">Prop Name:</label>
        <input
          type="text"
          id="propName"
          name="propName"
          value={propName}
          onChange={(e) => setPropName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="studioName">Studio Name:</label>
        <select
          id="studioName"
          name="studioName"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
          required
        >
          <option value="">Select Studio Name</option>
          <option value="STUDIO001">Ekam, Bangalore</option>
          {/* Add more options for other studio names */}
        </select>
        <br />
        <label>Category:</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Jewelleries">Jewelleries</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Plants">Plants</option>
          <option value="Books">Books</option>
          <option value="Toys">Toys</option>
          <option value="Decor">Decor</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Blocks">Blocks</option>
          <option value="Flooring">Flooring</option>
          <option value="Stones">Stones</option>
          <option value="Furnishings">Furnishings</option>
        </select>
        <br />
        <label>Colors:</label>
        <br />
        <div className='color-dp'>
          {renderColorCheckbox('BLACK')}
          {renderColorCheckbox('WHITE')}
          {renderColorCheckbox('RED')}
          {renderColorCheckbox('BLUE')}
          {renderColorCheckbox('GREEN')}
          {renderColorCheckbox('YELLOW')}
          {renderColorCheckbox('PINK')}
          {renderColorCheckbox('PURPLE')}
          {renderColorCheckbox('ORANGE')}
          {renderColorCheckbox('BROWN')}
          {renderColorCheckbox('GOLD')}
          {renderColorCheckbox('SILVER')}
          {renderColorCheckbox('GREY')}
          {renderColorCheckbox('MULTICOLOURED')}
          {renderColorCheckbox('TRANSPARENT')}
        </div>
        
    
      
        <br />

        <label htmlFor="fileUpload">Upload Files:</label>
        <br />
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          multiple
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')}
          required
        />
        <br />
        {uploadedID && (
          <p className="design">Media Uploaded! Registered media ID {uploadedID}</p>
        )}
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
