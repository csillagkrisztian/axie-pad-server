const axios = require("axios");
const express = require("express");
const { AXIE_API } = require("../constants");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { from, size, sort, auctionType, criteria } = req.body;
    const { data } = await axios.post(AXIE_API, {
      operationName: "GetAxieBriefList",
      variables: {
        from: from || 0,
        size: size || 24,
        sort: sort || "PriceAsc",
        auctionType: auctionType || "Sale",
        criteria: criteria || {},
      },
      query:
        "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n",
    });
    res.status(200).send(data);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
