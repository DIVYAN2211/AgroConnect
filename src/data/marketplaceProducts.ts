export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  amazonLink: string;
}

export const categories = [
  'seeds',
  'fertilizers',
  'pesticides',
  'tools',
  'machinery',
  'irrigation'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Sunflower Seeds',
    description: 'High-quality Sunflower seeds for optimal yield',
    price: 399,
    image: 'https://m.media-amazon.com/images/I/41L6UXkE-KL._SX300_SY300_QL70_FMwebp_.jpg',
    category: 'seeds',
    amazonLink: 'https://www.amazon.in/LIVYOR-Flax-Seeds-Unroasted-Omega/dp/B092TSHPJL/ref=sr_1_1_sspa?crid=339HN6HGPYHWZ&dib=eyJ2IjoiMSJ9.HTKbhQZO_H8xyUA51WdaP5B3SL50QmlUfuB3vMKQDNzo7OwRCLLBUn-UtqYdfQ3gN5Tw3UOzDsB9Awu-QuBkxoV5E-Zbc1inGjcoemh9Yu3yMjIpvTPWFi4eAfrbBWg9motiDOm2GpSvNoxXB_dDUh7AhyhlG1V63xHwvzbqt8L8NXmyouMnDmpj9NsQrcP2w78IRt_l6ucTcx3LXcF9vFosM7vkPSeEzHe3EL-f9K6pwe_yJCHED_ho6xew_fU5Zlh1nqcSLw2cwY6Zb4Jli0Y1RdkXmmXaIFy6AFHRsBk.ABQaQNQl9gKe2ai-Utqf6wStLBDuydUAWhwPyrMHBzM&dib_tag=se&keywords=premium%2Bseed&qid=1745899959&sprefix=premium%2Bseed%2Caps%2C267&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'
  },
  {
    id: '2',
    name: 'Organic Liquid Fertilizer',
    description: 'Natural fertilizer for healthy plant growth',
    price: 599,
    image: 'https://m.media-amazon.com/images/I/51aZphMcWaL._SY500_.jpg',
    category: 'fertilizers',
    amazonLink: 'https://www.amazon.in/LASYA-FERTILIZERS-Organic-Fertilizer-Natural/dp/B0DV9RFYH3/ref=sr_1_1_sspa?adgrpid=58082751599&dib=eyJ2IjoiMSJ9.En9Jigqf03J4_MP53QSGyB3oDJ0OR--YOixZEkYnNKjKyCVv-ff4wjMdgyjjL6HIJmnkBle30bodjgToWHapcfeTuHjUlPTr5m6xloLY0mh0sxHAegiAoi8ZxmxdKZo3VPccR8DpJxpK6CkDdGPJMdU6ib4ZG-ZaJowc-nMaY26OakVQsJBDSV5R7g1tODGREp9lR8Qycr8gP1elL41nlrYN3wpzpTP2z6aALxMQ6CmxuIlbe-3YyEPhsxW0wUneNJegWv5DpJdaKjEYXLtseYP7JT3QUpAoeS46eOA_lyQ.ZKLSFpz_EeLV86UMnCnQAsH2-brZUDPkLWg5eY_Xn_o&dib_tag=se&ext_vrnc=hi&hvadid=590712074606&hvdev=c&hvlocphy=9153100&hvnetw=g&hvqmt=e&hvrand=8241582978170339336&hvtargid=kwd-447374980733&hydadcr=24566_2265454&keywords=amazon+fertilizer&mcid=fce29ae6d33d3f0583eb3223d5b15833&nsdOptOutParam=true&qid=1745899774&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
  },
  {
    id: '3',
    name: 'Eco-Friendly Pesticide',
    description: 'Safe and effective pest control solution',
    price: 299,
    image: 'https://m.media-amazon.com/images/I/31OPHzDqCML._SY445_SX342_QL70_FMwebp_.jpg',
    category: 'pesticides',
    amazonLink: 'https://www.amazon.in/Cold-Pressed-Concentration-Sucking-Caterpillar-Control/dp/B0CXXLT212/ref=sr_1_1_sspa?crid=74H70MPH9SH1&dib=eyJ2IjoiMSJ9.GFO4aUhjv6VnBiydhWllKIG4bcuNCqAiMxGztqeE-IHPw36-m856Uyn2poMVYIPygg2DdBcmFoxGEF9OCN88aK0Cu5UuJwM7u2sEXlzX9pLBFEqZKyPCK-VQFHHOyuICUgI2zv99E8B16ko9ZAr0RNcUu5LxltOmT0RSYQv3A8MUE5jgANQddwcg2k9Vpl9m5DA_wqmcJi1VfiZfBO3TdS-bBo6OW9OUAMrbM6TdD5GPG2NpiINmE4H44N8JEAmr4jsi-HysLC0gjwaUgcS6jxkEdB9hpohosn9U2cbH6DE.KALTsQid07h17RsLRQaArjaPKv7ex7Gkgi2Dtr8xbW4&dib_tag=se&keywords=pesticide&qid=1745900031&sprefix=pesticide%2Caps%2C371&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'
  },
  {
    id: '4',
    name: 'Professional Pruning Shears',
    description: 'High-quality pruning shears for precise cutting',
    price: 539,
    image: 'https://m.media-amazon.com/images/I/41shi8v+MPL._SY300_SX300_.jpg',
    category: 'tools',
    amazonLink: 'https://www.amazon.in/Cinagro-Hedge-Shears-Gardening-Scissors/dp/B0CHK2V4ZW/ref=sr_1_2_sspa?crid=19DAIUK8IBMCT&dib=eyJ2IjoiMSJ9.eci8H2A9TlJnwK046iCPd0Cl4RHGJzE9YKasfUv60k6m_8a05w2iR-uO_PEaWn8IT2vYtlSbgQhFJNpjjqbF-jEcoikfrVL3gYBIuGxgTJQVuzZkbrCTCtkX7-S-xfZyGqggrVRO-FWktkVNjTK7XDp4E8uhEt38ET9K_ad6qSF6pAixWSwGoU7MKZgVSN27c-qFWV_y1YCKaIIKHQk5Ul-ahN07AR8laW8eCYjaypkoOQB40v1CXmUjNLyks0cyigvpSY6EoC4C_DiG672-4gIfyUH-euOar7cmTlFE0-g.jmZUocrgqek2cwEczYGAQfGvPvmLGIJvzE_Z_vLGMlc&dib_tag=se&keywords=agri+tools&qid=1745900131&sprefix=agri+tool%2Caps%2C292&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
  },
  {
    id: '5',
    name: 'Mini Tractor',
    description: 'Compact tractor for small to medium farms',
    price: 14734,
    image: 'https://m.media-amazon.com/images/I/5103DSkQhGL._SX300_SY300_QL70_FMwebp_.jpg',
    category: 'machinery',
    amazonLink: 'https://www.amazon.in/Simplify-Farming-Garden-Tiller-Cultivator/dp/B07ZM2SKHB/ref=sr_1_1_sspa?crid=8FAUL8WFLW9N&dib=eyJ2IjoiMSJ9.5IhMPVAHQbPzOmIr19Z8_UFshqcObM_FULl3NajxA4jWgSt9B3gzF4uqAhASz4oMyGEVuTMrOZ3LWxh9TRBpLaPfqibA50-Iu9o_4Fsz02tR8tnWl7WKEYRk3315tSal-I1zlIFCb-TLxOe4w7jzwrPOLpr0sF2Bcqua-sNgFenXRT0GnVieyJM-tXo5_zwTgehaIBUiNWlg7HJ4xR2H2EJLnldOzptah3JtT8o2Usc.TYf-G8arEm9TUYtlxSIrZgijLvQtLtTTuKnkfhpLYRc&dib_tag=se&keywords=mini+tractor+for+agriculture+use&qid=1745900286&sprefix=mini+tractor+for+%2Caps%2C246&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
  },
  {
    id: '6',
    name: 'Drip Irrigation Kit',
    description: 'Complete drip irrigation system for efficient watering',
    price: 1355,
    image: 'https://m.media-amazon.com/images/I/71+488Q3p-L._SX425_.jpg',
    category: 'irrigation',
    amazonLink: 'https://www.amazon.in/Trust-Basket-Drip-Irrigation-Plants/dp/B07LD3LPL5/ref=sr_1_4_sspa?crid=3VVBKW3S3YORP&dib=eyJ2IjoiMSJ9.fWlWazA41YJ_lWggrOCh_3ugdBKZzcLh8_MBnvZhCzjtL1lqveVGhIAwAbwLE-qr7X-Y_HpJaad5xdZqc1xR_7a5TP-5PmHq3RLjdARBaahaxlR4GxL_iyPOHGERoJZJvH2RRyMYDgd5G4McIurl5mOnvJJCft6mPZQrkPvTtUjQZQBi9ThqJPIRdUb5397qapxfsnHk1WTf7gAfnCu0pPjcHAn-14lRt2mG6HqP0XB5KjFCXnxPWs9A0HEZg29pQ1wDle4TJL39cddQQglvtBskvzf596zidPYvcnuJ7Nw.yjhAF3uuPWz5lf3CioFQUJ0iqfc5DCLwqLxu3T17e_4&dib_tag=se&keywords=drip%2Birrigation%2Bkit&qid=1745900490&sprefix=drip%2Birr%2Caps%2C283&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'
  },

  {
    id: '7',
    name: 'TrustBasket Vermicompost 5kg 100% Natural Organic Fertilizer for Plants ',
    description: 'Nutrient-Rich Compost for Home Garden',
    price: 249,
    image: 'https://m.media-amazon.com/images/I/71zxEAIaI7L._SX679_.jpg',
    category: 'fertilizers',
    amazonLink: 'https://www.amazon.in/TrustBasket-Organic-Vermicompost-Fertilizer-Manure/dp/B07PRXV7MJ/ref=sr_1_1_sspa?crid=1N1P2VE85G5O1&dib=eyJ2IjoiMSJ9.KV_9pfUAuoJN5sUDdo7HFJw5qx81748HzW4ivWtYh0PSJf5EJRoTLYIxVHoNYYCyw6Y-rBUoe8ozt123qGkdsk0p-BUcCeIm-T_zCvyDf81MUXARS9o5r7MBU-0FFahSqHzn-FPu6KbFPvIR1EtRqQvmR9RXyBGd1gJlJxL5jjynnoPlvxHi1OTJoPZzT5me8kKbhLSMwixvbp25QZhTcXehJsHv9TS8CV82EarH9mzHWN8Vn7oEVueoGWKYf1I7wNwkFKdFRM5TxvvOwLrHdKqWH2eaZspX94SWSurbL7M.4fZQWl-h22yfG16usvwQl7VBEI1mn75TLjbNECu62m8&dib_tag=se&keywords=fertilizer&qid=1745901278&sprefix=fertilizer%2Caps%2C288&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
    },

    {
      id: '8',
      name: 'Premium Bean Seeds',
      description: 'High-quality Bean seeds for optimal yield',
      price: 90,
      image: 'https://m.media-amazon.com/images/I/81JUQr-QBLL._SY879_.jpg',
      category: 'seeds',
      amazonLink: 'https://www.amazon.in/Native-Non-GMO-Vegetable-Germination-Instruction/dp/B09N1P962T/ref=sr_1_7?crid=3S7DQZEER3OA5&dib=eyJ2IjoiMSJ9.NqadJ0JsKKAKE858stfJFobLN0ggCI4NU6w_W4Nsczmes_s0P_yh8CZgJUT0bXnA0glhFc6MwpAapEmW7BMGuyXmLlwA-EEOSpTpLT7FwhX-6r1KZJUFYiPvCD8X8SQPxmOvXFY-ehPmc-VBPhVf0QT69bMXDaJ8UFxr77xFyc1rjTc92UGZ1RQRNM0j7K_nKEOYafZ5I9GhiGEIscQcE80xZS75DQFDcjFscHlwiQK6kCTG9-ev_fHR_tIm2hJ5YhQt_Po1QeP_wSxp5o_66-L6UkftfPODS4YJtLqfki4.mu2gyTxgEee6xnMmrgZqCh3RXcn1zGc7m6LAWCA--WU&dib_tag=se&keywords=agri+seeds&qid=1745901857&sprefix=agri+seeds%2Caps%2C238&sr=8-7'
    },
    {
      id: '9',
      name: 'Organic NPK Fertilizer',
      description: 'Natural fertilizer for healthy plant growth',
      price: 179,
      image: 'https://m.media-amazon.com/images/I/71KdSj45HqL._SX679_.jpg',
      category: 'fertilizers',
      amazonLink: 'https://www.amazon.in/Go-Garden-19-Fertilizer-Gardening/dp/B0C5JWLJ8P/ref=sr_1_7?crid=2TZ2L6X63JINZ&dib=eyJ2IjoiMSJ9.QV-0XUcfS9ZGzOzKpmUrYoSaB0Bh_YHof0f6PWvg6bjSJf5EJRoTLYIxVHoNYYCybniKE2I-Bj06EKAUDFPrsZzHTtvOiee9ChIsiRaIktANTGjBPCHBBqrTL9aO7zjFdjp5DweLSeScK9T8RwqRNbThEc28-dbLHnToTdbvm8LFwxQhwqvzwDyLJg6ig64NuL2-qN4-p_7ynHy0S5dtt1UckCbMqKbaJWQqSJ30paHmNoW6UU4nomQpIkm3D3cecDurdS5lcWPyKbu-enHP5rpM2P20MMheSzpqH2PpECI.Xpvdp-7wL7qRQ5oMjflI3VA8JRV1cKl6DWkUh1SZZNI&dib_tag=se&keywords=fertilizers&qid=1745902187&sprefix=fertilizers%2Caps%2C254&sr=8-7&th=1'
    },

    {
      id: '10',
      name: 'Organic Liquid Fertilizer',
      description: 'Natural fertilizer for healthy plant growth',
      price: 299,
      image: 'https://m.media-amazon.com/images/I/61VtFcN504L._SX522_.jpg',
      category: 'fertilizers',
      amazonLink: 'https://www.amazon.in/Garden-Genie-Fertilizer-Suitable-Varieties/dp/B0DV3DZ9GH/ref=sr_1_21_sspa?crid=246BZ2YSEPEJZ&dib=eyJ2IjoiMSJ9.QV-0XUcfS9ZGzOzKpmUrYoSaB0Bh_YHof0f6PWvg6bjSJf5EJRoTLYIxVHoNYYCybniKE2I-Bj06EKAUDFPrsZzHTtvOiee9ChIsiRaIktANTGjBPCHBBqrTL9aO7zjFdjp5DweLSeScK9T8RwqRNbThEc28-dbLHnToTdbvm8LFwxQhwqvzwDyLJg6ig64NuL2-qN4-p_7ynHy0S5dtt1UckCbMqKbaJWQqSJ30paHmNoW6UU4nomQpIkm3D3cecDurdS5lcWPyKbu-enHP5rpM2P20MMheSzpqH2PpECI.Xpvdp-7wL7qRQ5oMjflI3VA8JRV1cKl6DWkUh1SZZNI&dib_tag=se&keywords=fertilizers&qid=1745902837&sprefix=fertilizers%2Caps%2C789&sr=8-21-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1'
      },

      {
        id: '11',
        name: 'Organic Liquid Fertilizer',
        description: 'Natural fertilizer for healthy plant growth',
        price: 242,
        image: 'https://m.media-amazon.com/images/I/41ovOUoE2rL._SY445_SX342_QL70_FMwebp_.jpg',
        category: 'fertilizers',
        amazonLink: 'https://www.amazon.in/OrganicDews-Liquid-Seaweed-Extract-Measuring/dp/B00VASGL7W/ref=sr_1_12?crid=26TSUDWL4J6YL&dib=eyJ2IjoiMSJ9.QV-0XUcfS9ZGzOzKpmUrYoSaB0Bh_YHof0f6PWvg6bjSJf5EJRoTLYIxVHoNYYCybniKE2I-Bj06EKAUDFPrsZzHTtvOiee9ChIsiRaIktANTGjBPCHBBqrTL9aO7zjFdjp5DweLSeScK9T8RwqRNbThEc28-dbLHnToTdbvm8LFwxQhwqvzwDyLJg6ig64NuL2-qN4-p_7ynHy0S5dtt1UckCbMqKbaJWQqSJ30paHmNoW6UU4nomQpIkm3D3cecDurdS5lcWPyKbu-enHP5rpM2P20MMheSzpqH2PpECI.Xpvdp-7wL7qRQ5oMjflI3VA8JRV1cKl6DWkUh1SZZNI&dib_tag=se&keywords=fertilizers&qid=1745903079&sprefix=fertilizers%2Caps%2C260&sr=8-12&th=1'
       },

       {
        id: '12',
        name: 'Organic Fertilizer',
        description: 'Natural fertilizer for healthy plant growth',
        price: 259,
        image: 'https://m.media-amazon.com/images/I/71tXcQ1H76L._SX522_.jpg',
        category: 'fertilizers',
        amazonLink: 'https://www.amazon.in/All-Purpose-Fertilizer-Plant-Grams/dp/B07XTHQNBG/ref=sr_1_29?dib=eyJ2IjoiMSJ9.QV-0XUcfS9ZGzOzKpmUrYoSaB0Bh_YHof0f6PWvg6bjSJf5EJRoTLYIxVHoNYYCybniKE2I-Bj06EKAUDFPrsZzHTtvOiee9ChIsiRaIktANTGjBPCHBBqrTL9aO7zjFdjp5DweLSeScK9T8RwqRNbThEc28-dbLHnToTdbvm8LFwxQhwqvzwDyLJg6ig64NuL2-qN4-p_7ynHy0S5dtt1UckCbMqKbaJWQqSJ30paHmNoW6UU4nomQpIkm3D3cecDurdS5lcWPyKbu-enHP5rpM2P20MMheSzpqH2PpECI.Xpvdp-7wL7qRQ5oMjflI3VA8JRV1cKl6DWkUh1SZZNI&dib_tag=se&keywords=fertilizers&qid=1745903458&sr=8-29&th=1'
       },

       {
        id: '13',
        name: 'Eco-Friendly Pesticide',
        description: 'Safe and effective pest control solution',
        price: 274,
        image: 'https://m.media-amazon.com/images/I/51kO5oHJ8CL._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/Natural-Organic-Pressed-Concentrate-Measuring/dp/B075TJ546L/ref=sr_1_8?crid=DB26TEZPPJLJ&dib=eyJ2IjoiMSJ9.PgtoyJH4GtvsmC6kiPH_Q_AnWDY8KvtF-XfAw60YkIbRwdatii_5TSd1ZoWPX0UYKlSbczP8z46ZGOLuVYtTEYn9eX4Rx-poC6WdXToVZRlFOOAurgmLyFx_0eED91B09YkNhc1N5DoVSAZnJBbl0i5sYAlt6WR90Bxg1U7a0mUwayXmXMJY9uugm3YbjtyPTwE0J5qqcoEnpa2Ph7d6QfK1x0gF0ifTfPYlE1pvBKjAHirkvvcJNDOOTu0aSeFukyYfqXZ1bf28xDbKnVZ4rGVYt-SzvY97qR4tz7c5nZc.NFUVsPKrZT5FDCzAZyoU02LBV8Qxs8LI7-FP80bEumw&dib_tag=se&keywords=pesticides%2Bfor%2Bplants&qid=1745905839&sprefix=pesticides%2Caps%2C2103&sr=8-8&th=1'
      },

      {
        id: '14',
        name: 'Eco-Friendly Pesticide',
        description: 'Safe and effective pest control solution',
        price: 189,
        image: 'https://m.media-amazon.com/images/I/41H5Z+gBJzL._SX342_SY445_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/Go-Garden-Trichoderma-Fungicide-plants/dp/B0C7CMWKJ1/ref=sr_1_11?crid=DB26TEZPPJLJ&dib=eyJ2IjoiMSJ9.PgtoyJH4GtvsmC6kiPH_Q_AnWDY8KvtF-XfAw60YkIbRwdatii_5TSd1ZoWPX0UYKlSbczP8z46ZGOLuVYtTEYn9eX4Rx-poC6WdXToVZRlFOOAurgmLyFx_0eED91B09YkNhc1N5DoVSAZnJBbl0i5sYAlt6WR90Bxg1U7a0mUwayXmXMJY9uugm3YbjtyPTwE0J5qqcoEnpa2Ph7d6QfK1x0gF0ifTfPYlE1pvBKjAHirkvvcJNDOOTu0aSeFukyYfqXZ1bf28xDbKnVZ4rGVYt-SzvY97qR4tz7c5nZc.NFUVsPKrZT5FDCzAZyoU02LBV8Qxs8LI7-FP80bEumw&dib_tag=se&keywords=pesticides%2Bfor%2Bplants&qid=1745905839&sprefix=pesticides%2Caps%2C2103&sr=8-11&th=1'
       },

       {
        id: '15',
        name: 'Bio Meta Cure (Metarhizium Anisopliae Liquid)',
        description: 'Safe and effective pest control solution',
        price: 280,
        image: 'https://m.media-amazon.com/images/I/31P0SzcAfgL._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/WET-TREE-Metarhizium-Anisopliae-Insecticide/dp/B0D6R2S5TT/ref=sr_1_14?crid=DB26TEZPPJLJ&dib=eyJ2IjoiMSJ9.PgtoyJH4GtvsmC6kiPH_Q_AnWDY8KvtF-XfAw60YkIbRwdatii_5TSd1ZoWPX0UYKlSbczP8z46ZGOLuVYtTEYn9eX4Rx-poC6WdXToVZRlFOOAurgmLyFx_0eED91B09YkNhc1N5DoVSAZnJBbl0i5sYAlt6WR90Bxg1U7a0mUwayXmXMJY9uugm3YbjtyPTwE0J5qqcoEnpa2Ph7d6QfK1x0gF0ifTfPYlE1pvBKjAHirkvvcJNDOOTu0aSeFukyYfqXZ1bf28xDbKnVZ4rGVYt-SzvY97qR4tz7c5nZc.NFUVsPKrZT5FDCzAZyoU02LBV8Qxs8LI7-FP80bEumw&dib_tag=se&keywords=pesticides%2Bfor%2Bplants&qid=1745905839&sprefix=pesticides%2Caps%2C2103&sr=8-14&th=1'
       },
       {
        id: '16',
        name: 'Nubilous 500 ML Plant Guard',
        description: 'Safe and effective pest control solution',
        price: 298,
        image: 'https://m.media-amazon.com/images/I/31g7L-ysi3L._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/Nubilous-Plant-Organic-Pressed-Mealybugs/dp/B0DJT9NC7Z/ref=sr_1_31?crid=DB26TEZPPJLJ&dib=eyJ2IjoiMSJ9.PgtoyJH4GtvsmC6kiPH_Q_AnWDY8KvtF-XfAw60YkIbRwdatii_5TSd1ZoWPX0UYKlSbczP8z46ZGOLuVYtTEYn9eX4Rx-poC6WdXToVZRlFOOAurgmLyFx_0eED91B09YkNhc1N5DoVSAZnJBbl0i5sYAlt6WR90Bxg1U7a0mUwayXmXMJY9uugm3YbjtyPTwE0J5qqcoEnpa2Ph7d6QfK1x0gF0ifTfPYlE1pvBKjAHirkvvcJNDOOTu0aSeFukyYfqXZ1bf28xDbKnVZ4rGVYt-SzvY97qR4tz7c5nZc.NFUVsPKrZT5FDCzAZyoU02LBV8Qxs8LI7-FP80bEumw&dib_tag=se&keywords=pesticides%2Bfor%2Bplants&qid=1745905839&sprefix=pesticides%2Caps%2C2103&sr=8-31&th=1'
       },
       

       {
        id: '17',
        name: 'Chipku Herbal Mealy Bug Spray For Plants & Garden 200ml',
        description: 'Safe and effective pest control solution',
        price: 289,
        image: 'https://m.media-amazon.com/images/I/61a5CLLH4nL._SX679_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/Chipku-Guaranty-Infestation-Powerful-Repellent/dp/B0F24JVWCQ/ref=sr_1_47?crid=DB26TEZPPJLJ&dib=eyJ2IjoiMSJ9.PgtoyJH4GtvsmC6kiPH_Q_AnWDY8KvtF-XfAw60YkIbRwdatii_5TSd1ZoWPX0UYKlSbczP8z46ZGOLuVYtTEYn9eX4Rx-poC6WdXToVZRlFOOAurgmLyFx_0eED91B09YkNhc1N5DoVSAZnJBbl0i5sYAlt6WR90Bxg1U7a0mUwayXmXMJY9uugm3YbjtyPTwE0J5qqcoEnpa2Ph7d6QfK1x0gF0ifTfPYlE1pvBKjAHirkvvcJNDOOTu0aSeFukyYfqXZ1bf28xDbKnVZ4rGVYt-SzvY97qR4tz7c5nZc.NFUVsPKrZT5FDCzAZyoU02LBV8Qxs8LI7-FP80bEumw&dib_tag=se&keywords=pesticides%2Bfor%2Bplants&qid=1745905839&sprefix=pesticides%2Caps%2C2103&sr=8-47&th=1'
       },

       

       {
        id: '18',
        name: 'S.J. Organics Neem Cake Powder for Plants ',
        description: 'Safe and effective pest control solution',
        price: 649,
        image: 'https://m.media-amazon.com/images/I/41aXNZ2MlFL._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'pesticides',
        amazonLink: 'https://www.amazon.in/Organics-Neem-Cake-Powder-Plants/dp/B0DVZGK82K/ref=sxbs_pa_sp_search_thematic_btf_sspa?content-id=amzn1.sym.030b404d-71b4-44ac-bd40-72a281aab15b%3Aamzn1.sym.030b404d-71b4-44ac-bd40-72a281aab15b&crid=DB26TEZPPJLJ&cv_ct_cx=pesticides%2Bfor%2Bplants&keywords=pesticides%2Bfor%2Bplants&pd_rd_i=B0DVZGK82K&pd_rd_r=155892d8-6054-4c07-b99f-d33cccf05840&pd_rd_w=JFqu1&pd_rd_wg=Bpflb&pf_rd_p=030b404d-71b4-44ac-bd40-72a281aab15b&pf_rd_r=5BRS37W3HHMR2JDPHEBN&qid=1745905839&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=pesticides%2Caps%2C2103&sr=1-4-2907eac4-8056-42c7-8014-fdf7bd4c5395-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWNfYnRm&th=1' 
      },

      {
        id: '19',
        name: 'Navika Seeds ',
        description: 'High-quality seeds for optimal yield',
        price: 249,
        image: 'https://m.media-amazon.com/images/I/414jS6DNquL._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'seeds',
        amazonLink: 'https://www.amazon.in/Navika-Seeds-Grow-Packet-Season-Organic/dp/B0B53YWFWD/ref=sr_1_9?crid=DABFI2AOULRC&dib=eyJ2IjoiMSJ9.NqadJ0JsKKAKE858stfJFgFYh9RwSS8MuZKabGKK8mFzehJAYwfNWDBdJr6uxPZUHPuGpOr8toGxxtAnE_BuzFBqCxsLYgun1wy8lk31s7brk14DOCriSmW_wpquqAzdEWPP_zmB371BXiTi2N4qWk4QvqPLXEfnW29tT9DyV2SBZStZV0CQAcBvprVcUNAIvOYEuJkph3MKzzP_HSmiku8ZDjGZGcZ38VGOOQVSQvDZ6aIyhT1vIiQiKXouoaH0ml_mrinEjrkMgBKjXoVySvAfABuPJ8SaqloiwE9QvME.32Xhfj06x8YTsu9uO9sIDSiXxK9OxNApEDlFDj11pOs&dib_tag=se&keywords=seeds%2Bfor%2Bfarming&qid=1745908819&sprefix=SEEDS%2BFOR%2BF%2Caps%2C328&sr=8-9&th=1'
       },
       {
        id: '20',
        name: 'UGAOO Broccoli Vegetable Seeds  ',
        description: 'High-quality seeds for optimal yield',
        price: 99,
        image: 'https://m.media-amazon.com/images/I/510yv9RZx1L._SX300_SY300_QL70_FMwebp_.jpg',
        category: 'seeds',
        amazonLink: 'https://www.amazon.in/UGAOO-Broccoli-Vegetable-Seeds-Green/dp/B09MLNSR9D/ref=sr_1_18?crid=DABFI2AOULRC&dib=eyJ2IjoiMSJ9.NqadJ0JsKKAKE858stfJFgFYh9RwSS8MuZKabGKK8mFzehJAYwfNWDBdJr6uxPZUHPuGpOr8toGxxtAnE_BuzFBqCxsLYgun1wy8lk31s7brk14DOCriSmW_wpquqAzdEWPP_zmB371BXiTi2N4qWk4QvqPLXEfnW29tT9DyV2SBZStZV0CQAcBvprVcUNAIvOYEuJkph3MKzzP_HSmiku8ZDjGZGcZ38VGOOQVSQvDZ6aIyhT1vIiQiKXouoaH0ml_mrinEjrkMgBKjXoVySvAfABuPJ8SaqloiwE9QvME.32Xhfj06x8YTsu9uO9sIDSiXxK9OxNApEDlFDj11pOs&dib_tag=se&keywords=seeds%2Bfor%2Bfarming&qid=1745908819&sprefix=SEEDS%2BFOR%2BF%2Caps%2C328&sr=8-18&th=1'
        },

        {
          id: '21',
          name: 'Green World PDM 139 (Samrat) Moong Seeds ',
          description: 'High-quality seeds for optimal yield',
          price: 3299,
          image: 'https://m.media-amazon.com/images/I/51TUgH8WCJS._SY300_SX300_QL70_FMwebp_.jpg',
          category: 'seeds',
          amazonLink: 'https://www.amazon.in/Green-World-Samrat-Researched-Farming/dp/B0C85BJRHF/ref=sxin_15_pa_sp_search_thematic_sspa?content-id=amzn1.sym.70fd741c-68a9-470a-9805-115e3115104d%3Aamzn1.sym.70fd741c-68a9-470a-9805-115e3115104d&crid=DABFI2AOULRC&cv_ct_cx=seeds%2Bfor%2Bfarming&keywords=seeds%2Bfor%2Bfarming&pd_rd_i=B0C85BJRHF&pd_rd_r=615dfb22-bffe-42a3-bc27-01e1ad7d8783&pd_rd_w=G02c0&pd_rd_wg=tfb2D&pf_rd_p=70fd741c-68a9-470a-9805-115e3115104d&pf_rd_r=9N6Y54Q3R3N5HVW80G7W&qid=1745908819&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=SEEDS%2BFOR%2BF%2Caps%2C328&sr=1-4-66673dcf-083f-43ba-b782-d4a436cc5cfb-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1'
        },
        {
          id: '22',
          name: 'Gardening Hand Tools',
          description: 'High-quality pruning shears for precise cutting',
          price: 399,
          image: 'https://m.media-amazon.com/images/I/418B0a-pvML._SX300_SY300_QL70_FMwebp_.jpg',
          category: 'tools',
          amazonLink: 'https://www.amazon.in/Arkath-Mart-Gardening-Hand-Tools/dp/B0DRVWBP9R/ref=sr_1_1_sspa?crid=2TEOT0B78ALUA&dib=eyJ2IjoiMSJ9.1ZLVb5Gvi6yXtzD0xnNddNv-X8zcs66zUBHXgBnc1_kY_k9TTd1RzUWpcyTdu5aTCeM3BUvtDHyBMkY62Y69SgGgpvmt9jpeYnvGIm09AuzB28dCf4QnKGOwiIZp7EmLvRQrSAGXc18K_EsgTFi0S0GHi-m_ISpAw_vGlOIYWhg4OFUVdVAjFs6VhYwLBPpfRjrfA9L0sLIohCJm6PRqDI5rJ5LBqRU2x-M3bOZxHVF7EAjncR9SbTTf7binmDc60VMPnCG6fo0hdV8NbEYntnSeRXGzbCxWgFa_axt8AGM.GDtWGBF3cBk076MdptgBW4LGmAIgUrSTnnUodPk1R9k&dib_tag=se&keywords=tools+for+agricultural+work&qid=1745909604&sprefix=TOOLS+FOR+AGRI%2Caps%2C281&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
         },
         {
          id: '23',
          name: 'Gardening Hand Tools',
          description: 'High-quality pruning shears for precise cutting',
          price: 2498,
          image: 'https://m.media-amazon.com/images/I/517K-UMphRL._SX522_.jpg',
          category: 'tools',
          amazonLink: 'https://www.amazon.in/Zephyr-Potted-Gardening-Tool-Specification/dp/B0D76MM38Z/ref=sr_1_57_sspa?crid=2TEOT0B78ALUA&dib=eyJ2IjoiMSJ9.1ZLVb5Gvi6yXtzD0xnNddNv-X8zcs66zUBHXgBnc1_kY_k9TTd1RzUWpcyTdu5aTCeM3BUvtDHyBMkY62Y69SgGgpvmt9jpeYnvGIm09AuzB28dCf4QnKGOwiIZp7EmLvRQrSAGXc18K_EsgTFi0S0GHi-m_ISpAw_vGlOIYWhg4OFUVdVAjFs6VhYwLBPpfRjrfA9L0sLIohCJm6PRqDI5rJ5LBqRU2x-M3bOZxHVF7EAjncR9SbTTf7binmDc60VMPnCG6fo0hdV8NbEYntnSeRXGzbCxWgFa_axt8AGM.GDtWGBF3cBk076MdptgBW4LGmAIgUrSTnnUodPk1R9k&dib_tag=se&keywords=tools+for+agricultural+work&qid=1745909604&sprefix=TOOLS+FOR+AGRI%2Caps%2C281&sr=8-57-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9idGY&psc=1'
        },
        {
          id: '24',
          name: 'Cordless Grass Trimme-r',
          description: 'High-quality pruning shears for precise cutting',
          price: 2499,
          image: 'https://m.media-amazon.com/images/I/41aFdCxqIgL._SX300_SY300_QL70_FMwebp_.jpg',
          category: 'tools',
          amazonLink: 'https://www.amazon.in/HARIVAR-MART-Lightweight-Lawn-Batteries/dp/B0CP3YHWC8/ref=sr_1_53?crid=2TEOT0B78ALUA&dib=eyJ2IjoiMSJ9.1ZLVb5Gvi6yXtzD0xnNddNv-X8zcs66zUBHXgBnc1_kY_k9TTd1RzUWpcyTdu5aTCeM3BUvtDHyBMkY62Y69SgGgpvmt9jpeYnvGIm09AuzB28dCf4QnKGOwiIZp7EmLvRQrSAGXc18K_EsgTFi0S0GHi-m_ISpAw_vGlOIYWhg4OFUVdVAjFs6VhYwLBPpfRjrfA9L0sLIohCJm6PRqDI5rJ5LBqRU2x-M3bOZxHVF7EAjncR9SbTTf7binmDc60VMPnCG6fo0hdV8NbEYntnSeRXGzbCxWgFa_axt8AGM.GDtWGBF3cBk076MdptgBW4LGmAIgUrSTnnUodPk1R9k&dib_tag=se&keywords=tools%2Bfor%2Bagricultural%2Bwork&qid=1745909604&sprefix=TOOLS%2BFOR%2BAGRI%2Caps%2C281&sr=8-53&th=1'  
        },


    
];

export const marketplaceProducts = {
  categories,
  products
}; 