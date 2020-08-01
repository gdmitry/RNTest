export interface PictureDetailsResponse {
  imageId: string;
  hiResImage: HiResImage;
}

export interface ErrorResponse {
  errorMessage: string;
}

export type Picture = {
  id: string;
  cropped_picture: string;
};

export type HiResImage = {
  id: string;
  author: string;
  camera: string;
  cropped_picture: string;
  full_picture: string;
};

export interface PicturesResponse {
  pictures: Array<Picture>;
  page: number;
}

export interface HiResImageResponse {
  imageId: string;
  hiResImage: HiResImage;
}
