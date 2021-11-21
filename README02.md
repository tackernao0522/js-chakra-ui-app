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
