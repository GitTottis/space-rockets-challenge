import React from 'react'
import {Flex } from '@chakra-ui/core';
import { Route } from "react-router-dom";
import { useUserContext } from '../contexts/auth-context'
import Login from "./login/social-login"

const AuthRoute = ({ element: RouteComponent, ...rest }) => {
    const { user } = useUserContext()

    return !!user ? (
        <Route
            {...rest}
            element={ RouteComponent }
        >
        </Route>
    ) : (
        <Flex 
            justify="center" 
            h="100vh"
            alignContent="stretch"
            backgroundImage="url('./space-x.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
        >
            <Flex
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="6"
                w="50vh"
            >
                <Flex bg="blue.50" align="center" justify="center">
                    <Login type='google'/>
                </Flex>
                <Flex bg="blue.50" align="center" justify="center">
                    <Login type='facebook'/>
                </Flex>
            </Flex>
        </Flex>   
    )
}

export default AuthRoute