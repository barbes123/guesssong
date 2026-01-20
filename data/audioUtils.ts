// ==================== CLOUDINARY CONFIGURATION ====================
const CLOUD_NAME = 'dihujgmwe';
const BASE_URL_CLOUD = 'https://res.cloudinary.com';
const CLOUDINARY_BASE = `${BASE_URL_CLOUD}/${CLOUD_NAME}/video/upload`;
const OPTIMIZATIONS = 'f_mp3';

// Helper function to generate Cloudinary URLs WITH VERSION
const cloudinaryUrl = (publicId: string, version = 'v1768571922') => {
  return `${CLOUDINARY_BASE}/${OPTIMIZATIONS}/${version}/${publicId}.mp3`;
};

// Helper to choose between Cloudinary or local file
export const audioUrl = (cloudinaryId: string, localPath: string, version = 'v1768571922') => {
  return cloudinaryId ? cloudinaryUrl(cloudinaryId, version) : localPath;
};
