# react-bread-crumb

[![NPM](https://img.shields.io/npm/v/@jan-leila/react-bread-crumb.svg)](https://www.npmjs.com/package/@jan-leila/react-bread-crumb) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @jan-leila/react-bread-crumb
```

## Basic Usage

```jsx
import React, { Component } from 'react'

import { Breadcrumb, useTrailView, useCrumb } from '@jan-leila/react-bread-crumb'

const App = () => {
  return (
    return <Breadcrumb>
      {/* your app goes here*/}
    </Breadcrumb>
  )
}

const Header = () => {
  const trail = useTrail()
  /* render trail here */
}

const Page = () => {
  useCrumb()
}
```

## Advanced usage

`useRawTrail()` - the raw trail can get exported if you would like to use it to re initialize it when Breadcrumb reloads    
`<Breadcrumb trail={...} />` - trail can be provided to Breadcrumb to initialize the crumb on reloads   
`useRootCrumb(crumb)` - useRootCrumb can be used to set a root element that will reset the trail   
`<RootCrumb crumb={...} />` - RootCrumb can be used in the same way as useRootCrumb   
`useCrumb(crumb, id)` - useCrumb can be provided and id that will be used to truncate the trail when a match is found earlier in the trail   
`<Crumb crumb={...} id={...} />` - Crumb can be used in the same way as useCrumb   

## License

MIT © [jan-leila](https://github.com/jan-leila)
