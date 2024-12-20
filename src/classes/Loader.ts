type Image = {
  image: HTMLImageElement,
  path: string
}

type LoaderArguments = {
  onLoad: () => void
  images: Image[],
  tiles: Image[],
}

export class Loader {
  private count: number;
  private onLoad: () => void;

  private images: Image[];
  private tiles: Image[];

  constructor({ onLoad, images, tiles }: LoaderArguments) {
    this.onLoad = onLoad;
    this.count = images.length;

    this.images = images;
    this.tiles = tiles;
  }

  load() {
    for (const image of this.images) {
      this.beginLoadingImages(image.image, image.path);
    }

    for (const tile of this.tiles) {
      this.beginLoadingImages(tile.image, tile.path);
    }
  }

  private countLoadedImages() {
    this.count--;
    if (this.count == 0) {
      this.onLoad();
    }
  }

  private beginLoadingImages(image: HTMLImageElement, fileName: string) {
    image.onload = this.countLoadedImages.bind(this);
    image.src = "assets/images/" + fileName;
  }
}
