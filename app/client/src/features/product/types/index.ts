export interface Product {
    _id?: number;
    name: string;
    brand: string;
    type: BeerType;
    alcoholContent: number;
    volume: number;
    price: number;
    description: string;
    imageUrl: string;
    stockLevel: number;
    createdAt: Date;
}
enum BeerType {
    Lager = 'Lager',
    Ale = 'Ale',
    IPA = 'IPA',
  }

  export interface ProductParams {
    term?: string;
    name?: string;
    brand?: string;
    type?: string;
    volume?: number;
    price?: number;
    alcoholContent?: number;
    sort?: string;
  }