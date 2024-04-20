export type NexaiDoc = {
  name: string;
  title: string;
  data_type: string;
  data_value: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NexaiDocumentExtract = {
  id: string;
  documentId: string;
  projectId: string;
  name: string;
  title: string | null;
  content: string | null;
  summary: string | null;
  search_phrases: string[];
  keywords: string[];
  question_answers: { question: string; answer: string }[];
  createdAt: Date;
  updatedAt: Date;
}