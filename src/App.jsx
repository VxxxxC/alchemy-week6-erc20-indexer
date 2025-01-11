import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState, Suspense } from "react";
import Loading from "./components/loading.jsx";
import { Spinner } from "@chakra-ui/react/spinner";
import { Separator } from "@chakra-ui/react/separator";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [onLoading, setOnLoading] = useState(false);

  async function getTokenBalance() {
    const config = {
      apiKey: "OOtxwJ1E2d0QWoHMFl6-2qh-hMjY0CMq",
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);
    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress,
      );
      tokenDataPromises.push(tokenData);
    }

    setOnLoading(true);
    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
    setOnLoading(false);
  }
  return (
    <>
      <Heading ml="2rem" mt="2rem" fontSize={36}>
        ERC-20 Token Indexer
      </Heading>

      <Box w="100vw">
        <Center>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
          ></Flex>
        </Center>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <Flex
            m={8}
            flexDirection="row"
            alignSelf="start"
            alignItems="center"
            gap={5}
          >
            <Flex
              flexDirection="column"
              justifySelf="start"
              alignItems="center"
            >
              <Heading>
                Get all the ERC-20 token balances of this address:
              </Heading>
              <Input
                onChange={(e) => setUserAddress(e.target.value)}
                color="black"
                w="30rem"
                p={4}
                bgColor="white"
                fontSize={16}
              />
            </Flex>
            {!hasQueried && !onLoading ? (
              <Button variant="subtle" fontSize={20} onClick={getTokenBalance}>
                Check ERC-20 Token Balances
              </Button>
            ) : null}
          </Flex>

          {onLoading ? <Spinner size="xl" color="white" /> : null}

          {hasQueried ? (
            <>
              <Heading size="3xl">ERC-20 token balances:</Heading>

              <Separator size="lg" my={12} />

              <SimpleGrid w={"90vw"} columns={4} gap="24px">
                {results?.tokenBalances?.map((e, i) => {
                  return (
                    <>
                      <Flex flexDir="row" alignItems="center" gap="12px">
                        <Image
                          src={tokenDataObjects[i].logo}
                          borderRadius="full"
                          fit="contain"
                          h="55px"
                          w="55px"
                        />
                        <Flex flexDir="column" color="white" key={e.id}>
                          <Box>
                            <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                          </Box>
                          <Box>
                            <b>Balance:</b>&nbsp;
                            {Utils.formatUnits(
                              e.tokenBalance,
                              tokenDataObjects[i].decimals,
                            )}
                          </Box>
                        </Flex>
                      </Flex>
                    </>
                  );
                })}
              </SimpleGrid>
            </>
          ) : null}
        </Flex>
      </Box>
    </>
  );
}

export default App;
