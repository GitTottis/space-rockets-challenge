/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { useFavoritesState } from "../utils/localize-favorites"
import FavoriteItem from  "./favorite-item"
import {
    Drawer,
    DrawerBody,
    Box,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    CloseButton,
    List,
    Flex,
    useDisclosure
  } from "@chakra-ui/core";

  const PLACEMENT = "right";

  export default function Favorites() {
    const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
    const [favoriteLaunches, setFavoriteLaunches] = useFavoritesState('favouriteLaunches')
    const [favoritePads, setFavoritePads] = useFavoritesState('favouritePads')

    return (
      <>
        <Button
          onClick={onOpen}
          _hover={{ bg: "transparent" }}
          fontFamily="mono"
          letterSpacing="2px"
          fontWeight="bold"
          fontSize="lg"
          bg="transparent"
        >
          F4V0R!TE5
        </Button>
        <Drawer
            placement={PLACEMENT} onToggle={onToggle} isOpen={isOpen} onClose={onToggle}>
          <DrawerOverlay />
          <DrawerContent marginTop="88px">
            <DrawerHeader borderBottomWidth="1px">
              <Flex
                align="center"
                justify="space-between"
                wrap="wrap"
              >
                <h1>Favorites</h1>
                <CloseButton size="md" onClick={onClose} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
            <Box
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              mb={2}
              isTruncated
            >
              Pads ({Object.keys(favoritePads).length})
            </Box>
            <List
              mb={4}
            >
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favoritePads)
                    .map(([key, value]) => {
                      return <FavoriteItem favouriteType={'favouritePads'} data={value} favoriteSetter={setFavoritePads} />
                    })
                }
              </Flex>
            </List>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              mb={2}
              isTruncated
            >
              Launches ({Object.keys(favoriteLaunches).length})
            </Box>
            <List>
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favoriteLaunches)
                    .map(([key, value]) => {
                        return <FavoriteItem favouriteType={'favouriteLaunches'} data={value} favoriteSetter={setFavoriteLaunches}/>
                    })
                }
              </Flex>
            </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }