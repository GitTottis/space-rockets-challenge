import React from "react";
import { Badge, Box, IconButton, SimpleGrid, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import { useFavoritesState } from "../utils/localize-favorites";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const [favouritePads, setFavouritePads] = useFavoritesState('favouritePads')
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} favouritePads={favouritePads} setFavouritePads={setFavouritePads}/>
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

function LaunchPadItem({ launchPad, favouritePads, setFavouritePads }) {
  
  function appendNewFavourite() {
    favouritePads[launchPad.site_id.toString()] = launchPad
    console.log(favouritePads)
    return favouritePads
  }

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline" justifyContent="space-between">
          <Box d="flex" alignItems="baseline"
            as={Link}
            to={`/launch-pads/${launchPad.site_id}`}
          >
            {launchPad.status === "active" ? (
              <Badge px="2" variant="solid" variantColor="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Retired
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launchPad.attempted_launches} attempted &bull;{" "}
              {launchPad.successful_launches} succeeded
            </Box>
          </Box>
          <Box>
            <Box>
              <IconButton
                border="none"
                variant="outline"
                variantColor="yellow"
                aria-label="Call Sage"
                fontSize="20px"
                icon={"star"}
                onClick={ () =>setFavouritePads(appendNewFavourite())}
              />
            </Box>
          </Box>
        </Box>
        <Box
          as={Link}
          to={`/launch-pads/${launchPad.site_id}`}
        >
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launchPad.name}
          </Box>
          <Text color="gray.500" fontSize="sm">
            {launchPad.vehicles_launched.join(", ")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
