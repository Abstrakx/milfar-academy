import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
}

interface ArticleCardProps {
  article: Article;
}

const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/artikel/${article.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 group-hover:scale-105">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200" />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            {article.title}
          </h2>
          {article.description && (
            <p className="text-gray-600 mt-2">
              {truncate(article.description, 100)}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
