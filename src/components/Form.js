import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./formstyles.css";

export default function Form() {
  const [portfolio, setPortfolio] = useState("");
  const [services, setServices] = useState("");
  const [shootType, setShootType] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allowedFileTypes, setAllowedFileTypes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [display, setDisplay] = useState("");
  const [uploadedID, setUploadedID] = useState("");
  const [files, setFiles] = useState([]); // Add this line

  useEffect(() => {
    const categoryTypeMap = {
      'Fashion (Clothing)': 'SS0001',
      'Jewellery': 'SS0002',
      'Cosmetics & Skin Care': 'SS0003',
      'Home Decor': 'SS0004',
      'Footwear': 'SS0005',
      'Accessories': 'SS0006',
      'Electronics/Tech': 'SS0007',
      'Home / Kitchen Appliances': 'SS0008',
      'Food & Packaged Food -': 'SS0009',
      'Furniture': 'SS0010',
      'Education': 'SS0011',
      'Personal Portfolio': 'SS0012',
      'Pet Products': 'SS0013',
      'Toys, Games & Sports Goods': 'SS0014'
    };

    const categoryOptions = Object.keys(categoryTypeMap);
    setCategories(categoryOptions);
  }, []);

  useEffect(() => {
    if (portfolio === "studio") {
      setAllowedFileTypes([".jpeg", ".jpg", ".png", ".mp4"]);
    } else {
      setAllowedFileTypes([".jpeg", ".jpg", ".png"]);
    }
  }, [portfolio]);

  const GenerateAPIUrl = (categoryType, serviceType, shootType) => {
    const baseUrl = 'https://portfolioimagesearcher.azurewebsites.net/api/PortfolioUpload?';
    const params = new URLSearchParams();
    const categoryTypeMap = {
      'Fashion (Clothing)': 'SS0001',
      'Jewellery': 'SS0002',
      'Cosmetics & Skin Care': 'SS0003',
      'Home Decor': 'SS0004',
      'Footwear': 'SS0005',
      'Accessories': 'SS0006',
      'Electronics/Tech': 'SS0007',
      'Home / Kitchen Appliances': 'SS0008',
      'Food & Packaged Food -': 'SS0009',
      'Furniture': 'SS0010',
      'Education': 'SS0011',
      'Personal Portfolio': 'SS0012',
      'Pet Products': 'SS0013',
      'Toys, Games & Sports Goods': 'SS0014'
    };
    const serviceTypeMap = {
      'Photoshoot': 'PS01',
      'Videoshoot': 'VS01',
      'Web Design': 'WD01',
      'Landing Pages': 'LP01',
      'Amazon Store': 'AS01',
      'Amazon A+': 'AA01',
      'Packaging Design': 'PD01',
      'Digital Creatives': 'DC01',
      'Product Description': 'PD02',
      'Web Content': 'WC02',
      'Catalog Listing': 'CL02'
    };

    const shootTypeMap = {
      'Catalog': 'CA01',
      'Lifestyle': 'LI01',
      'Concept': 'CO01',
      'Editorial': 'ED01'
    };

    const categoryCode = categoryTypeMap[categoryType] || '';
    const serviceCode = serviceTypeMap[serviceType] || '';
    const shootCode = shootTypeMap[shootType] || '';

    params.append('Service_type', serviceCode);
    params.append('Shoot_type', shootCode);
    params.append('Category', categoryCode);

    const apiUrl = baseUrl + params.toString();

    return apiUrl;
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    // Check if any files are selected
    if (files.length === 0) {
      alert("Please select one or more files to upload.");
      return;
    }

    // Validate other fields as before
    if (!portfolio) {
      alert("Please select a portfolio.");
      return;
    }

    if (
      portfolio === "studio" &&
      (!services || !shootType || !selectedCategory)
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (portfolio === "design" && (!services || !selectedCategory)) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (portfolio === "writing" && (!services || !selectedCategory)) {
      alert("Please fill in all the required fields.");
      return;
    }

    const allowedFileTypes = portfolio === "studio"
      ? [".jpeg", ".jpg", ".png", ".mp4"]
      : [".jpeg", ".jpg", ".png"];

    // Iterate through the files and check their extensions
    for (const file of files) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedFileTypes.includes("." + fileExtension)) {
        alert(
          `Invalid file type. Please select ${allowedFileTypes.join(", ")} file(s).`
        );
        return;
      }
    }

    const apiUrl = GenerateAPIUrl(selectedCategory, services, shootType);

    // Create an array of FormData objects for each file
    const formDataArray = files.map(file => {
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

  const handleFileChange = (event) => {
    // Get the selected files from the input element
    const selectedFiles = event.target.files;
    // Convert the FileList object to an array and update the state
    setFiles(Array.from(selectedFiles));
  };

  const handlePortfolioChange = (event) => {
    const selectedPortfolio = event.target.value;
    setPortfolio(selectedPortfolio);
    setServices("");
    setShootType("");
  };

  const handleServicesChange = (event) => {
    const selectedServices = event.target.value;
    setServices(selectedServices);
  };

  const handleShootTypeChange = (event) => {
    const selectedShootType = event.target.value;
    setShootType(selectedShootType);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <label htmlFor="portfolioDropdown">Select Portfolio:</label>
        <br />
        <select
          id="portfolioDropdown"
          name="portfolioDropdown"
          value={portfolio}
          onChange={handlePortfolioChange}
        >
          <option value="" disabled selected hidden>
            Portfolio
          </option>
          <option value="studio">Studio</option>
          <option value="design">Design</option>
          <option value="writing">Writing</option>
        </select>
        <br />

        {portfolio && (
          <>
            {portfolio === "studio" && (
              <>
                <label htmlFor="shootTypeDropdown">Select Shoot Type:</label>
                <br />
                <select
                  id="shootTypeDropdown"
                  name="shootTypeDropdown"
                  value={shootType}
                  onChange={handleShootTypeChange}
                >
                  <option value="" disabled selected hidden>
                    Shoot Type
                  </option>
                  <option value="Catalog">Catalog</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Concept">Concept</option>
                  <option value="Editorial">Editorial</option>
                </select>
                <br />
              </>
            )}

            <label htmlFor="servicesDropdown">Select Services:</label>
            <br />
            <select
              id="servicesDropdown"
              name="servicesDropdown"
              value={services}
              onChange={handleServicesChange}
            >
              <option value="" disabled selected hidden>
                Services
              </option>
              {portfolio === "studio" && (
                <>
                  <option value="Photoshoot">Photoshoot</option>
                  <option value="Videoshoot">Videoshoot</option>
                </>
              )}
              {portfolio === "design" && (
                <>
                  <option value="Web Design">Web Design</option>
                  <option value="Landing Pages">Landing Pages</option>
                  <option value="Amazon Store">Amazon Store</option>
                  <option value="Amazon A+">Amazon A+</option>
                  <option value="Packaging Design">Packaging Design</option>
                  <option value="Digital Creatives">Digital Creatives</option>
                </>
              )}
              {portfolio === "writing" && (
                <>
                  <option value="Product Description">Product Description</option>
                  <option value="Web Content">Web Content</option>
                  <option value="Catalog Listing">Catalog Listing</option>
                </>
              )}
            </select>
            <br />

            <label htmlFor="categoryDropdown">Select Category:</label>
            <br />
            <select
              id="categoryDropdown"
              name="categoryDropdown"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled selected hidden>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="fileUpload">Upload Files:</label>
            <br />
            {/* Replace the single file input with a multiple file input */}
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              multiple
              onChange={handleFileChange}
              accept={allowedFileTypes.join(",")}
            />
            <br />
            {uploadedID && <p className="design">Media Uploaded! Registered media ID {uploadedID}</p>} {/* Displaying the uploaded ID */}
            <br/>
            {display && <p className="design diff ">{display}</p>}
            
            
            <br/>
            <button type="submit" className="upload-button">
              Upload
            </button>
          </>
        )}

        {isUploading && (
          <div className="upload-overlay">
            <div className="upload-spinner"></div>
            <p  className="upload-message ">Uploading file...</p>
          </div>
        )}
      </form>
    </div>
  );
}
