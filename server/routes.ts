import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const category = req.query.category as string;
      const items = category ? 
        await storage.getPortfolioItemsByCategory(category) :
        await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getPortfolioItem(id);
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });

  // Case study routes
  app.get("/api/case-studies", async (req, res) => {
    try {
      const studies = await storage.getCaseStudies();
      res.json(studies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const study = await storage.getCaseStudy(id);
      if (!study) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(study);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  app.get("/api/portfolio/:id/case-study", async (req, res) => {
    try {
      const portfolioItemId = parseInt(req.params.id);
      const study = await storage.getCaseStudyByPortfolioItem(portfolioItemId);
      if (!study) {
        return res.status(404).json({ message: "Case study not found for this portfolio item" });
      }
      res.json(study);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
