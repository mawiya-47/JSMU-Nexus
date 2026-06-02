export interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  category: 'General' | 'Admissions' | 'Research' | 'Exams' | 'Events';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'Academic' | 'Seminar' | 'Sports' | 'Conference' | 'Exam';
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  profileImage: string;
  email: string;
  education: string;
}

export interface Admission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  documents: string;
  status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  createdAt: string;
}

export interface Result {
  id: string;
  rollNumber: string;
  studentName: string;
  marks: number;
  maxMarks: number;
  program: string;
  subjectGrade: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
