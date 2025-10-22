import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-pdf', {
        name,
        email,
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
      link.click();

      setPdfGenerated(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>PDF Generator</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button className="button" onClick={handleGeneratePdf}>Generate PDF</button>
      </form>
      {pdfGenerated && <p>PDF generated successfully!</p>}
    </div>
  );
}

export default App;