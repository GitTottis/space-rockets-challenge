/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Link } from "react-router-dom";
import { useFavoritesState } from "../utils/localize-favorites"
import {
    Drawer,
    DrawerBody,
    Box,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    // DrawerCloseButton,
    Button,
    CloseButton,
    List, ListItem,
    Flex,
    useDisclosure
  } from "@chakra-ui/core";


  export default function Favorites() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const placement = "right";
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
            placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent   marginTop="88px">
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
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              Pads ({Object.keys(favoritePads).length})
            </Box>
            <List>
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favoritePads)
                    .map(([key, value]) => {
                        return (
                          <ListItem>
                            <Box
                              as={Link}
                              to={`/launch-pads/${key}`}
                            >
                              {key}
                            </Box>
                          </ListItem>
                        )
                    })
                }
              </Flex>
            </List>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              Launches ({Object.keys(favoriteLaunches).length})
            </Box>
            <List 
              marginBottom="10px"
            >
              <Flex
                align="center"
                display="column"
                wrap="wrap"
              >
                {
                  Object.entries(favoriteLaunches)
                    .map(([key, value]) => {
                        return (
                          <ListItem>
                            <Box
                              as={Link}
                              to={`/launches/${value.flight_number.toString()}`}
                            >
                              {key}
                            </Box>
                          </ListItem>
                        )
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