## Chakra UIの導入

`$ npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 or $ yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4`<br>

## Chakra Iconの導入

`$ npm i @chakra-ui/icons`<br>

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
