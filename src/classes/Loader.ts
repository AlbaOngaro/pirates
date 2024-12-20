export type LoaderImage = {
  image: HTMLImageElement,
  path: string
}

export type LoaderFonts = {
  name: string;
  path: string;
}

type LoaderArguments = {
  images: LoaderImage[],
  tiles: LoaderImage[],
  fonts: LoaderFonts[]
}

export class Loader {
  private images: LoaderImage[];
  private tiles: LoaderImage[];
  private fonts: LoaderFonts[];

  constructor({ images, tiles, fonts }: LoaderArguments) {
    this.images = images;
    this.tiles = tiles;
    this.fonts = fonts;
  }

  async load() {
    await Promise.all([
      ...this.images.map(({ image, path }) => this.beginLoadingImages(image, path)),
      ...this.tiles.map(({ image, path }) => this.beginLoadingImages(image, path)),
      ...this.fonts.map(({ name, path }) => new FontFace(name, `url(${path})`).load())
    ]);
  }

  private async beginLoadingImages(image: HTMLImageElement, fileName: string) {
    return new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject();
      image.src = "assets/images/" + fileName;
    })
  }
}
