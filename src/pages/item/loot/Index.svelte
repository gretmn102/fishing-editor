<script lang="ts">
  import { Option, Result } from "@fering-org/functional-helper"

  import type { Item, ItemId } from "#/api"
  import ItemSelecter from "./ItemSelecter.svelte"

  export let id: ItemId
  export let loot: Result<Item, ItemId> []
  export let removeByIndex: (index: number) => void
  export let insertAfter: (index: number, itemId: ItemId) => void
  export let getAllItems: () => Item []

  let isItemSelecterOn: boolean = false

  function lootIncludes(currentItem: Item) {
    const res = loot.find(x =>
      Result.reduce(
        x,
        x => currentItem === x,
        itemId => currentItem.Id === itemId
      )
    )
    return Option.isSome(res)
  }
</script>

<div>
  <div>Можно поймать:</div>
  <div>
    <ul>
      {#each loot as item, index}
        <il>
          {#if item[0] === "Ok"}
            <div>{item[1].Name}</div>
          {:else}
            <div>Unknown item with {item[1]} ID</div>
          {/if}
          <button
            on:click={_ => void removeByIndex(index)}
          >
            Удалить
          </button>
        </il>
      {/each}
    </ul>
  </div>

  <button
    on:click={_ => {
      isItemSelecterOn = true
    }}
  >
    Добавить
  </button>

  {#if isItemSelecterOn}
    <ItemSelecter
      items={getAllItems().filter(x => (x.Id !== id) && !lootIncludes(x))}
      submit={item => {
        Option.reduce(
          item,
          item2 => {
            insertAfter(loot.length - 1, item2.Id)
          },
          () => {},
        )
        isItemSelecterOn = false
      }}
    />
  {/if}
</div>
