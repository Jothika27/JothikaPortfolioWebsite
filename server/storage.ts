import { 
  profile, skills, experience, projects, education, certifications,
  type Profile, type InsertProfile, type Skill, type InsertSkill,
  type Experience, type InsertExperience, type Project, type InsertProject,
  type Education, type InsertEducation, type Certification, type InsertCertification
} from "@shared/schema";

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  
  // Experience
  getExperience(): Promise<Experience[]>;
  getExperienceById(id: number): Promise<Experience | undefined>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  
  // Education
  getEducation(): Promise<Education[]>;
  
  // Certifications
  getCertifications(): Promise<Certification[]>;
}

export class MemStorage implements IStorage {
  private profileData: Profile | undefined;
  private skillsData: Map<number, Skill>;
  private experienceData: Map<number, Experience>;
  private projectsData: Map<number, Project>;
  private educationData: Map<number, Education>;
  private certificationsData: Map<number, Certification>;
  private currentId: number;

  constructor() {
    this.skillsData = new Map();
    this.experienceData = new Map();
    this.projectsData = new Map();
    this.educationData = new Map();
    this.certificationsData = new Map();
    this.currentId = 1;
    
    // Initialize with Jothika's data
    this.initializeData();
  }

  private initializeData() {
    // Profile Data - Jothika R
    this.profileData = {
      id: 1,
      name: "Jothika R",
      title: "Software Engineer",
      location: "Coimbatore, India",
      email: "jothikajo272001@gmail.com",
      phone: "+91-6385919611",
      linkedin: "linkedin.com/in/jothika-r-407787265/",
      bio: "Experienced Software Engineer with 2+ years in Java, Spring Boot, and Angular development. Specialized in microservices architecture, cloud technologies, and agile development practices.",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616c24df853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    };

    // Skills Data
    const skillsData: InsertSkill[] = [
      // Languages
      { category: "languages", name: "Java", level: 5, icon: "☕" },
      { category: "languages", name: "TypeScript", level: 4, icon: "💻" },
      { category: "languages", name: "SQL", level: 4, icon: "🗃️" },
      
      // Frameworks
      { category: "frameworks", name: "Spring Boot", level: 5, icon: "🍃" },
      { category: "frameworks", name: "Spring MVC", level: 4, icon: "🏗️" },
      { category: "frameworks", name: "Microservices", level: 4, icon: "🔧" },
      { category: "frameworks", name: "Hibernate", level: 4, icon: "💾" },
      { category: "frameworks", name: "JPA", level: 4, icon: "📋" },
      { category: "frameworks", name: "Spring WebFlux", level: 4, icon: "⚡" },
      { category: "frameworks", name: "Angular", level: 4, icon: "🅰️" },
      { category: "frameworks", name: "Lombok", level: 3, icon: "🛠️" },
      { category: "frameworks", name: "Jasper", level: 3, icon: "📊" },
      { category: "frameworks", name: "Kafka", level: 3, icon: "📡" },
      
      // Tools
      { category: "tools", name: "GitLab", level: 4, icon: "🦊" },
      { category: "tools", name: "GitHub", level: 4, icon: "🐙" },
      { category: "tools", name: "Docker", level: 3, icon: "🐳" },
      { category: "tools", name: "Maven", level: 4, icon: "🔨" },
      { category: "tools", name: "Splunk", level: 3, icon: "🔍" },
      { category: "tools", name: "AWS S3", level: 3, icon: "☁️" },
      { category: "tools", name: "EC2", level: 3, icon: "🖥️" },
      { category: "tools", name: "Elastic Search", level: 3, icon: "🔍" },
      { category: "tools", name: "Jira", level: 4, icon: "📝" },
      { category: "tools", name: "DataDog", level: 3, icon: "🐕" },
      { category: "tools", name: "Postman", level: 4, icon: "📮" },
      { category: "tools", name: "SOAP UI", level: 3, icon: "🧼" },
      
      // Databases
      { category: "databases", name: "MySQL", level: 4, icon: "🐬" },
      { category: "databases", name: "Oracle", level: 3, icon: "🏛️" },
      { category: "databases", name: "H2", level: 3, icon: "💽" },
      { category: "databases", name: "MongoDB", level: 4, icon: "🍃" },
    ];

    skillsData.forEach(skill => {
      const id = this.currentId++;
      this.skillsData.set(id, { ...skill, id });
    });

    // Experience Data
    const experienceData: InsertExperience[] = [
      {
        company: "Zuci Systems",
        position: "Software Engineer",
        location: "Chennai, India",
        startDate: "September 2024",
        endDate: null,
        responsibilities: [
          "Working with AWS S3 bucket to update the email templates",
          "Maintained and modified certificate data using Jasper, enhancing report accuracy and presentation",
          "Handled BAU tasks and resolved vulnerabilities in Microservice application",
          "Analyzed application errors using Datadog logs, identifying root causes and implementing effective solutions",
          "Deployed code using GitHub Actions. Conducted code reviews, debugging, and testing to ensure high-quality software delivery",
          "Actively participated in Scrum ceremonies including Sprint Planning, Retrospectives, and Daily Stand-ups"
        ],
        technologies: ["Java", "Spring Boot", "AWS S3", "Jasper", "DataDog", "GitHub Actions", "Microservices"]
      },
      {
        company: "KGISL - Sony ODC",
        position: "Junior Java Developer",
        location: "Coimbatore, India",
        startDate: "June 2022",
        endDate: "September 2024",
        responsibilities: [
          "Handled BAU tasks and resolved pentest vulnerabilities, developed a bash script to migrate Git repositories",
          "Monitored EC2 logs and extracted customer information using Splunk Enterprise",
          "Collaborated with developers to implement new features and optimize existing codebases",
          "Conducted code reviews, debugging, and testing to ensure high-quality software delivery",
          "Utilized version control systems (e.g., Git) for source code management and CI/CD pipelines",
          "Troubleshot and resolved complex technical vulnerability issues in a timely manner"
        ],
        technologies: ["Java", "Spring Boot", "AWS EC2", "Splunk", "Git", "CI/CD"]
      }
    ];

    experienceData.forEach(exp => {
      const id = this.currentId++;
      this.experienceData.set(id, { ...exp, id });
    });

    // Projects Data
    const projectsData: InsertProject[] = [
      {
        title: "Spring Boot Sample Application",
        description: "Created a sample user details management application using webflux with integrated MongoDB for efficient data storage and retrieval. Designed and implemented RESTful APIs with Spring Boot and leveraged Spring WebFlux to improve application performance.",
        technologies: ["Spring Boot", "H2", "JPA", "MySQL", "Swagger", "MongoDB", "Spring WebFlux", "Lombok"],
        githubUrl: "https://github.com/Jothika27",
        liveUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
        category: "backend"
      }
    ];

    projectsData.forEach(project => {
      const id = this.currentId++;
      this.projectsData.set(id, { ...project, id });
    });

    // Education Data
    const educationData: InsertEducation[] = [
      {
        degree: "Bachelor of Technology in Information Technology",
        institution: "Karpagam College of Engineering",
        location: "Coimbatore, India",
        startDate: "August 2017",
        endDate: "April 2021",
        gpa: null
      }
    ];

    educationData.forEach(edu => {
      const id = this.currentId++;
      this.educationData.set(id, { ...edu, id });
    });

    // Certifications Data
    const certificationsData: InsertCertification[] = [
      {
        name: "Splunk Enterprise",
        issuer: "Splunk",
        issueDate: "2023",
        credentialId: null,
        credentialUrl: null
      },
      {
        name: "Java Certification",
        issuer: "HackerRank",
        issueDate: "2022",
        credentialId: null,
        credentialUrl: "https://www.hackerrank.com/profile/nanika272001"
      }
    ];

    certificationsData.forEach(cert => {
      const id = this.currentId++;
      this.certificationsData.set(id, { ...cert, id });
    });
  }

  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    return this.profileData;
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skillsData.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skillsData.values()).filter(
      skill => skill.category === category
    );
  }

  // Experience methods
  async getExperience(): Promise<Experience[]> {
    return Array.from(this.experienceData.values());
  }

  async getExperienceById(id: number): Promise<Experience | undefined> {
    return this.experienceData.get(id);
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsData.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projectsData.values()).filter(
      project => project.featured
    );
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projectsData.get(id);
  }

  // Education methods
  async getEducation(): Promise<Education[]> {
    return Array.from(this.educationData.values());
  }

  // Certifications methods
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certificationsData.values());
  }
}

export const storage = new MemStorage();
