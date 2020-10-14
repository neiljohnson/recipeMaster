export class Product {
  name: string;
  displayName: string;
  imageUrl: string;
  metadata: {
    category: string; storing: {
      pantry: {
        metric: string; min: number; max: number;
      }; defaultLocation: string; fridge?: undefined; freezer?: undefined;
    };
  };
  nounForm: string;
}
