import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init21684261286452 implements MigrationInterface {
  name = 'Init21684261286452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vouchers" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "is_used" boolean, "expire_at" TIMESTAMP, "used_at" TIMESTAMP, "userId" integer, "offerId" integer, CONSTRAINT "UQ_efc30b2b9169e05e0e1e19d6dd6" UNIQUE ("code"), CONSTRAINT "PK_ed1b7dd909a696560763acdbc04" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9cd97f49480761f2788d0edc1b" ON "vouchers" ("userId", "offerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "offers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "discount_percentage" numeric NOT NULL, CONSTRAINT "UQ_f34d2ed1cd905ff6c3e30f62a1d" UNIQUE ("name"), CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vouchers" ADD CONSTRAINT "FK_0492799cd14fae511b856c8984a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vouchers" ADD CONSTRAINT "FK_d82da7afdfd8005eccce475d1b8" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vouchers" DROP CONSTRAINT "FK_d82da7afdfd8005eccce475d1b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vouchers" DROP CONSTRAINT "FK_0492799cd14fae511b856c8984a"`,
    );
    await queryRunner.query(`DROP TABLE "offers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9cd97f49480761f2788d0edc1b"`,
    );
    await queryRunner.query(`DROP TABLE "vouchers"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
