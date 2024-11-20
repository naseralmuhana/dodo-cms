CREATE TABLE IF NOT EXISTS "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"created_at" timestamp (2) DEFAULT now() NOT NULL,
	"updated_at" timestamp (2) DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ingredients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp (2) DEFAULT now() NOT NULL,
	"updated_at" timestamp (2) DEFAULT now() NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name"),
	CONSTRAINT "ingredients_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients_sizes" (
	"ingredient_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	CONSTRAINT "ingredients_sizes_ingredient_id_size_id_pk" PRIMARY KEY("ingredient_id","size_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp (2) DEFAULT now() NOT NULL,
	"updated_at" timestamp (2) DEFAULT now() NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products_ingredients" (
	"product_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"is_base" boolean DEFAULT false NOT NULL,
	CONSTRAINT "products_ingredients_product_id_ingredient_id_is_base_pk" PRIMARY KEY("product_id","ingredient_id","is_base")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products_sizes_types" (
	"product_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"image_url" text NOT NULL,
	CONSTRAINT "products_sizes_types_product_id_size_id_type_id_pk" PRIMARY KEY("product_id","size_id","type_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sizes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sizes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"created_at" timestamp (2) DEFAULT now() NOT NULL,
	"updated_at" timestamp (2) DEFAULT now() NOT NULL,
	CONSTRAINT "sizes_name_unique" UNIQUE("name"),
	CONSTRAINT "sizes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"created_at" timestamp (2) DEFAULT now() NOT NULL,
	"updated_at" timestamp (2) DEFAULT now() NOT NULL,
	CONSTRAINT "types_name_unique" UNIQUE("name"),
	CONSTRAINT "types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients_sizes" ADD CONSTRAINT "ingredients_sizes_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients_sizes" ADD CONSTRAINT "ingredients_sizes_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_sizes_types" ADD CONSTRAINT "products_sizes_types_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_sizes_types" ADD CONSTRAINT "products_sizes_types_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_sizes_types" ADD CONSTRAINT "products_sizes_types_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredients_name_idx" ON "ingredients" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredients_slug_idx" ON "ingredients" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_name_idx" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_category_id_idx" ON "products" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sizes_name_idx" ON "sizes" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sizes_slug_idx" ON "sizes" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "types_name_idx" ON "types" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "types_slug_idx" ON "types" USING btree ("slug");