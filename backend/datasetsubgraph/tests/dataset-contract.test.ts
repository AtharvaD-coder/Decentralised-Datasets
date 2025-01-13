import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { DatasetDownvoted } from "../generated/schema"
import { DatasetDownvoted as DatasetDownvotedEvent } from "../generated/DatasetContract/DatasetContract"
import { handleDatasetDownvoted } from "../src/dataset-contract"
import { createDatasetDownvotedEvent } from "./dataset-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let voter = Address.fromString("0x0000000000000000000000000000000000000001")
    let newDatasetDownvotedEvent = createDatasetDownvotedEvent(id, voter)
    handleDatasetDownvoted(newDatasetDownvotedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DatasetDownvoted created and stored", () => {
    assert.entityCount("DatasetDownvoted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DatasetDownvoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "voter",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
