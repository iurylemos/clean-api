import { SavePurchases } from "@/domain/usecases";
import faker, { fake } from "faker";

export const mockPurchases = (): SavePurchases.Params[] => [
  {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    value: faker.datatype.number(),
  },
  {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    value: faker.datatype.number(),
  },
];
