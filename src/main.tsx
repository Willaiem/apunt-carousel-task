import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Carousel } from './Carousel'
import { offers } from './json/offers.json'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Carousel offers={offers} />
  </React.StrictMode>
)
