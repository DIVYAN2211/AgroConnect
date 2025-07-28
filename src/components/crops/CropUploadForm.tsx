import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export const CropUploadForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: 'grains',
    location: '',
    images: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically make an API call to save the product
      const newProduct = {
        ...formData,
        id: `crop${Date.now()}`,
        farmerId: user?.id || '',
        farmerName: user?.name || '',
        createdAt: new Date(),
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      };

      // Add to your products array or make API call
      console.log('New product:', newProduct);
      
      toast.success('Crop uploaded successfully!');
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        unit: 'kg',
        category: 'grains',
        location: '',
        images: []
      });
    } catch (error) {
      toast.error('Failed to upload crop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Your Crop</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Crop Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price per Unit (₹)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity">Available Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={formData.unit}
              onValueChange={(value) => setFormData({ ...formData, unit: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                <SelectItem value="quintal">Quintal</SelectItem>
                <SelectItem value="ton">Ton</SelectItem>
                <SelectItem value="bag">Bag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="pulses">Pulses</SelectItem>
                <SelectItem value="oilseeds">Oilseeds</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="images">Upload Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              // Handle image uploads here
              // This is a simplified version - you'd typically upload to a storage service
              const files = e.target.files;
              if (files) {
                const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
                setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
              }
            }}
          />
          {formData.images.length > 0 && (
            <div className="mt-2 flex gap-2">
              {formData.images.map((url, index) => (
                <img key={index} src={url} alt="Preview" className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Crop'}
      </Button>
    </form>
  );
}; 