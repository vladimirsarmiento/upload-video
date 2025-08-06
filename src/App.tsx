import { useState, useRef, ChangeEvent } from "react";

// Define el tipo para el estado del archivo seleccionado
type VideoFile = File | null;

const App: JSX.Element = () => {
  const [selectedFile, setSelectedFile] = useState<VideoFile>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  // Crea una ref para el input de tipo archivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para manejar la selección del archivo
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setVideoPreviewUrl(fileURL);
      setFileName(`Archivo seleccionado: ${file.name}`);
    } else {
      setSelectedFile(null);
      setVideoPreviewUrl("");
      setFileName("");
    }
  };

  // Función para limpiar la selección
  const handleClear = (): void => {
    setSelectedFile(null);
    setVideoPreviewUrl("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Resetea el input de archivo
    }
  };

  // Función para simular la subida del video
  const handleUpload = (): void => {
    if (selectedFile) {
      // Aquí iría la lógica para subir el video a un servidor.
      console.log(`Simulando subida del archivo: ${selectedFile.name}`);
      // En una aplicación real usarías un modal personalizado o un Toast
      alert(`Video "${selectedFile.name}" listo para procesar.`);
    } else {
      alert("Por favor, selecciona un video primero.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cargar Video
        </h2>

        <div className="mb-6">
          <label
            htmlFor="video-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Selecciona un archivo de video:
          </label>
          <div
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 transition-colors duration-200"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <div className="pl-1 font-semibold">
                  <span className="text-blue-700">
                    Haz clic para selecionar
                  </span>
                  <span> o arrastra y suelta</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                MP4, MOV, AVI, etc. (hasta 100MB)
              </p>
            </div>
          </div>
          {/* El ref se asocia al input de tipo archivo */}
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        {videoPreviewUrl && (
          <div id="video-preview-container" className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Vista previa:
            </p>
            <video
              id="video-preview"
              controls
              src={videoPreviewUrl}
              className="w-full h-auto rounded-lg border border-gray-300 shadow-sm"
            ></video>
            <p id="file-name" className="mt-2 text-sm text-gray-600 truncate">
              {fileName}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleClear}
            className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-2xl hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Limpiar
          </button>
          <button
            // selectedFile = Null -> !selectedFile = true
            // selectedFile = File -> !selectedFile = false
            disabled={!selectedFile}
            onClick={handleUpload}
            className={`w-full sm:w-auto px-4 py-2 text-white rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 
              
              ${
                !selectedFile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Subir Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
