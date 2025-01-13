import {
  DatasetDownvoted as DatasetDownvotedEvent,
  DatasetUpvoted as DatasetUpvotedEvent,
  DatasetVerified as DatasetVerifiedEvent,
  uploadedDataset as uploadedDatasetEvent
} from "../generated/DatasetContract/DatasetContract"
import {
  DatasetDownvoted,
  DatasetUpvoted,
  DatasetVerified,
  uploadedDataset
} from "../generated/schema"

export function handleDatasetDownvoted(event: DatasetDownvotedEvent): void {
  let entity = new DatasetDownvoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDatasetUpvoted(event: DatasetUpvotedEvent): void {
  let entity = new DatasetUpvoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDatasetVerified(event: DatasetVerifiedEvent): void {
  let entity = new DatasetVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.datasetId = event.params.datasetId
  entity.verifier = event.params.verifier
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleuploadedDataset(event: uploadedDatasetEvent): void {
  let entity = new uploadedDataset(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.owner = event.params.owner
  entity.ipfsHash = event.params.ipfsHash
  entity.description = event.params.description
  entity.title = event.params.title
  entity.upvotes = event.params.upvotes
  entity.downvotes = event.params.downvotes
  entity.verified = event.params.verified

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
