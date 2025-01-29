'use client';
import { useState, useEffect } from 'react';
import { createClient, cacheExchange, fetchExchange  } from "urql";
import { DatasetCard } from './DatasetCard';
import { Loader2 } from 'lucide-react';

const APIURL = process.env.URL_KEY; 

const QUERY = `
  query {
    uploadedDataset(first: 5) {
      id
      internal_id
      title
      description
      ipfsHash
      upvotes
      downvotes
      verified
      blockTimestamp
    }
  }
`;

interface Dataset {
  id: string;
  internal_id: string;
  title: string;
  description: string;
  ipfsHash: string;
  upvotes: number;
  downvotes: number;
  verified: boolean;
  blockTimestamp: string;
}

const client = createClient({
  url: APIURL!,
  exchanges: [cacheExchange, fetchExchange ],  
});

export function DatasetGallery() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered!")
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await client.query(QUERY, {}).toPromise();
        
        console.log('GraphQL response:', response);

        if (response.error) {
          throw new Error(`Error fetching data: ${response.error.message}`);
        }

        if (response.data) {
          setDatasets(response.data.uploadedDataset || []);
        } else {
          setError('No data available.');
        }
      } catch (err) {
        console.error('Error during data fetch:', err);  
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 


  const dummyDataset: Dataset = {
    id: '1',
    internal_id: '0',
    title: 'Dataset1',
    description: 'This is a dataset',
    ipfsHash: 'bafkreibrrcntp7bqcoqus5n6rwusrtirdpsufdo5wympotxoeiu6kcam7y',
    upvotes: 0,
    downvotes: 0,
    verified: false,
    blockTimestamp: '1706522196', 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (error) {
    // return (
    //   <div className="text-red-500 text-center mt-4">
    //     <p>Error loading datasets: {error}</p>
    //   </div>
    // );
    return (
      <div>
      <div className="text-red-500 text-center mt-4">
        <p>Error loading datasets: {error}</p>
       </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DatasetCard key={dummyDataset.id} dataset={dummyDataset} />
      </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {datasets.length > 0 ? (
        datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))
      ) : (
        <DatasetCard key={dummyDataset.id} dataset={dummyDataset} />
      )}
    </div>
  );
}
