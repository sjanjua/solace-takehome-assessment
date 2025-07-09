import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
} from "drizzle-orm/pg-core"

const advocatesTable = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("specialties").$type<string[]>().default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp('createdAt', { mode: 'string' }).notNull().defaultNow(),
})

export { advocatesTable }
