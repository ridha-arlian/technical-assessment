'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription} from "@/components/ui/empty"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item"

type Item = {
  id: number;
  value: string;
  done: boolean;
}

const ToDo = () => {
  const [inputUser, setInputUser] = useState('')
  const [listItem, setListItem] = useState<Item[]>([])
  const [editItem, setEditItem] = useState<number | null>(null)

  const updateItem = (value: string) => {
    setInputUser(value)
  }

  const actionItem = (): void => {
    if (inputUser.trim() === '') return

    if (editItem !== null) {
      const update = listItem.map((item, index) => index === editItem ? { ...item, value: inputUser} : item)
      setListItem(update)
      setEditItem(null)
    } else {
      const newItem: Item = {
        id: Math.random(),
        value: inputUser,
        done: false
      };
      setListItem([...listItem, newItem])
    }
    setInputUser('')
  }

  const deleteItem = (id: number): void => {
    const update = listItem.filter((item) => item.id !== id)
    setListItem(update)
  }

  const editMode = (index: number): void => {
    setInputUser(listItem[index].value)
    setEditItem(index)
  }

  const doneItem = (id: number): void => {
    const update = listItem.map((item) => item.id === id? { ...item, done: !item.done} : item)
    setListItem(update)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Card className="w-full maw-w-md">
          <CardHeader>
            <CardTitle>
              To Do List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder={editItem !== null ? 'Edit item' : 'Add item'} value={inputUser} onChange={(e) => updateItem(e.target.value)}/>
              <Button onClick={actionItem}>
                {editItem !== null ? 'Update' : 'Add'}
              </Button>
            </div>
            {listItem.length > 0 ? (
              <ItemGroup className="mt-10">
                {listItem.map((item, index) => (
                  <Item key={item.id}>
                    <ItemContent>
                      <ItemTitle className={item.done ? 'text-muted-foreground line-through' : ''}>
                        {item.value}
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Button onClick={() => doneItem(item.id)}>
                        {item.done ? 'Undone' : 'Done'}
                      </Button>
                      <Button onClick={() => editMode(index)} disabled={item.done}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteItem(item.id)}>
                        Delete
                      </Button>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            ) : (
              <Empty>
                <EmptyDescription>
                  Item not found
                </EmptyDescription>
              </Empty>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default ToDo;