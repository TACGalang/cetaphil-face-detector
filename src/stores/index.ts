import { create } from "zustand";

// Define the type for an image
type Image = string; // Replace `string` with the actual type if it differs (e.g., URL or Blob)

// Define the store's state and actions
type ImageStore = {
	images: Image[];
	addImage: (newImage: Image) => void;
	removeImage: (index: number) => void;
	clearImages: () => void;
};

// Create the Zustand store with TypeScript types
export const useStore = create<ImageStore>((set) => ({
	images: [],

	// Add an image with a maximum of 3
	addImage: (newImage: Image) =>
		set((state: ImageStore) => {
			if (state.images.length < 3) {
				return { images: [...state.images, newImage] };
			}
			return state; // Do nothing if already at limit
		}),

	// Remove an image by index
	removeImage: (index: number) =>
		set((state: ImageStore) => ({
			images: state.images.filter((_, i) => i !== index),
		})),

	// Clear all images
	clearImages: () => set({ images: [] }),
}));
