import React, { useState, useEffect } from 'react';
import { Upload, Save, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleFileSelect = (productId, event) => {
    const file = event.target.files[0];
    setSelectedFile(prev => ({
      ...prev,
      [productId]: file
    }));
  };

  const uploadImage = async (productId) => {
    const file = selectedFile[productId];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadStatus(prev => ({
      ...prev,
      [productId]: 'uploading'
    }));

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const updatedProduct = await response.json();
      setProducts(products.map(p => 
        p._id === productId ? updatedProduct : p
      ));
      
      setUploadStatus(prev => ({
        ...prev,
        [productId]: 'success'
      }));

      // Clear status after 3 seconds
      setTimeout(() => {
        setUploadStatus(prev => ({
          ...prev,
          [productId]: null
        }));
      }, 3000);

    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(prev => ({
        ...prev,
        [productId]: 'error'
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading': return 'text-blue-500';
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Product Image Management</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div key={product._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              
              <div className="aspect-square mb-4 bg-gray-700 rounded-lg overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileSelect(product._id, e)}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg text-sm text-center">
                    {selectedFile[product._id]?.name || 'Choose Image'}
                  </div>
                </div>

                <button
                  onClick={() => uploadImage(product._id)}
                  disabled={!selectedFile[product._id] || uploadStatus[product._id] === 'uploading'}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
                    ${selectedFile[product._id] ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700'} 
                    text-white transition-colors`}
                >
                  {uploadStatus[product._id] === 'uploading' ? (
                    <>
                      <Upload className="w-4 h-4 animate-bounce" />
                      Uploading...
                    </>
                  ) : uploadStatus[product._id] === 'success' ? (
                    <>
                      <Save className="w-4 h-4" />
                      Uploaded!
                    </>
                  ) : uploadStatus[product._id] === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Error
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}