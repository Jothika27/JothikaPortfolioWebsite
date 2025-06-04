import { portfolioItems, caseStudies, type PortfolioItem, type InsertPortfolioItem, type CaseStudy, type InsertCaseStudy } from "@shared/schema";

export interface IStorage {
  // Portfolio Items
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: number): Promise<CaseStudy | undefined>;
  getCaseStudyByPortfolioItem(portfolioItemId: number): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
}

export class MemStorage implements IStorage {
  private portfolioItems: Map<number, PortfolioItem>;
  private caseStudies: Map<number, CaseStudy>;
  private currentPortfolioId: number;
  private currentCaseStudyId: number;

  constructor() {
    this.portfolioItems = new Map();
    this.caseStudies = new Map();
    this.currentPortfolioId = 1;
    this.currentCaseStudyId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Portfolio Items
    const portfolioData: InsertPortfolioItem[] = [
      {
        title: "E-commerce Platform",
        description: "Modern shopping experience with intuitive navigation and seamless checkout process.",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        colors: ["#3B82F6", "#10B981", "#8B5CF6"],
        featured: true,
      },
      {
        title: "Fitness Tracking App",
        description: "Comprehensive health and fitness tracking with personalized workout plans.",
        category: "mobile",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["React Native", "Firebase", "Node.js"],
        colors: ["#EF4444", "#F59E0B", "#6366F1"],
        featured: true,
      },
      {
        title: "Eco-Friendly Brand",
        description: "Complete brand identity for sustainable lifestyle company with eco-conscious values.",
        category: "branding",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["Branding", "Logo Design", "Style Guide"],
        colors: ["#059669", "#14B8A6", "#10B981"],
        featured: false,
      },
      {
        title: "Analytics Dashboard",
        description: "Comprehensive data visualization platform for business intelligence and reporting.",
        category: "ui",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["UI/UX", "Data Visualization", "Dashboard"],
        colors: ["#06B6D4", "#3B82F6", "#8B5CF6"],
        featured: true,
      },
      {
        title: "Creative Agency Site",
        description: "Bold and innovative website design showcasing creative services and portfolio work.",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["Web Design", "Creative", "Portfolio"],
        colors: ["#EC4899", "#F97316", "#EF4444"],
        featured: false,
      },
      {
        title: "Food Delivery App",
        description: "Intuitive food ordering experience with real-time tracking and seamless payments.",
        category: "mobile",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["Mobile App", "UX Design", "Food Tech"],
        colors: ["#EA580C", "#DC2626", "#FBBF24"],
        featured: false,
      },
    ];

    portfolioData.forEach(item => {
      this.createPortfolioItem(item);
    });

    // Case Studies
    const caseStudyData: InsertCaseStudy[] = [
      {
        title: "E-commerce Redesign",
        subtitle: "UX/UI Design • 8 weeks",
        description: "Complete redesign of an e-commerce platform resulting in 40% increase in conversion rates. The project involved extensive user research, prototyping, and iterative testing.",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        duration: "8 weeks",
        category: "E-commerce",
        metrics: {
          "Conversion Increase": "40%",
          "Bounce Rate Reduction": "25%",
          "Project Duration": "8 Weeks"
        },
        content: "Detailed case study content about the e-commerce redesign process, methodology, challenges, and solutions.",
        portfolioItemId: 1,
      },
      {
        title: "Health App Design",
        subtitle: "Mobile App • 12 weeks",
        description: "Comprehensive health tracking application designed to simplify wellness management. Features include medication reminders, symptom tracking, and doctor consultations.",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        duration: "12 weeks",
        category: "Healthcare",
        metrics: {
          "App Store Rating": "4.8★",
          "Downloads": "50K+",
          "Development Time": "12 Weeks"
        },
        content: "Comprehensive case study on mobile health app development, user research, and design decisions.",
        portfolioItemId: 2,
      },
      {
        title: "Analytics Dashboard",
        subtitle: "Data Visualization • 6 weeks",
        description: "Enterprise-level analytics platform providing real-time insights and customizable reporting. Designed for scalability and complex data visualization needs.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        duration: "6 weeks",
        category: "Analytics",
        metrics: {
          "Efficiency Boost": "60%",
          "Data Points": "1M+",
          "Design Sprint": "6 Weeks"
        },
        content: "Deep dive into the analytics dashboard design process, data visualization challenges, and user experience optimization.",
        portfolioItemId: 4,
      },
      {
        title: "Brand Identity System",
        subtitle: "Branding • 10 weeks",
        description: "Complete brand identity development for a sustainable fashion startup. Includes logo design, color palette, typography, and brand guidelines.",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        duration: "10 weeks",
        category: "Branding",
        metrics: {
          "Brand Recognition": "300%",
          "Design Iterations": "15",
          "Brand Development": "10 Weeks"
        },
        content: "Complete brand identity development process for sustainable fashion startup, including research, ideation, and implementation.",
        portfolioItemId: 3,
      },
    ];

    caseStudyData.forEach(caseStudy => {
      this.createCaseStudy(caseStudy);
    });
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category === category
    );
  }

  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values());
  }

  async getCaseStudy(id: number): Promise<CaseStudy | undefined> {
    return this.caseStudies.get(id);
  }

  async getCaseStudyByPortfolioItem(portfolioItemId: number): Promise<CaseStudy | undefined> {
    return Array.from(this.caseStudies.values()).find(
      study => study.portfolioItemId === portfolioItemId
    );
  }

  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const id = this.currentCaseStudyId++;
    const caseStudy: CaseStudy = { ...insertCaseStudy, id };
    this.caseStudies.set(id, caseStudy);
    return caseStudy;
  }
}

export const storage = new MemStorage();
