import { useCallback, useState } from "react"
import { User } from "../types/api/user";

type Props = {
  id: number;
  users: Array<User>
  onOpen: () => void;
}

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find(user => user.id === id)
    // setSelectedUser(targetUser ?? null) // tragetUserがundefindだったらnullを設定する(??は左辺がundefindまたはnullなら右辺を実行)
    setSelectedUser(targetUser!); // undefinedの可能性をなくす
    onOpen()
  }, [])
  return { onSelectUser, selectedUser }
}
