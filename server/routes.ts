import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const category = req.query.category as string;
      const skills = category ? 
        await storage.getSkillsByCategory(category) :
        await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Experience routes
  app.get("/api/experience", async (req, res) => {
    try {
      const experience = await storage.getExperience();
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  app.get("/api/experience/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const exp = await storage.getExperienceById(id);
      if (!exp) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(exp);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const projects = featured ? 
        await storage.getFeaturedProjects() :
        await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Education routes
  app.get("/api/education", async (req, res) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education" });
    }
  });

  // Certifications routes
  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
