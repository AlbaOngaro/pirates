type DrawBitmatCroppedWithRotationOptions = {
  x: number;
  y: number;
  image: HTMLImageElement;
  angle: number;
  cropX: number;
};

export function drawBitmapCroppedWithRotation(
  ctx: CanvasRenderingContext2D,
  { x, y, image, angle, cropX }: DrawBitmatCroppedWithRotationOptions
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.drawImage(
    image,
    cropX,
    0,
    image.width / 2,
    image.height,
    -image.width / 4,
    -image.height / 2,
    image.width / 2,
    image.height
  );
  ctx.restore();
}

type DrawBitmapCenteredWithRotationOptions = {
  x: number;
  y: number;
  image: HTMLImageElement;
  angle: number;
};

export function drawBitmapCenteredWithRotation(
  ctx: CanvasRenderingContext2D,
  { x, y, image, angle }: DrawBitmapCenteredWithRotationOptions
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.restore();
}

type DrawCenteredImageOptions = {
  x: number;
  y: number;
  image: HTMLImageElement;
};

export function drawCenteredImage(
  ctx: CanvasRenderingContext2D,
  { x, y, image }: DrawCenteredImageOptions
) {
  ctx.drawImage(image, x - image.width / 2, y - image.height / 2);
}

type ColorRectOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
};

export function colorRect(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, fillColor }: ColorRectOptions
) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, height);
}

type ColorRectWithStrokeOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
};

export function strokeRect(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, strokeColor, strokeWidth }: ColorRectWithStrokeOptions
) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.strokeRect(x, y, width, height);
}

type ColorCircleOptions = {
  x: number;
  y: number;
  radius: number;
  fillColor: string;
};

export function colorCircle(
  ctx: CanvasRenderingContext2D,
  { x, y, radius, fillColor }: ColorCircleOptions
) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
}

type ColorTextOptions = {
  alignment: CanvasTextAlign;
  fontDetails: string;
  fillColor: string;
  text: string;
  x: number;
  y: number;
};

export function colorText(
  ctx: CanvasRenderingContext2D,
  { alignment, fontDetails, fillColor, text, x, y }: ColorTextOptions
) {
  ctx.textAlign = alignment;
  ctx.font = fontDetails;
  ctx.fillStyle = fillColor;
  ctx.fillText(text, x, y);
}
