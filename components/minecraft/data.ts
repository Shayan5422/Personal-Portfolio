export type SectionId =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "contact"

export type BlockKind =
  | "grass"
  | "dirt"
  | "stone"
  | "log"
  | "leaves"
  | "sand"
  | "water"
  | "plank"
  // info blocks (one per section)
  | "diamond"
  | "gold"
  | "iron"
  | "emerald"
  | "bookshelf"
  | "beacon"

export type SectionBlock = {
  id: SectionId
  kind: BlockKind
  label: string
  position: [number, number, number]
  hp: number
}

export const SECTION_BLOCKS: SectionBlock[] = [
  {
    id: "about",
    kind: "emerald",
    label: "About Me",
    position: [-12, 1, -6],
    hp: 22,
  },
  {
    id: "experience",
    kind: "iron",
    label: "Experience",
    position: [-6, 1, -10],
    hp: 26,
  },
  {
    id: "education",
    kind: "bookshelf",
    label: "Education",
    position: [0, 1, -12],
    hp: 24,
  },
  {
    id: "skills",
    kind: "diamond",
    label: "Skills",
    position: [6, 1, -10],
    hp: 28,
  },
  {
    id: "projects",
    kind: "gold",
    label: "Projects",
    position: [12, 1, -6],
    hp: 26,
  },
  {
    id: "contact",
    kind: "beacon",
    label: "Contact",
    position: [0, 1, 8],
    hp: 22,
  },
]

export type SectionPayload = {
  title: string
  subtitle: string
  intro?: string
  blocks?: Array<{
    heading: string
    body?: string
    bullets?: string[]
    meta?: string
  }>
  contacts?: Array<{ label: string; value: string; href?: string }>
  links?: Array<{ label: string; href: string }>
  skills?: Array<{ group: string; items: { name: string; level: number }[] }>
  extras?: string[]
  projects?: Array<{
    title: string
    description: string
    tags: string[]
    github?: string
    live?: string
  }>
}

export const SECTION_DATA: Record<SectionId, SectionPayload> = {
  about: {
    title: "About Me",
    subtitle: "Who is Shayan Hashemi?",
    intro:
      "AI Engineer & Healthcare Innovator. Currently working as an AI Engineer at Alasuite while pursuing a Master's in AI Management in Healthcare at École Centrale de Lille.",
    blocks: [
      {
        heading: "Profile",
        body:
          "I specialize in developing AI solutions for healthcare. My expertise lies in machine learning, data science, and full-stack development. My background in nutrition and food sciences gives me a unique perspective on health-related AI applications.",
      },
      {
        heading: "Quick facts",
        bullets: [
          "Name: Shayan Hashemi",
          "Location: Lille, France",
          "Email: shayan@alasuite.com",
          "Phone: +33 755 963 630",
        ],
      },
    ],
    links: [{ label: "Download CV", href: "/Newwithlink.pdf" }],
  },
  experience: {
    title: "Professional Journey",
    subtitle: "Where I've worked",
    blocks: [
      {
        heading: "AI Engineer — Alasuite",
        meta: "Paris, France · Sep 2023 → Present",
        bullets: [
          "Expert in data analysis for healthcare AI solutions",
          "Specializing in frugal AI, focused on LLMs and ML/deep learning",
          "Promoting innovation through pragmatic and ethical AI approaches",
          "Developing skills in hardware, servers, and cybersecurity",
        ],
      },
      {
        heading: "Data Analysis & Service Composition Intern — Laboratoire OpenCems",
        meta: "Anglet, France · Mar 2024 → Jul 2024",
        bullets: [
          "Designed an innovative web app on OpenCEMS for data analysis",
          "Harmonized services with WoR ontology for better interoperability",
          "Developed intuitive user interfaces for an optimized experience",
        ],
      },
      {
        heading: "Academic Project — École Centrale de Lille",
        meta: "Lille, France · Sep 2023 → Mar 2024",
        bullets: [
          "Improved emergency care efficiency using ML algorithms to model patient journeys",
        ],
      },
      {
        heading: "IT Administrator & Web Designer — Institut de Novin Parsian",
        meta: "Ahvaz · Jan 2016 → Jul 2021",
        bullets: [
          "Managed information systems and maintained data security",
          "Improved network performance",
          "Designed and implemented the company's website",
        ],
      },
    ],
  },
  education: {
    title: "Academic Background",
    subtitle: "Degrees, research and patents",
    blocks: [
      {
        heading: "Master's in AI Management in Healthcare",
        meta: "École Centrale de Lille · 2023 → Present",
        bullets: [
          "Training healthcare professionals in AI adoption and implementation",
          "Transforming healthcare professions through AI application",
          "Mastering economic, organizational and regulatory challenges of AI in healthcare",
        ],
      },
      {
        heading: "Bachelor's in Nutrition and Food Sciences",
        meta: "Université des sciences médicales de Jondishapur · 2015",
        bullets: [
          "Promoting health through specialized advice to help people achieve their wellness goals",
        ],
      },
      {
        heading: "Patent — Physical Disability Restoration System",
        meta: "Reference Number: 103741",
        body:
          "Innovative system designed to assist in the rehabilitation and restoration of physical abilities for individuals with disabilities.",
      },
      {
        heading: "Patent — Food Consumable Preparation Device (NG Tube)",
        meta: "Reference Number: 104483",
        body:
          "Device for the preparation and adjustment of food consumables, designed for nasogastric (NG) tube feeding applications.",
      },
    ],
  },
  skills: {
    title: "Technical Expertise",
    subtitle: "Languages, ML stack and tooling",
    skills: [
      {
        group: "Programming",
        items: [
          { name: "Python", level: 90 },
          { name: "JavaScript", level: 85 },
          { name: "Java", level: 75 },
          { name: "SQL", level: 80 },
          { name: "HTML/CSS", level: 85 },
          { name: "SPARQL", level: 70 },
        ],
      },
      {
        group: "Machine Learning",
        items: [
          { name: "Scikit-Learn", level: 90 },
          { name: "TensorFlow", level: 85 },
          { name: "PyTorch", level: 80 },
          { name: "Keras", level: 85 },
          { name: "XGBoost", level: 75 },
          { name: "CNN/RNN", level: 80 },
        ],
      },
      {
        group: "Tools & Frameworks",
        items: [
          { name: "Docker", level: 85 },
          { name: "Git", level: 90 },
          { name: "Flask", level: 85 },
          { name: "Angular", level: 80 },
          { name: "MongoDB", level: 75 },
          { name: "Keycloak", level: 70 },
        ],
      },
    ],
    extras: [
      "SysML/UML",
      "Data Science",
      "Supervised ML",
      "Unsupervised ML",
      "Data Fusion",
      "Ontology",
      "Fuzzy Logic",
      "Optimization Algorithms",
      "Scheduling",
      "Disease Prediction",
      "Protégé",
      "Weka",
      "Bonita Soft",
      "Postman",
      "Fuseki",
      "Granular Computing",
    ],
  },
  projects: {
    title: "Featured Work",
    subtitle: "A selection of my projects",
    projects: [
      {
        title: "TextComparePro",
        description:
          "Professional text comparison tool with advanced diff analysis: word/character comparison, case sensitivity, whitespace control, colored diff, statistics dashboard and dark/light themes.",
        tags: ["React", "TypeScript", "Tailwind", "Express", "Vite"],
        github: "https://github.com/Shayan5422/TextComparePro",
        live: "https://diffind.vercel.app/",
      },
      {
        title: "DOCX to LaTeX Converter",
        description:
          "Converts Word documents to LaTeX with image extraction, Overleaf compatibility, style preservation and automatic table of contents.",
        tags: ["Python", "Next.js", "TypeScript", "LaTeX"],
        github: "https://github.com/Shayan5422/Docx_to_latex",
        live: "https://docx-to-latex.vercel.app/",
      },
      {
        title: "GiftSync",
        description:
          "Birthday wishlist sharing app: create lists, share with friends, avoid duplicate gifts, item claiming, price ranges and direct purchase links.",
        tags: ["Next.js", "TypeScript", "React"],
        github: "https://github.com/Shayan5422/gift-site",
        live: "https://giftsync.vercel.app/",
      },
      {
        title: "Hugging Face Model Search",
        description:
          "Finds the best Hugging Face model based on a text description using semantic similarity.",
        tags: ["AI", "Semantic Search", "Hugging Face"],
        live: "https://rag-huggingface.vercel.app/",
      },
      {
        title: "FocusFlow",
        description:
          "Productivity app with focus timers, background sounds and breathing exercises.",
        tags: ["TypeScript", "React", "Node.js", "Spotify API"],
        github: "https://github.com/Shayan5422/FocusFlow",
        live: "https://stay-focusly.vercel.app/",
      },
      {
        title: "Mac Control MCP Server",
        description:
          "Model Context Protocol server that controls macOS through an AI interface: AppleScript, mouse/keyboard and system info.",
        tags: ["JavaScript", "Node.js", "AI", "macOS"],
        github: "https://github.com/Shayan5422/MCP_MAC_USE",
      },
      {
        title: "Gemini Translator",
        description:
          "Chrome extension using Gemini AI for quick translations across many languages including English, Persian, Arabic, French, Spanish and German.",
        tags: ["Chrome Extension", "Gemini AI"],
        github: "https://github.com/Shayan5422/Gemini-Translator",
        live: "https://chromewebstore.google.com/detail/gemini-translator/mgckajgaoebghjjlmlbnifapbbmgljdk",
      },
      {
        title: "Visual RAG",
        description:
          "Retrieval-Augmented Generation system with visual capabilities for more accurate, context-aware answers.",
        tags: ["Python", "Computer Vision", "RAG", "Deep Learning"],
        github: "https://github.com/Shayan5422/Visual-RAG",
      },
      {
        title: "Text to SQL Converter",
        description:
          "AI-powered tool that turns natural language queries into SQL statements for non-technical users.",
        tags: ["Python", "NLP", "SQL"],
        github: "https://github.com/Shayan5422/Text_to_SQL",
      },
      {
        title: "CV Maker",
        description:
          "AI-powered website that helps you design resumes and write cover letters.",
        tags: ["Python", "AI", "Angular"],
        github: "https://github.com/Shayan5422/CV_maker",
        live: "https://cv-creative.vercel.app/",
      },
      {
        title: "Eye Movement Tracking",
        description:
          "Computer vision project for tracking and analyzing eye movements, with applications in accessibility and medical diagnostics.",
        tags: ["Python", "OpenCV", "Computer Vision"],
        github: "https://github.com/Shayan5422/Eye-Movement",
      },
    ],
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's build something",
    intro:
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    contacts: [
      {
        label: "Email",
        value: "shayan@alasuite.com",
        href: "mailto:shayan@alasuite.com",
      },
      { label: "Phone", value: "+33 755 963 630", href: "tel:+33755963630" },
      { label: "Location", value: "Lille, 59160, France" },
    ],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shayan-hashemi-5308081b1/",
      },
      { label: "GitHub", href: "https://github.com/Shayan5422" },
      { label: "Buy me a coffee", href: "https://buymeacoffee.com/shayanhshm" },
    ],
  },
}
