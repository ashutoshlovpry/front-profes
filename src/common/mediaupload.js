import React from 'react';
import {google}  from 'googleapis';

// Function to upload media to Google Drive
export const uploadToDrive = async (file) => {
  try {
    // Load the credentials JSON file
    const credentials = require('../falt/google.json');

    // Set up OAuth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const authClient = await auth.getClient();

    // Create a new Google Drive instance
    const drive = google.drive({ version: 'v3', auth: authClient });

    // Upload the file to Google Drive
    const res = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
      },
      media: {
        mimeType: file.type,
        body: file,
      },
    });

    console.log('File uploaded:', res.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Example usage
// const FileUploadComponent = () => {
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     uploadToDrive(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//     </div>
//   );
// };

// export default FileUploadComponent;
