import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DatasetDownvoted,
  DatasetUpvoted,
  DatasetVerified,
  uploadedDataset
} from "../generated/DatasetContract/DatasetContract"

export function createDatasetDownvotedEvent(
  id: BigInt,
  voter: Address
): DatasetDownvoted {
  let datasetDownvotedEvent = changetype<DatasetDownvoted>(newMockEvent())

  datasetDownvotedEvent.parameters = new Array()

  datasetDownvotedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  datasetDownvotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return datasetDownvotedEvent
}

export function createDatasetUpvotedEvent(
  id: BigInt,
  voter: Address
): DatasetUpvoted {
  let datasetUpvotedEvent = changetype<DatasetUpvoted>(newMockEvent())

  datasetUpvotedEvent.parameters = new Array()

  datasetUpvotedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  datasetUpvotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return datasetUpvotedEvent
}

export function createDatasetVerifiedEvent(
  datasetId: BigInt,
  verifier: Address,
  rewardAmount: BigInt
): DatasetVerified {
  let datasetVerifiedEvent = changetype<DatasetVerified>(newMockEvent())

  datasetVerifiedEvent.parameters = new Array()

  datasetVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "datasetId",
      ethereum.Value.fromUnsignedBigInt(datasetId)
    )
  )
  datasetVerifiedEvent.parameters.push(
    new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier))
  )
  datasetVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return datasetVerifiedEvent
}

export function createuploadedDatasetEvent(
  id: BigInt,
  owner: Address,
  ipfsHash: string,
  description: string,
  title: string,
  upvotes: BigInt,
  downvotes: BigInt,
  verified: boolean
): uploadedDataset {
  let uploadedDatasetEvent = changetype<uploadedDataset>(newMockEvent())

  uploadedDatasetEvent.parameters = new Array()

  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam("ipfsHash", ethereum.Value.fromString(ipfsHash))
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam(
      "upvotes",
      ethereum.Value.fromUnsignedBigInt(upvotes)
    )
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam(
      "downvotes",
      ethereum.Value.fromUnsignedBigInt(downvotes)
    )
  )
  uploadedDatasetEvent.parameters.push(
    new ethereum.EventParam("verified", ethereum.Value.fromBoolean(verified))
  )

  return uploadedDatasetEvent
}
