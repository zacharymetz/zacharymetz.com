import { Article } from "@/types/pageTypes";

export const getArticles = async (): Promise<Article[]> => {
  return [
    {
      id: 1,
      title: "How does next js work under the hood?",
      content: "This is the content of article 1",
      author: "John Doe",
      date: "2024-01-01",
    },
    {
      id: 2,
      title: "Article 2",
      content: "This is the content of article 2",
      author: "Jane Doe",
      date: "2024-01-02",
    },
    {
      id: 3,
      title: "Article 3",
      content: "This is the content of article 3",
      author: "John Doe",
      date: "2024-01-03",
    },
    {
      id: 4,
      title: "Article 4",
      content: "This is the content of article 4",
      author: "Jane Doe",
      date: "2024-01-04",
    },
    {
      id: 5,
      title: "Article 5",
      content: "This is the content of article 5",
      author: "John Doe",
      date: "2024-01-05",
    },
    {
      id: 6,
      title: "Article 6",
      content: "This is the content of article 6",
      author: "Jane Doe",
      date: "2024-01-06",
    },
  ];
};
