"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { FileUpload } from "./ui/file-upload";
import { PinataSDK } from "pinata-web3";
import {abi} from '../contractAbi';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

export function SignupFormDemo() {

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    try {

      const upload = await pinata.upload.file(file);
      console.log(upload);
      const ipfsHash = upload.IpfsHash;

      writeContract({
        abi,
        address: '0x724D85d269e2152E5CaE212eFF088153AD8b6e9b',
        functionName: 'uploadDataset',
        args: [title, description, ipfsHash],
      })
      
    } catch (error) {
      console.log(error);
    }
  
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Upload Dataset
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Make sure you have a MetaMask account!
      </p>
      
      {isConfirming && (
        <div className="flex items-center justify-center space-x-2 text-blue-400 mt-4 p-4 bg-blue-900/10 rounded-lg">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Waiting for confirmation...</span>
        </div>
      )}

      {isConfirmed && (
        <div className="p-4 bg-green-900/50 rounded-lg text-green-400 flex items-center space-x-2 mt-4">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Dataset uploaded successfully!</span>
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="title">Dataset Title</Label>
          <Input id="title" placeholder="Enter Project Title" type="text"  onChange={(e)=> setTitle(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Dataset Description</Label>
          <Input id="description" placeholder="Enter Dataset Description" type="text" onChange={(e)=> setDescription(e.target.value)} />
        </LabelInputContainer>
        
         <LabelInputContainer className="mb-4">
        <FileUpload onChange={(files) => setFile(files[0])} />
        </LabelInputContainer> 

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isConfirming}
        >
          {isConfirming ? (
    <>
      Submitting...
    </>
  ) : (
    <>
      Submit <span className="inline-block ml-1">→</span>
    </>
  )}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
