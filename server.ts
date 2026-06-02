import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database Store for JSMU Demo Session
let newsList = [
  {
    id: "news-1",
    title: "MDCAT 2026 Examination Schedule Released",
    content: "Official notification from the Jinnah Sindh Medical University Controller of Examinations detailing MDCAT schedules, reporting venues, and roll number slips. Candidate registrations are processed daily through regional registrar desks.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    category: "Exams",
    createdAt: new Date().toISOString()
  },
  {
    id: "news-2",
    title: "Result Declaration: BS Nursing Semester V",
    content: "The academic transcript records and final semester grade reports for BS Nursing are published in our secure examinations directory. Students can query individual results using their registration indexes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    category: "Research",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

let eventsList = [
  {
    id: "event-1",
    title: "Primary Health & Clinical Surgery Symposium",
    description: "Annual keynote speeches from Sindh Department of Health supervisors and surgical clinic deans.",
    date: "2026-06-15",
    location: "Main VC Boardroom, JSMU Ground Floor",
    type: "Seminar"
  },
  {
    id: "event-2",
    title: "MBBS White Coat Orientation Ceremony",
    description: "Welcome address and professional pledges for freshman medical cohorts of Sindh Medical College.",
    date: "2026-07-02",
    location: "Karachi Cantonment JSMU Sports Arena",
    type: "Academic"
  }
];

let facultyList = [
  {
    id: "fac-1",
    name: "Prof. Dr. Sameer Qureshi",
    designation: "Dean & Chief Clinical Surgeon",
    department: "Surgery",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    email: "sameer.q@jsmu.edu.pk",
    education: "FRCS (London), FCPS (Surgery), MBBS"
  },
  {
    id: "fac-2",
    name: "Dr. Amna Abbasi",
    designation: "Associate Professor & Head of Biochemistry",
    department: "Biochemistry",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    email: "amna.abbasi@jsmu.edu.pk",
    education: "PhD (Clinical Biochemistry), M.Phil, MBBS"
  },
  {
    id: "fac-3",
    name: "Prof. Dr. Tariq Shah",
    designation: "Supervisor of Oral Diagnostics",
    department: "Dentistry",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    email: "tariq.shah@jsmu.edu.pk",
    education: "MDS (Oral Medicine), BDS"
  }
];

let admissionsList = [
  {
    id: "ADM-90214",
    fullName: "Bilal Ahmed",
    email: "bilal.ahmed@example.com",
    phone: "+92-300-1234567",
    program: "MBBS (Sindh Medical College)",
    documents: "https://example.com/mock-transcript.pdf",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

let resultsList = [
  {
    id: "res-1",
    rollNumber: "JSMU-2024-101",
    studentName: "Mohammad Farhan",
    marks: 432,
    maxMarks: 500,
    program: "MBBS - First Year (Human Anatomy & Physiology)",
    subjectGrade: "A+"
  },
  {
    id: "res-2",
    rollNumber: "JSMU-2024-102",
    studentName: "Ayesha Fatima",
    marks: 415,
    maxMarks: 500,
    program: "MBBS - First Year (Biochemistry & Genetics)",
    subjectGrade: "A"
  },
  {
    id: "res-3",
    rollNumber: "JSMU-2024-103",
    studentName: "Zainab Siddiqui",
    marks: 388,
    maxMarks: 500,
    program: "BDS - Second Year (Oral Pathology)",
    subjectGrade: "B+"
  },
  {
    id: "res-4",
    rollNumber: "JSMU-2024-104",
    studentName: "Hamza Malik",
    marks: 360,
    maxMarks: 500,
    program: "BS Nursing - Third Year (Critical Care)",
    subjectGrade: "B"
  }
];

let contactsList = [
  {
    id: "con-1",
    name: "Dr. Kamran Qureshi",
    email: "kamran@gmail.com",
    message: "Seeking official verification process details for MBBS external clinical electives of 2026.",
    createdAt: new Date().toISOString()
  }
];

// AUTHENTICATION ENDPOINTS
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Provide both administrator credentials." });
  }

  // Pre-seeded Admin & Staff Credentials
  if (email === "admin@jsmu.edu.pk" && password === "admin123") {
    return res.json({
      token: "secret-token-jsmu-vice-chancellor",
      user: { name: "Vice Chancellor Office Staff", role: "Administrator" }
    });
  } else if (email === "staff@jsmu.edu.pk" && password === "admin123") {
    return res.json({
      token: "secret-token-jsmu-registrar",
      user: { name: "Registrar Cell Executive", role: "Registrar Staff" }
    });
  }

  res.status(401).json({ message: "Invalid credentials. Please attempt with admin@jsmu.edu.pk or staff@jsmu.edu.pk." });
});

// NEWS ENDPOINTS
app.get("/api/news", (req, res) => {
  res.json(newsList);
});

app.post("/api/news", (req, res) => {
  const { title, content, image, category } = req.body;
  if (!title || !content || !image || !category) {
    return res.status(400).json({ message: "Missing required news fields." });
  }
  const item = {
    id: "news-" + Date.now(),
    title,
    content,
    image,
    category,
    createdAt: new Date().toISOString()
  };
  newsList.unshift(item);
  res.status(201).json(item);
});

app.delete("/api/news/:id", (req, res) => {
  const { id } = req.params;
  newsList = newsList.filter(n => n.id !== id);
  res.json({ success: true });
});

// EVENTS ENDPOINTS
app.get("/api/events", (req, res) => {
  res.json(eventsList);
});

app.post("/api/events", (req, res) => {
  const { title, description, date, location, type } = req.body;
  if (!title || !description || !date || !location || !type) {
    return res.status(400).json({ message: "Missing required event fields." });
  }
  const item = {
    id: "event-" + Date.now(),
    title,
    description,
    date,
    location,
    type
  };
  eventsList.push(item);
  res.status(201).json(item);
});

app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  eventsList = eventsList.filter(e => e.id !== id);
  res.json({ success: true });
});

// FACULTY ENDPOINTS
app.get("/api/faculty", (req, res) => {
  res.json(facultyList);
});

app.post("/api/faculty", (req, res) => {
  const { name, designation, department, profileImage, email, education } = req.body;
  if (!name || !designation || !department || !email || !education) {
    return res.status(400).json({ message: "Missing core practitioner fields." });
  }
  const item = {
    id: "fac-" + Date.now(),
    name,
    designation,
    department,
    profileImage: profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    email,
    education
  };
  facultyList.push(item);
  res.status(201).json(item);
});

app.delete("/api/faculty/:id", (req, res) => {
  const { id } = req.params;
  facultyList = facultyList.filter(f => f.id !== id);
  res.json({ success: true });
});

// ADMISSIONS ENDPOINTS
app.get("/api/admissions", (req, res) => {
  res.json(admissionsList);
});

app.post("/api/admissions", (req, res) => {
  const { fullName, email, phone, program, documents } = req.body;
  if (!fullName || !email || !phone || !program) {
    return res.status(400).json({ message: "Incomplete admissions parameters." });
  }
  const item = {
    id: "ADM-" + Math.floor(10000 + Math.random() * 90000),
    fullName,
    email,
    phone,
    program,
    documents: documents || "https://example.com/submitted-certificate.pdf",
    status: "pending" as const,
    createdAt: new Date().toISOString()
  };
  admissionsList.unshift(item);
  res.status(201).json(item);
});

app.put("/api/admissions/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const admission = admissionsList.find(a => a.id === id);
  if (!admission) {
    return res.status(404).json({ message: "Admission application file not found." });
  }
  admission.status = status;
  res.json(admission);
});

// MARKS / RESULTS CHECKING ENDPOINTS
app.get("/api/results/search", (req, res) => {
  const { rollNumber } = req.query;
  if (!rollNumber) {
    return res.status(400).json({ message: "Query requires rollNumber parameter." });
  }
  const val = String(rollNumber).trim().toUpperCase();
  const found = resultsList.filter(r => r.rollNumber.toUpperCase() === val);
  res.json(found);
});

app.post("/api/results/upload", (req, res) => {
  const { rollNumber, studentName, marks, maxMarks, program, subjectGrade } = req.body;
  if (!rollNumber || !studentName || marks == null || !maxMarks || !program) {
    return res.status(400).json({ message: "Ensure all grade transcript fields are logged." });
  }
  const item = {
    id: "res-" + Date.now(),
    rollNumber,
    studentName,
    marks,
    maxMarks,
    program,
    subjectGrade: subjectGrade || "A"
  };
  resultsList.unshift(item);
  res.status(201).json(item);
});

// CONTACTS ENDPOINTS
app.get("/api/contacts", (req, res) => {
  res.json(contactsList);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Detail fields (Name, Email, Message) required." });
  }
  const item = {
    id: "con-" + Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  contactsList.unshift(item);
  res.status(201).json(item);
});

// VITE MIDDLEWARE OR STATIC BUILDING ROUTINE
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://0.0.0.0:${PORT}`);
  });
}

startServer();
