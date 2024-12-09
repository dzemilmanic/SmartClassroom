import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import OpenAI from "openai"; // Ensure you have installed the OpenAI client
import "./ImageUploader.css";
import Loader from "../../components/Loader/Loader";
const ImageUploader = () => {
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;

    setLoading(true);

    try {
      const endpoint = "https://models.inference.ai.azure.com";
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Ensure this is set correctly
      const openai = new OpenAI({
        apiKey: GITHUB_TOKEN,
        dangerouslyAllowBrowser: true,
        baseURL: endpoint,
      });

      // Convert the image to a Data URL
      const imageDataUrl = await convertToBase64(image);

      // Prepare the request payload
      const result = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Ti si korisni asistent koji treba da opisuje slike.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Koja je ovo slika ?" },
              {
                type: "image_url",
                image_url: {
                  url: imageDataUrl,
                  details: "low",
                },
              },
            ],
          },
        ],
        model: "gpt-4o-mini", 
      });

      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error("Error prilikom potvrdjivanja slike:", error);
      setResponse("Error se desio prilikom odgovora od OpenAI.");
    } finally {
      setLoading(false);
    }
  };

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="image-uploader-container">
      <h1 className="image-uploader-heading" style={{marginTop:"10%"}}>Uvezite sliku koju treba analizirati</h1>
      <form className="image-uploader-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="image-uploader-input"
        />
        {loading ? <Loader /> : <button style={{marginBottom:"10%"}} type="submit" className="image-uploader-button" disabled={loading}>
          {loading ? "Sacekajte..." : "Potrvrdi"}
        </button>}
      </form>
      {response && (
        <div className="image-uploader-response-container">
          <h2 className="image-uploader-response-heading">Odgovor:</h2>
          <p className="image-uploader-response-text">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
