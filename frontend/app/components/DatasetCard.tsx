import { CheckCircle, Download, ThumbsUp, ThumbsDown, Shield } from 'lucide-react';

interface DatasetProps {
  dataset: {
    id: string;
    internal_id: string;
    title: string;
    description: string;
    ipfsHash: string;
    upvotes: number;
    downvotes: number;
    verified: boolean;
    blockTimestamp: string;
  };
}

export const DatasetCard: React.FC<DatasetProps> = ({ dataset }) => {
  const {
    title,
    description,
    ipfsHash,
    upvotes,
    downvotes,
    verified,
    blockTimestamp,
  } = dataset;

  const upvotePercentage = upvotes / (upvotes + downvotes) * 100 | 0;
  const formattedDate = new Date(parseInt(blockTimestamp) * 1000).toLocaleString(); // Convert Unix timestamp to readable date

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <ThumbsUp className="text-green-500" />
          <span>{upvotes}</span>
          <ThumbsDown className="text-red-500" />
          <span>{downvotes}</span>
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2 text-gray-500">
          <Shield className="text-blue-500" />
          <span>{verified ? 'Verified' : 'Not Verified'}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Download className="text-blue-500" />
          <a
            href={`https://ipfs.io/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download Dataset
          </a>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <CheckCircle className="text-yellow-500" />
          <span>Uploaded on: {formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="font-semibold">Upvote Percentage:</span>
          <span className="text-blue-600">{upvotePercentage.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};
