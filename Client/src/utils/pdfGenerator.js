import html2pdf from 'html2pdf.js';

export const generatePDF = (checkup) => {
  // Create a wrapper div
  const wrapper = document.createElement('div');
  wrapper.style.padding = '20px';
  wrapper.style.fontFamily = 'Arial, sans-serif';
  
  // Add header
  const header = document.createElement('div');
  header.innerHTML = `
    <h1 style="color: #1a38e4; text-align: center; margin-bottom: 20px;">Dental Checkup Report</h1>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <p><strong>Patient:</strong> ${checkup.patient.name}</p>
        <p><strong>Email:</strong> ${checkup.patient.email}</p>
      </div>
      <div>
        <p><strong>Dentist:</strong> ${checkup.dentist.name}</p>
        <p><strong>Date:</strong> ${new Date(checkup.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <hr style="margin: 20px 0;" />
  `;
  wrapper.appendChild(header);
  
  // Add checkup details
  const details = document.createElement('div');
  details.innerHTML = `
    <h2 style="color: #1a38e4; margin-bottom: 10px;">Checkup Details</h2>
    <p><strong>Status:</strong> ${checkup.status}</p>
    <p><strong>Request Date:</strong> ${new Date(checkup.requestDate).toLocaleDateString()}</p>
    ${checkup.completionDate ? `<p><strong>Completion Date:</strong> ${new Date(checkup.completionDate).toLocaleDateString()}</p>` : ''}
    <div style="margin: 20px 0;">
      <h3 style="color: #0284c7; margin-bottom: 10px;">Dentist Notes</h3>
      <p style="padding: 10px; background-color: #f0f9ff; border-radius: 4px;">${checkup.notes || 'No notes provided'}</p>
    </div>
  `;
  wrapper.appendChild(details);
  
  // Add images section if there are any
  if (checkup.images && checkup.images.length > 0) {
    const imagesSection = document.createElement('div');
    imagesSection.innerHTML = `
      <h2 style="color: #1a38e4; margin: 20px 0 10px;">Checkup Images</h2>
    `;
    
    const imagesContainer = document.createElement('div');
    imagesContainer.style.display = 'flex';
    imagesContainer.style.flexDirection = 'column';
    imagesContainer.style.gap = '20px';
    
    checkup.images.forEach((image, index) => {
      const imageBox = document.createElement('div');
      imageBox.style.marginBottom = '20px';
      imageBox.style.border = '1px solid #e5e7eb';
      imageBox.style.borderRadius = '8px';
      imageBox.style.overflow = 'hidden';
      
      imageBox.innerHTML = `
        <h3 style="color: #0284c7; padding: 10px; background-color: #f0f9ff; margin: 0;">Image ${index + 1}</h3>
        <div style="padding: 10px;">
          <img src=${image.url} alt="Checkup image ${index + 1}" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;" />
          <div style="padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <p><strong>Notes:</strong> ${image.notes || 'No notes for this image'}</p>
            <p><strong>Uploaded:</strong> ${new Date(image.uploadedAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;
      
      imagesContainer.appendChild(imageBox);
    });
    
    imagesSection.appendChild(imagesContainer);
    wrapper.appendChild(imagesSection);
  }
  
  // Add footer
  const footer = document.createElement('div');
  footer.innerHTML = `
    <hr style="margin: 20px 0;" />
    <p style="text-align: center; color: #6b7280; font-size: 12px;">
      This report was generated on ${new Date().toLocaleString()} from the Dental Checkup System.
    </p>
  `;
  wrapper.appendChild(footer);
  
  // Generate PDF
  const opt = {
    margin: 10,
    filename: `dental_checkup_${checkup._id}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2,useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  const loadImages = (wrapper) =>
    Promise.all(
      Array.from(wrapper.querySelectorAll('img')).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  
  loadImages(wrapper).then(() => {
    html2pdf().set(opt).from(wrapper).save();
  });
};