import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
// import "reflect-metadata"; // for using TypeORM, see https://www.npmjs.com/package/typeorm#installation

@Entity()
export default class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  puid: string;

  @Column("text")
  title: string;
}
