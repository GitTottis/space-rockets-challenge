import React from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex, IconButton } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../../utils/use-space-x";
import { formatDate } from "../../utils/format-date";
import Error from "../error";
import Breadcrumbs from "../breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { ACTIONS, useFavoritesContext, useFavoritesUpdateContext } from "../../contexts/favorites-context";
import Notification, { ALERT_STATUSES, getNotificationData }  from "../notification";

const PAGE_SIZE = 12;

function getLaunchPayload(data) {
  return { ...data, type: 'launch' }
}

export default function Launches() {
  const favourites = useFavoritesContext()
  const setFavourites = useFavoritesUpdateContext()
  const [ notificationData, setNotificationData ] = React.useState({})
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  return (
    <>
      { !!notificationData ? <Notification 
        status={notificationData.status} 
        message={notificationData.message} 
        showtime={notificationData.showTime} 
        /> : null
      }
      <div>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
          {error && <Error />}
          {data &&
            data
              .flat()
              .map((launch) => (
                <LaunchItem launch={launch} favouriteLaunches={favourites} setFavouriteLaunches={setFavourites} setNotification={setNotificationData} key={launch.flight_number} />
              ))}
        </SimpleGrid>
        <LoadMoreButton
          loadMore={() => setSize(size + 1)}
          data={data}
          pageSize={PAGE_SIZE}
          isLoadingMore={isValidating}
        />
      </div>
    </>
  );
}

export function LaunchItem({ launch, favouriteLaunches, setFavouriteLaunches, setNotification }) {
  const [btnState, setBtnState] = React.useState( favouriteLaunches[launch.flight_number.toString()] )

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box
        as={Link}
        to={`/launches/${launch.flight_number.toString()}`}
      >
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />

        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
      </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline" justifyContent="space-between">
          <Box d="flex" alignItems="baseline">
            {launch.launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
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
              {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
            </Box>
          </Box>
          <Box>
            <IconButton
              border="none"
              variant="outline"
              variantColor= {btnState ? "yellow" : "gray" }
              aria-label="Call Sage"
              fontSize="20px"
              icon={"star"}
              onClick={
                () => {
                  setFavouriteLaunches({ type: btnState ? ACTIONS.REMOVE_FAVORITE: ACTIONS.ADD_FAVORITE, payload: getLaunchPayload(launch) })
                  setBtnState(!btnState)
                  setNotification(
                    getNotificationData(
                      ALERT_STATUSES.info, 
                      "Launch : " + launch.flight_number.toString(), 
                      " has been added to favourites", 4000  )
                    )
                }
              }
            />
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
