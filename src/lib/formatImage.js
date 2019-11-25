export function formatImage(image, width, height) {
  return image.replace("_W_", width).replace("_H_", height);
}
