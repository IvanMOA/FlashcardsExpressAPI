import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column("integer")
  stock: number;

  @Column()
  price: number;
}

export { Item };
