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
