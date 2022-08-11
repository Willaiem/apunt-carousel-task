type Image = {
  alt: string
  url: string
}

type SellingMode = {
  active: boolean
}

type Price = {
  amount: string
  currency: string
}

type BuyNowMode = SellingMode & {
  price: {
    sale: Price
  }
}

type AdvertisementMode = SellingMode & {
  price: Price
}

type AuctionMode = SellingMode & {
  price: {
    current: Price
  }
}

type CartMode = {
  active: boolean
}

export type Offer = {
  allegroLocally: {
    location: {
      label: string
    }
  }
  id: string
  images: Image[]
  name: string
  publication: {
    endingAt: string
    startingAt: string
  }
  seller: {
    id: string
  }
  sellingMode: {
    buyNow?: BuyNowMode
    cart: CartMode
    advertisement?: AdvertisementMode
    auction?: AuctionMode
  }
  shipping: {
    priceWithDeliveryLabel: string
  }
  view: {
    type: string
    url: string
  }
}
