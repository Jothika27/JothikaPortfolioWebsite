import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'web', 'mobile', 'branding', 'ui'
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull().default([]),
  colors: text("colors").array().notNull().default([]), // Color palette
  featured: boolean("featured").notNull().default(false),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull(),
  category: text("category").notNull(),
  metrics: jsonb("metrics").notNull(), // { metric: value, ... }
  content: text("content").notNull(), // Full case study content
  portfolioItemId: integer("portfolio_item_id").references(() => portfolioItems.id),
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({
  id: true,
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
