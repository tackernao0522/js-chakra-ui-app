## Chakra UIの導入

`$ npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 or $ yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4`<br>

+ `App.tsx`を編集<br>

```
import "./App.css";
import { Button, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Button colorScheme="teal">ボタン</Button>
    </ChakraProvider>
  )
}

export default App;
```

## Globalなスタイルを設定する

+ `src/theme`ディレクトリを作成<br>

+ `src/theme/theme.ts`ファイルを作成<br>

```
import { extendTheme} from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "gray.100",
                color: "gray.800"
            }
        }
    }
});

export default theme;
```

+ `App.tsx`を編集<br>

```
import theme from "./theme/theme";
import { Button, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme="teal">ボタン</Button>
      <p>あああああああああ</p>
    </ChakraProvider>
  )
}

export default App;
```

## ルーティングの作成<br>

+ `$ npm install react-router-dom@5.3.0 or $ yarn add react-router-dom@5.3.0`のインポート<br>

+ `$ npm install @types/react-router-dom@5.3.0 or $ yarn add @types/react-router-dom@5.3.0`のインポート<br>

+ `src/components`ディレクトリを作成<br>

+ `src/components/pages`ディレクトリを作成<br>

+ `src/components/pages/Login.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react"

export const Login: VFC = memo(() => {
        return <p>ログインページです</p>
})
```

+ `src/components/pages/Home.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react";

export const Home: VFC = memo(() => {
    return <p>Homeページです</p>
})
```

+ `src/components/pages/Setting.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react";

export const Setting: VFC = memo(() => {
    return <p>設定ページです</p>
})
```

+ `src/components/pages/UserManagement.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react";

export const UserManagement: VFC = memo(() => {
    return <p>ユーザー管理ページです</p>
})
```

+ `App.tsx`を編集<br>

```
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom"

import { Button, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Button colorScheme="teal">ボタン</Button>
        <p>あああああああああ</p>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
```

+ `src/router`ディレクトリを作成<br>

+ `src/router/Router.tsx`コンポーネントを作成<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";
import { Login } from "../components/pages/Login";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
        </Switch>
    )
})
```

+ `App.tsx`を編集<br>

```
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./router/Router";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
```

+ `src/router/HomeRoutes.tsx`コンポーネントを作成<br>

```
import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";

export const HomeRoutes = [
    {
        path: "/",
        exact: true,
        children: <Home />
    },
    {
        path: "/user_management",
        exact: false,
        children: <UserManagement />
    },
    {
        path: "/setting",
        exact: false,
        children: <Setting />
    }
]
```

+ `src/router/Router.tsx`を編集<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/home" render={({ match: { url } }) => (
                <Switch>
                    {HomeRoutes.map((route) => (
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={`${url}${route.path}`}
                        >
                            {route.children}
                        </Route>
                    ))}
                </Switch>
            )} />
        </Switch>
    )
})
```

+ `src/components/pages/Page404.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react";

export const Page404: VFC = memo(() => {
    return <p>404ページです</p>
})
```

+ `src/router/Router.tsx`を編集<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/home" render={({ match: { url } }) => (
                <Switch>
                    {HomeRoutes.map((route) => (
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={`${url}${route.path}`}
                        >
                            {route.children}
                        </Route>
                    ))}
                </Switch>
            )} />
            <Route path="*">
                <Page404 />
            </Route>
        </Switch>
    )
})
```

+ `src/router/HomeRoutes.tsx`を編集<br>

```
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";

export const HomeRoutes = [
    {
        path: "/",
        exact: true,
        children: <Home />
    },
    {
        path: "/user_management",
        exact: false,
        children: <UserManagement />
    },
    {
        path: "/setting",
        exact: false,
        children: <Setting />
    },
    {
        path: "*",
        exact: false,
        children: <Page404 />
    },
]
```

## ヘッダーメニューの作成

+ `src/components/organisms`ディレクトリを作成<br>

+ `src/components/organisms/layout`ディレクトリを作成<br>

+ `src/components/organisms/layout/Header.tsx`コンポーネントを作成<br>

```
import { memo, VFC } from "react";

export const Header: VFC = memo(() => {
    return <div style={{ height: "50px", backgroundColor: "teal"}} ></div>
});
```

+ `src/components/templates`ディレクトリを作成<br>

+ `src/components/templates/HeaderLayout.tsx`コンポーネントを作成<br>

```
import { memo, ReactNode, VFC } from "react";
import { Header } from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
        </>
    )
})
```

+ `src/router/Router.tsx`を編集<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/home" render={({ match: { url } }) => (
                <Switch>
                    {HomeRoutes.map((route) => (
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={`${url}${route.path}`}
                        >
                            <HeaderLayout>{route.children}</HeaderLayout>
                        </Route>
                    ))}
                </Switch>
            )} />
            <Route path="*">
                <Page404 />
            </Route>
        </Switch>
    )
})
```

## Chakra Iconの導入

`$ npm i @chakra-ui/icons`<br>

+ `src/components/Header.tsx`を編集<br>

```
import { Box, Button, Drawer, DrawerContent, DrawerBody, DrawerOverlay, Flex, Heading, IconButton, Link, useDisclosure } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { HamburgerIcon } from "@chakra-ui/icons"

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link>ユーザー一覧</Link>
                    </Box>
                    <Link>設定</Link>
                </Flex>
                <IconButton
                    aria-label="メニューボタン"
                    icon={<HamburgerIcon />}
                    size="sm" variant="unstyled"
                    display={{ base: "block", md: "none" }}
                    onClick={onOpen}
                />
            </Flex>
            <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerBody p={0} bg="gray.100">
                            <Button w="100%">TOP</Button>
                            <Button w="100%">ユーザー一覧</Button>
                            <Button w="100%">設定</Button>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
});
```

## ヘッダーの作成(コンポーネント分割)

+ `src/components/atoms`ディレクトリを作成<br>

+ `src/components/atoms/button`ディレクトリを作成<br>

+ `src/components/atoms/button/MenuIconButton.tsx`コンポーネントを作成<br>

```
import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { memo, VFC } from "react";

type Props = {
    onOpen: () => void;
}

export const MenuIconButton: VFC<Props> = memo((props) => {
    const { onOpen } = props;

    return (
        <IconButton
            aria-label="メニューボタン"
            icon={<HamburgerIcon />}
            size="sm" variant="unstyled"
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
        />
    )
})
```

+ `src/components/organisms/layout/Header.tsx`を編集<br>

```
import { Box, Button, Drawer, DrawerContent, DrawerBody, DrawerOverlay, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link>ユーザー一覧</Link>
                    </Box>
                    <Link>設定</Link>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
            <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerBody p={0} bg="gray.100">
                            <Button w="100%">TOP</Button>
                            <Button w="100%">ユーザー一覧</Button>
                            <Button w="100%">設定</Button>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
});
```

+ `src/components/molecules`ディレクトリを作成<br>

+ `src/components/molecules/MenuDrawer.tsx`コンポーネントを作成<br>

```
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
    onClose: () => void;
    isOpen: boolean;
}

export const MenuDrawer: VFC<Props> = memo((props) => {

    const { onClose, isOpen } = props;

    return (
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerBody p={0} bg="gray.100">
                        <Button w="100%">TOP</Button>
                        <Button w="100%">ユーザー一覧</Button>
                        <Button w="100%">設定</Button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
})
```

+ `src/components/organisms/layout/Header.tsx`を編集<br>

```
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link>ユーザー一覧</Link>
                    </Box>
                    <Link>設定</Link>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
            <MenuDrawer onClose={onClose} isOpen={isOpen} />
        </>
    );
});
```

## ヘッダーの作成(ルーティング機能の実装)

+ `src/components/organisms/layout/Header.tsx`を編集<br>

```
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const history = useHistory();

    const onClickHome = useCallback(() => history.push("/home"), []);
    const onClickUserManagement = useCallback(() => history.push("/home/user_management"), []);
    const onClickSetting = useCallback(() => history.push("/home/setting"), []);

    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
                    </Box>
                    <Link onClick={onClickSetting}>設定</Link>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
            <MenuDrawer onClose={onClose} isOpen={isOpen} />
        </>
    );
});
```

+ `src/components/molecules/MenuDrawer.tsx`を編集<br>

```
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onClickHome: () => void;
    onClickUserManagement: () => void;
    onClickSetting: () => void;
}

export const MenuDrawer: VFC<Props> = memo((props) => {

    const { onClose, isOpen, onClickHome, onClickUserManagement, onClickSetting } = props;

    return (
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerBody p={0} bg="gray.100">
                        <Button w="100%" onClick={onClickHome}>TOP</Button>
                        <Button w="100%" onClick={onClickUserManagement}>ユーザー一覧</Button>
                        <Button w="100%" onClick={onClickSetting}>設定</Button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
})
```

+ `src/components/organisms/layout/Header.tsx`を編集<br>

```
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const history = useHistory();

    const onClickHome = useCallback(() => history.push("/home"), []);
    const onClickUserManagement = useCallback(() => history.push("/home/user_management"), []);
    const onClickSetting = useCallback(() => history.push("/home/setting"), []);

    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
                    </Box>
                    <Link onClick={onClickSetting}>設定</Link>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
            <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickUserManagement={onClickUserManagement} onClickSetting={onClickSetting} />
        </>
    );
});
```

## ログイン画面の作成

+ `src/components/pages/Login.tsx`を編集<br>

```
import { Box, Button, Flex, Heading, Input, Divider, Stack } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const Login: VFC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" />
          <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>ログイン</Button>
        </Stack>
      </Box>
    </Flex>
  );
});
```

## ログイン画面の作成(コンポーネント分割)

+ `src/components/atoms/button/PrimaryButton.tsx`コンポーネントを作成<br>

```
import { Button } from "@chakra-ui/button";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
}

export const PrimaryButton: VFC<Props> = memo((props) => {
    const { children } = props;

    return (
      <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>{children}</Button>
    )
})
```

+ `src/components/pages/Login.tsx`を編集<br>

```
import { Box, Flex, Heading, Input, Divider, Stack } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton"

export const Login: VFC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" />
          <PrimaryButton>ログイン</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
```

## ログイン機能の実装

+ axiosをインストール<br>

+ `$ npm install axios --save or $ yarn add axios --save`<br>

+ `src/components/pages/Login.tsx`を編集<br>

```
import { Box, Flex, Heading, Input, Divider, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: VFC = memo(() => {
  const [userId, setUserId] = useState(""); // テキストボックスなので初期値は空文字

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton>ログイン</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
```

+ `src/hooks`ディレクトリを作成<br>

+ `src/types`ディレクトリを作成<br>

+ `src/types/api`ディレクトリを作成<br>

+ `src/types/api/user.ts`ファイルを作成<br>

```
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}
```

+ `src/hooks/useAuth.ts`ファイルを作成<br>

```
import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";

export const useAuth = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        history.push("/home");
      } else {
        alert("ユーザーが見つかりません");
      }
    })
      .catch(() => alert("ログインできません"))
      .finally(() => setLoading(false));
  }, [history]);
  return { login, loading }
}
```

+ `tsconfig.json`を編集<br>

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext",
      "ES2018" // 追記
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

+ `src/components/atoms/button/PrimaryButton.tsx`を編集<br>

```
import { Button } from "@chakra-ui/button";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo(props => {
  const { children, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
```

+ `src/components/pages/Login.tsx`を編集<br>

```
import { Box, Flex, Heading, Input, Divider, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const [userId, setUserId] = useState(""); // テキストボックスなので初期値は空文字

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onClickLogin = () => login(userId);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton onClick={onClickLogin}>ログイン</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
```

+ `src/components/atoms/button/PrimaryButton.tsx`を編集<br>

```
import { Button } from "@chakra-ui/button";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo(props => {
  const { children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
```

+ `src/components/pages/Login.tsx`を編集<br>

```
import { Box, Flex, Heading, Input, Divider, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const [userId, setUserId] = useState(""); // テキストボックスなので初期値は空文字

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onClickLogin = () => login(userId);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
```

## メッセージ表示機能の実装

+ `src/hooks/useMessage.ts`ファイルを作成<br>

```
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error"; // この中の文字列しか受け取れない方になる
}

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback((props: Props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true
    })
  }, [toast]);
  return { showMessage }
}
```

+ `src/hooks/useAuth.ts`を編集<br>

```
import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        showMessage({ title: "ログインしました", status: "success" })
        history.push("/home");
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
      }
    })
      .catch(() => showMessage({ title: "ログインできません", status: "error" }))
      .finally(() => setLoading(false));
  }, [history, showMessage]);
  return { login, loading }
}
```

## ユーザー一覧画面の作成<br>

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
import { Wrap, WrapItem } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const UserManagement: VFC = memo(() => {
  return (
    <Wrap spacing="30px">
      {[...Array(10)].map(() =>
        <WrapItem>
          <div
            style={{ width: "100px", height: "100px", backgroundColor: "teal" }}
          />
        </WrapItem>
      )}
    </Wrap>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を再編集<br>

```
import { Box, Image, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const UserManagement: VFC = memo(() => {
  return (
    <Wrap p={{ base: 4, md: 10 }}>
      <WrapItem>
        <Box
          w="260px"
          h="260px"
          bg="white"
          borderRadius="10px"
          shadow="md"
          p={4}
          _hover={{ cursor: "pointer", opacity: 0.8 }}
        >
          <Stack textAlign="center">
            <Image
              borderRadius="full"
              boxSize="160px"
              src="https://source.unsplash.com/random"
              alt="プロフィール画像"
              m="auto"
            />
            <Text fontSize="lg" fontWeight="bold">たかぼー</Text>
            <Text fontSize="sm" color="gray">Takaki Nakamura</Text>
          </Stack>
        </Box>
      </WrapItem>
    </Wrap>
  );
});
```

+ `src/components/organisms/user`ディレクトリを作成<br>

+ `src/components/organinsms/user/UserCard.tsx`コンポーネントを作成<br>

```
import { Image } from "@chakra-ui/image";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";

type Props = {
  imageUrl: string;
  userName: string;
  fullName: string;
};

export const UserCard: VFC<Props> = memo(props => {
  const { imageUrl, userName, fullName } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={userName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
    </>
  );
});
```

## ユーザー一覧取得機能の実装

+ `src/hooks/useAllUsers.ts`ファイルを作成<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react"
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, [])

  return { getUsers, loading, users }
}
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }}>
        {users.map((user) => (
          <WrapItem key={user.id} mx="atuo">
            <UserCard
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
    </>
  );
});
```

## ユーザー詳細モーダル画面の作成

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback(() => onOpen(), []);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <p>テスト</p>
      </ModalContent>
    </Modal>
    </>
  );
});
```

+ `src/components/organisms/user/UserCard.tsx`を編集<br>

```
import { Image } from "@chakra-ui/image";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";

type Props = {
  imageUrl: string;
  userName: string;
  fullName: string;
  onClick: () => void;
};

export const UserCard: VFC<Props> = memo(props => {
  const { imageUrl, userName, fullName, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={onClick}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={userName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を再編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, FormControl, FormLabel, Input, Wrap, Spinner, Stack, WrapItem, Modal, ModalContent, ModalOverlay, useDisclosure, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback(() => onOpen(), []);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value="たかき" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value="Takaki Nakamura" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value="1234@example.com" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value="090-1111-2222" isReadOnly />
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
});
```

+ `src/components/organisms/user/UserDetailModal.tsx`コンポーネントを作成<br>

```
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const UserDetailModal: VFC<Props> = memo(props => {
  const { isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value="たかき" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value="Takaki Nakamura" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value="1234@example.com" isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value="090-1111-2222" isReadOnly />
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback(() => onOpen(), []);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
```

## ユーザー詳細モーダル機能の実装

+ `src/components/organisms/user/UserCard.tsx`を編集<br>

```
import { Image } from "@chakra-ui/image";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";

type Props = {
  id: number;
  imageUrl: string;
  userName: string;
  fullName: string;
  onClick: (id: number) => void;
};

export const UserCard: VFC<Props> = memo(props => {
  const { id, imageUrl, userName, fullName, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={userName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    console.log(id); // user.idが取得できるか確認
    onOpen()
  }, []);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              id={user.id}
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
```

+ `src/hooks/useSelectUser.ts`ファイルを作成<br>

```
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
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  console.log(selectedUser);

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    console.log(id);
    onSelectUser({ id, users, onOpen })
  }, [users]);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              id={user.id}
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
```

+ `src/components/organisms/user/UserDetailModal.tsx`を編集<br>

```
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { User } from "../../../types/api/user";

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export const UserDetailModal: VFC<Props> = memo(props => {
  const { user, isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={user?.username} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={user?.name} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={user?.email} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={user?.phone} isReadOnly />
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disabled react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    // console.log(id);
    onSelectUser({ id, users, onOpen })
  }, [users, onSelectUser, onOpen]);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              id={user.id}
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});
```

## ログインユーザー情報をContextに保持してみる

+ `src/providers`ディレクトリを作成<br>

+ `src/providers/LoginUserProvider.tsx`コンポーネントを作成<br>

```
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { User } from "../types/api/user";

export type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
```

+ `src/router/Router.tsx`を編集<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) =>
            <Switch>
              {HomeRoutes.map(route =>
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>
                    {route.children}
                  </HeaderLayout>
                </Route>
              )}
            </Switch>}
        />
        <Route path="*">
          <Page404 />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
});
```

+ `src/hooks/useLoginUser.ts`ファイルを作成<br>

```
import { useContext } from "react";
import { LoginUserContext, LoginUserContextType } from "../providers/LoginUserProvider";

export const useLoginUser = (): LoginUserContextType => useContex(LoginUserContext)
```

+ `src/hooks/useAuth.ts`を編集<br>

```
import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        setLoginUser(res.data);
        showMessage({ title: "ログインしました", status: "success" })
        history.push("/home");
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false)
      }
    })
      .catch(() => {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false)
      });
  }, [history, showMessage, setLoginUser]);
  return { login, loading }
}
```

+ `src/router/Router.tsx`を編集<br>

```
import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) =>
            <Switch>
              {HomeRoutes.map(route =>
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>
                    {route.children}
                  </HeaderLayout>
                </Route>
              )}
            </Switch>}
        />
      </LoginUserProvider>
        <Route path="*">
          <Page404 />
        </Route>
    </Switch>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser); // ログインしているユーザーのIDが確認できる

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    // console.log(id);
    onSelectUser({ id, users, onOpen })
  }, [users, onSelectUser, onOpen]);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              id={user.id}
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});
```

## 管理者ユーザーを想定してフラグをcontextに保持してみる

+ `src/providers/LoginUserProvider.tsx`を編集<br>

```
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { User } from "../types/api/user";

type LoginUser = User & { isAdmin: boolean } // Userの型に isAdmin: booleanを追加

export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
```

+ `src/hooks/useAuth.ts`を編集<br>

```
import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if (res.data) {
        const isAdmin = res.data.id === 10 ? true : false;
        setLoginUser({ ...res.data, isAdmin });
        showMessage({ title: "ログインしました", status: "success" })
        history.push("/home");
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false)
      }
    })
      .catch(() => {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false)
      });
  }, [history, showMessage, setLoginUser]);
  return { login, loading }
}
```

## 管理者ユーザーのみユーザー情報を編集できる導線の作成

+ `src/components/organisims/user/UserDetailModal.tsx`を編集<br>

```
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  user: User | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const UserDetailModal: VFC<Props> = memo(props => {
  const { user, isOpen, isAdmin = false, onClose } = props;

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setUsername(user?.username ?? '')
    setName(user?.name ?? '')
    setEmail(user?.email ?? '')
    setPhone(user?.phone ?? '')
  }, [user])

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)

  const onClickUpdate = () => alert()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={username} onChange={onChangeUserName} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>フルネーム</FormLabel>
              <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
            </FormControl>
            <FormControl>
              <FormLabel>TEL</FormLabel>
              <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
            </FormControl>
          </Stack>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});
```

+ `src/components/pages/UserManagement.tsx`を編集<br>

```
/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Wrap, Spinner, WrapItem, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  // console.log(loginUser);

  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    // console.log(id);
    onSelectUser({ id, users, onOpen })
  }, [users, onSelectUser, onOpen]);

  return (
    <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {users.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              id={user.id}
              imageUrl="https://source.unsplash.com/random"
              userName={user.username}
              fullName={user.name}
              onClick={onClickUser}
            />
          </WrapItem>
          ))}
      </Wrap>
    )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} isAdmin={loginUser?.isAdmin} onClose={onClose} />
    </>
  );
});
```
